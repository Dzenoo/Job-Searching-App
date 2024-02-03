import { asyncErrors } from "../../errors";
import { responseServerHandler } from "../../utils/response";
import Employer from "../../models/employer/employers.schemas";
import Seeker from "../../models/seeker/seekers.schemas";
import Review from "../../models/employer/reviews.schemas";
import Job from "../../models/shared/jobs.schemas";
import Event from "../../models/employer/events.schemas";
import Message from "../../models/shared/messages.schemas";
import { initializeAws } from "../../utils/aws";
import { io } from "../../server";

export const signupEmployer = asyncErrors(
  async (request, response): Promise<void> => {
    if (
      [
        "password",
        "email",
        "name",
        "number",
        "address",
        "size",
        "industry",
      ].filter((property) => !request.body[property]).length > 0
    ) {
      responseServerHandler(
        {
          message: "Please provide valid credentials",
        },
        400,
        response
      );
    }

    const existingEmployer = await Employer.findOne({
      email: request.body.email,
    });

    if (existingEmployer) {
      responseServerHandler(
        { message: "This email already exists, please try again" },
        400,
        response
      );
    }

    const newEmployer = await Employer.create(request.body);

    if (!newEmployer) {
      responseServerHandler(
        {
          message: "Cannot register account, please try again",
        },
        500,
        response
      );
    }

    await newEmployer.save();

    responseServerHandler({ employer: newEmployer._id }, 201, response);
  }
);

export const loginEmployer = asyncErrors(
  async (request, response): Promise<void> => {
    if (
      ["password", "email"].filter((property) => !request.body[property])
        .length > 0
    ) {
      responseServerHandler(
        {
          message: "Please provide valid credentials",
        },
        400,
        response
      );
    }

    // @ts-ignore
    const existingEmployer = await Employer.findByCredentials(
      request.body.email,
      request.body.password
    );

    if (!existingEmployer) {
      responseServerHandler(
        {
          message: "Invalid credentials for account, please try again",
        },
        500,
        response
      );
    }

    const employerToken = await existingEmployer.generateAuthToken();

    if (!employerToken) {
      responseServerHandler(
        {
          message: "Cannot login account, please try again",
        },
        500,
        response
      );
    }

    response.cookie("token", employerToken, { httpOnly: true });

    responseServerHandler(
      {
        employer: existingEmployer._id,
        employerToken: employerToken,
      },
      200,
      response
    );
  }
);

export const followEmployer = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { seekerId } = request.user;
  const employerId = request.params.employerId;

  const [employer, seeker] = await Promise.all([
    Employer.findById(employerId),
    Seeker.findById(seekerId),
  ]);

  if (!employer || !seeker) {
    return responseServerHandler(
      { message: "Employer or Seeker cannot be found" },
      404,
      response
    );
  }

  const isFollowing = employer.followers.includes(seekerId);

  if (isFollowing) {
    await Employer.findByIdAndUpdate(employerId, {
      $pull: { followers: seekerId },
    });
    await Seeker.findByIdAndUpdate(seekerId, {
      $pull: { following: employerId },
    });
    responseServerHandler(
      { message: "Employer successfully unfollowed" },
      201,
      response
    );
  } else {
    await Employer.findByIdAndUpdate(employerId, {
      $push: {
        followers: seekerId,
        notifications: {
          title: "New Followers Notification",
          message: `${seeker.first_name} is now following you`,
        },
      },
    });
    await Seeker.findByIdAndUpdate(seekerId, {
      $push: { following: employerId },
    });
    responseServerHandler(
      { message: "Employer successfully followed" },
      201,
      response
    );
  }
});

export const getEmployerProfile = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { employerId } = request.user;
  const employer = await Employer.findById(employerId)
    .populate({
      path: "directMessages.messages",
      select: "content sender createdAt",
    })
    .exec();

  if (!employer) {
    responseServerHandler({ message: "Cannot Find Employer" }, 404, response);
  }

  responseServerHandler({ employer: employer }, 201, response);
});

export const getEmployers = asyncErrors(async (request, response) => {
  const { page = 1, limit = 10, search, srt } = request.query;

  const conditions: any = {};

  if (search) {
    conditions.$or = [
      { name: { $regex: new RegExp(String(search), "i") } },
      { address: { $regex: new RegExp(String(search), "i") } },
      { company_description: { $regex: new RegExp(String(search), "i") } },
    ];
  }

  const sortOptions: any = { createdAt: srt === "desc" ? -1 : 1 };

  const employers = await Employer.find(conditions)
    .sort(sortOptions)
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .select(
      "image name company_description reviews followers events size address"
    )
    .exec();

  if (!employers) {
    responseServerHandler({ message: "Cannot Find Employers" }, 404, response);
  }

  responseServerHandler({ employers: employers }, 201, response);
});

export const getEmployerById = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { employerId } = request.user;
  const employer = await Employer.findById(employerId)
    .populate({
      path: "jobs",
      select: "title position _id location level description",
    })
    .populate("reviews")
    .populate("events")
    .select(
      "name reviews events email address size website followers number company_description industry image"
    )
    .exec();

  if (!employer) {
    responseServerHandler({ message: "Cannot Find Employer" }, 404, response);
  }
  responseServerHandler({ employer: employer }, 201, response);
});

export const reviewEmployer = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { seekerId } = request.user;
  const employerId = request.params.employerId;
  const employer = await Employer.findById(employerId);

  if (!employer) {
    return responseServerHandler(
      { message: "Cannot Find Employer" },
      404,
      response
    );
  }

  const existingReview = await Review.findOne({
    seeker: seekerId,
  });

  if (existingReview) {
    responseServerHandler(
      { message: "Already reviewed this employer" },
      400,
      response
    );
    return;
  }

  const review = await Review.create({
    ...request.body,
    company: employerId,
    seeker: seekerId,
  });

  await Employer.findByIdAndUpdate(employerId, {
    $push: { reviews: review._id },
  });

  responseServerHandler(
    { message: "Review successfully added" },
    201,
    response
  );
});

export const deleteReviewEmployer = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { seekerId } = request.user;
  const employerId = request.params.employerId;
  const employer = await Employer.findById(employerId);

  if (!employer) {
    responseServerHandler({ message: "Cannot Find Employer" }, 404, response);
  }

  const existingReview = await Review.findOne({
    seeker: seekerId,
  });

  if (!existingReview) {
    responseServerHandler({ message: "Cannot find review" }, 404, response);
    return;
  }

  await Employer.findByIdAndUpdate(employerId, {
    $pull: { reviews: existingReview._id },
  });

  await Review.findByIdAndDelete(existingReview._id);

  responseServerHandler(
    { message: "Review successfully deleted" },
    201,
    response
  );
});

export const editReviewEmployer = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { seekerId } = request.user;
  const updateData = request.body;

  const existingReview = await Review.findById(updateData.reviewId);

  if (!existingReview) {
    responseServerHandler({ message: "Cannot find review" }, 404, response);
    return;
  }

  if (Object.keys(updateData).length === 0) {
    responseServerHandler(
      { message: "Data is not valid and review can't be edited" },
      403,
      response
    );
  }

  if (existingReview.seeker.toString() !== seekerId) {
    responseServerHandler(
      { message: "Unauthorized. You are not the owner of this review." },
      403,
      response
    );
    return;
  }

  const editedReview = await Review.findByIdAndUpdate(
    existingReview._id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!editedReview) {
    return responseServerHandler(
      { message: "Review not found or could not be updated" },
      404,
      response
    );
  }

  responseServerHandler(
    { message: "Review successfully edited" },
    201,
    response
  );
});

export const editEmployerProfile = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { employerId } = request.user;
  const updateData = request.body;

  const allowedProperties = [
    "industry",
    "company_description",
    "size",
    "name",
    "number",
    "address",
    "website",
  ];

  const disallowedProperties = Object.keys(updateData).filter(
    (prop) => !allowedProperties.includes(prop)
  );

  if (disallowedProperties.length > 0 || Object.keys(updateData).length === 0) {
    responseServerHandler(
      { message: "Data is not valid and profile can't be edited" },
      403,
      response
    );
  }

  const editedProfile = await Employer.findByIdAndUpdate(
    employerId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!editedProfile) {
    return responseServerHandler(
      { message: "Profile not found or could not be updated" },
      404,
      response
    );
  }

  responseServerHandler({ job: editedProfile }, 201, response);
});

export const deleteEmployerProfile = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { employerId } = request.user;
  const employer = await Employer.findById(employerId);
  const jobIds = (employer.jobs || []).map((job: typeof Job | any) => job._id);

  if (!employer) {
    return responseServerHandler(
      { message: "Employer not found" },
      404,
      response
    );
  }

  await Job.deleteMany({ company: employerId });
  await Review.deleteMany({ company: employerId });
  await Event.deleteMany({ company: employerId });

  await Seeker.updateMany(
    {
      $or: [{ following: employerId }, { savedJobs: { $in: jobIds } }],
    },
    {
      $pull: {
        following: employerId,
        savedJobs: { $in: jobIds },
      },
    }
  );

  await Employer.findByIdAndDelete(employerId);

  responseServerHandler(
    { message: "Employer profile and associated data deleted successfully" },
    200,
    response
  );
});

export const createNewEvent = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { employerId } = request.user;
  const existingEvent = await Event.findOne({
    title: request.body.title,
  });
  const image = request.file;

  if (existingEvent) {
    responseServerHandler(
      { message: "Event with this title already exists" },
      400,
      response
    );
    return;
  }

  const allowedProperties = [
    "title",
    "date",
    "description",
    "image",
    "location",
    "category",
  ];

  const disallowedProperties = Object.keys(request.body).filter(
    (prop) => !allowedProperties.includes(prop)
  );

  if (
    disallowedProperties.length > 0 ||
    Object.keys(request.body).length === 0
  ) {
    responseServerHandler(
      { message: "Data is not valid and event can't be created" },
      403,
      response
    );
  }

  const imageKey = `user_${employerId}_${Date.now()}.png`;
  const uploads = await initializeAws(image, imageKey);
  await uploads.done();

  const newEvent = await Event.create({
    ...request.body,
    company: employerId,
    image: imageKey,
  });

  await Employer.findByIdAndUpdate(employerId, {
    $push: { events: newEvent._id },
  });

  responseServerHandler({ event: newEvent }, 201, response);
});

export const editEvent = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { employerId } = request.user;
  const updateData = request.body;
  const existingEvent = await Event.findById(request.params.eventId);

  if (!existingEvent) {
    responseServerHandler({ message: "Cannot find event" }, 404, response);
    return;
  }

  if (existingEvent.company.toString() !== employerId) {
    responseServerHandler(
      { message: "Unauthorized. You are not the owner of this event." },
      403,
      response
    );
    return;
  }

  const allowedProperties = [
    "title",
    "date",
    "description",
    "location",
    "category",
  ];

  const disallowedProperties = Object.keys(updateData).filter(
    (prop) => !allowedProperties.includes(prop)
  );

  if (disallowedProperties.length > 0 || Object.keys(updateData).length === 0) {
    responseServerHandler(
      { message: "Data is not valid and event can't be edited" },
      403,
      response
    );
  }

  const editedEvent = await Event.findByIdAndUpdate(
    existingEvent._id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!editedEvent) {
    return responseServerHandler(
      { message: "Event not found or could not be updated" },
      404,
      response
    );
  }

  responseServerHandler({ event: editedEvent }, 201, response);
});

export const deleteEvent = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { employerId } = request.user;
  const existingEvent = await Event.findById(request.params.eventId);

  if (!existingEvent) {
    responseServerHandler({ message: "Cannot find event" }, 404, response);
    return;
  }

  if (existingEvent.company.toString() !== employerId) {
    responseServerHandler(
      { message: "Unauthorized. You are not the owner of this event." },
      403,
      response
    );
    return;
  }

  await Employer.findByIdAndUpdate(employerId, {
    $pull: { events: existingEvent._id },
  });

  await Seeker.updateMany(
    { events: existingEvent._id },
    {
      $pull: { events: existingEvent._id },
    }
  );

  await Event.findByIdAndDelete(existingEvent._id);

  responseServerHandler(
    { message: "Event successfully deleted" },
    201,
    response
  );
});

export const registerEvent = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { seekerId } = request.user;
  const eventId = request.params.eventId;
  const event = await Event.findById(eventId);

  if (!event) {
    responseServerHandler({ message: "Cannot Find Event" }, 404, response);
  }

  const isRegistered = event.seekers.includes(seekerId);

  if (isRegistered) {
    await Event.findByIdAndUpdate(eventId, {
      $pull: { seekers: seekerId },
    });
    await Seeker.findByIdAndUpdate(seekerId, {
      $pull: { events: eventId },
    });
    responseServerHandler(
      { message: "Event successfully unregistered" },
      201,
      response
    );
  } else {
    await Event.findByIdAndUpdate(eventId, {
      $push: { seekers: seekerId },
    });
    await Seeker.findByIdAndUpdate(seekerId, {
      $push: { events: eventId },
    });
    responseServerHandler(
      { message: "Event successfully registered" },
      201,
      response
    );
  }
});

export const createDirectMessages = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { employerId } = request.user;
  const { seekerId } = request.params;
  const existingEmployer = await Employer.findById(employerId);
  const existingSeeker = await Seeker.findById(seekerId);

  if (!existingEmployer || !existingSeeker) {
    responseServerHandler(
      { message: "Employer or Seeker not found" },
      404,
      response
    );
  }

  const existingDirectMessages = existingEmployer.directMessages.find(
    (message: any) => message.seekerId.toString() === seekerId.toString()
  );

  if (existingDirectMessages) {
    responseServerHandler(
      { message: "Direct messages already exist" },
      400,
      response
    );
    return;
  }

  const directMessagesEmployerData = {
    seekerId: seekerId,
    messages: [],
  };

  const directMessagesSeekerData = {
    employerId: employerId,
    messages: [],
  };

  await Employer.findByIdAndUpdate(
    employerId,
    {
      $push: { directMessages: directMessagesEmployerData },
    },
    {
      new: true,
    }
  );

  await Seeker.findByIdAndUpdate(
    seekerId,
    {
      $push: { directMessages: directMessagesSeekerData },
    },
    {
      new: true,
    }
  );

  responseServerHandler(
    { message: "Direct messages successfully created" },
    201,
    response
  );
});

export const typeMessage = asyncErrors(async (request, response) => {
  const { sender, content } = request.body;
  const { employerId, seekerId } = request.params;

  const existingEmployer = await Employer.findById(employerId);
  const existingSeeker = await Seeker.findById(seekerId);

  if (!existingEmployer || !existingSeeker) {
    responseServerHandler(
      { message: "Employer or Seeker not found" },
      404,
      response
    );
  }

  const existingDirectMessages = existingEmployer.directMessages.find(
    (message: any) => message.seekerId.toString() === seekerId.toString()
  );

  if (!existingDirectMessages) {
    responseServerHandler(
      { message: "Direct messages do not exist" },
      404,
      response
    );
    return;
  }

  const newMessage = await Message.create({
    sender: sender,
    content: content,
  });

  await Employer.findByIdAndUpdate(
    employerId,
    {
      $push: {
        "directMessages.$[elem].messages": newMessage._id,
      },
    },
    {
      arrayFilters: [{ "elem.seekerId": seekerId }],
    }
  );

  await Seeker.findByIdAndUpdate(
    seekerId,
    {
      $push: {
        "directMessages.$[elem].messages": newMessage._id,
      },
    },
    {
      arrayFilters: [{ "elem.employerId": employerId }],
    }
  );

  io.to(`${employerId}-${seekerId}`).emit("newMessage", newMessage);

  responseServerHandler(
    { message: "Message successfully sent" },
    201,
    response
  );
});
