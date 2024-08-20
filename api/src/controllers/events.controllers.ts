import { asyncErrors } from "../errors/asyncErrors";
import Employer from "../models/employer/employers.schema";
import Event from "../models/employer/events.schema";
import Seeker from "../models/seeker/seekers.schema";
import { uploadFileToS3 } from "../utils/aws";
import { sendResponse, validate } from "../utils/validation";

// Controller function to create a new event
export const createEvent = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user; // Get the employer ID from the authenticated user

    // Check if an event with the same title already exists
    const existingEvent = await Event.findOne({
      title: request.body.title,
    });

    if (existingEvent) {
      return sendResponse(
        { message: "Event with this title already exists" },
        400,
        response
      );
    }

    const image = request.file; // Get the uploaded image from the request
    const eventsData = request.body; // Get the event data from the request body

    // Define allowed properties for validation
    const allowedProperties = [
      "title",
      "date",
      "description",
      "image",
      "location",
      "category",
    ];

    // Validate the incoming event data
    validate(allowedProperties, eventsData, (error, message) => {
      if (error) {
        return sendResponse({ message: message }, 403, response);
      }
    });

    // Generate a unique image key and upload the image to S3
    const imageKey = `employer_${employerId}.png`;
    const uploads = await uploadFileToS3(image!, imageKey, "events");
    await uploads.done();

    // Create the new event in the database
    const newEvent = await Event.create({
      ...request.body,
      company: employerId,
      image: `events/${imageKey}`,
    });

    // Add the event to the employer's list of events
    await Employer.findByIdAndUpdate(employerId, {
      $push: { events: newEvent._id },
    });

    // Send the response with the created event
    sendResponse({ event: newEvent }, 201, response);
  } catch (error) {
    sendResponse(
      { message: "Cannot create event, please try again" },
      400,
      response
    );
  }
});

// Controller function to edit an existing event
export const editEvent = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user; // Get the employer ID from the authenticated user
    const updateData = request.body; // Get the updated event data from the request body
    const existingEvent = await Event.findById(request.params.eventId); // Find the event by ID

    if (!existingEvent) {
      return sendResponse({ message: "Cannot find event" }, 404, response);
    }

    // Check if the employer owns the event
    if (existingEvent.company.toString() !== employerId) {
      return sendResponse(
        { message: "Unauthorized. You are not the owner of this event." },
        403,
        response
      );
    }

    // Define allowed properties for validation
    const allowedProperties = [
      "title",
      "date",
      "description",
      "location",
      "category",
    ];

    // Validate the incoming update data
    validate(allowedProperties, updateData, (error, message) => {
      if (error) {
        return sendResponse({ message: message }, 403, response);
      }
    });

    // Update the event in the database
    const editedEvent = await Event.findByIdAndUpdate(
      existingEvent._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!editedEvent) {
      return sendResponse(
        { message: "Event not found or could not be updated" },
        404,
        response
      );
    }

    // Send the response with the updated event
    sendResponse({ event: editedEvent }, 201, response);
  } catch (error) {
    sendResponse(
      { message: "Cannot edit event, please try again" },
      400,
      response
    );
  }
});

// Controller function to delete an event
export const deleteEvent = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user; // Get the employer ID from the authenticated user
    const existingEvent = await Event.findById(request.params.eventId); // Find the event by ID

    if (!existingEvent) {
      return sendResponse({ message: "Cannot find event" }, 404, response);
    }

    // Check if the employer owns the event
    if (existingEvent.company.toString() !== employerId) {
      return sendResponse(
        { message: "Unauthorized. You are not the owner of this event." },
        403,
        response
      );
    }

    // Remove the event from the employer's list of events
    await Employer.findByIdAndUpdate(employerId, {
      $pull: { events: existingEvent._id },
    });

    // Remove the event from all seekers' lists of registered events
    await Seeker.updateMany(
      { events: existingEvent._id },
      {
        $pull: { events: existingEvent._id },
      }
    );

    // Delete the event from the database
    await Event.findByIdAndDelete(existingEvent._id);

    // Send the response confirming deletion
    sendResponse({ message: "Event successfully deleted" }, 201, response);
  } catch (error) {
    sendResponse(
      { message: "Cannot delete event, please try again" },
      400,
      response
    );
  }
});

// Controller function for seekers to register or unregister for an event
export const registerEvent = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user; // Get the seeker ID from the authenticated user
    const eventId = request.params.eventId; // Get the event ID from the request parameters
    const event = await Event.findById(eventId); // Find the event by ID

    if (!event) {
      return sendResponse({ message: "Cannot Find Event" }, 404, response);
    }

    // Check if the seeker is already registered for the event
    const isRegistered = event.seekers.includes(seekerId);

    if (isRegistered) {
      // Unregister the seeker from the event
      await Event.findByIdAndUpdate(eventId, {
        $pull: { seekers: seekerId },
      });

      await Seeker.findByIdAndUpdate(seekerId, {
        $pull: { events: eventId },
      });

      sendResponse(
        { message: "Event successfully unregistered" },
        201,
        response
      );
    } else {
      // Register the seeker for the event
      await Event.findByIdAndUpdate(eventId, {
        $push: { seekers: seekerId },
      });

      await Seeker.findByIdAndUpdate(seekerId, {
        $push: { events: eventId },
      });

      sendResponse({ message: "Event successfully registered" }, 201, response);
    }
  } catch (error) {
    sendResponse(
      { message: "Error registering events, please try again" },
      400,
      response
    );
  }
});

// Controller function to get a list of events with filtering, sorting, and pagination
export const getEvents = asyncErrors(async (request, response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      location,
      srt,
    } = request.query; // Get query parameters for pagination, filtering, and sorting

    const conditions: any = {};

    // Add search conditions if search terms are provided
    if (search) {
      conditions.$or = [
        { title: { $regex: new RegExp(String(search), "i") } },
        { description: { $regex: new RegExp(String(search), "i") } },
        { location: { $regex: new RegExp(String(search), "i") } },
      ];
    }

    // Filter by category if provided
    if (category) {
      conditions.category = Array.isArray(category)
        ? { $in: category }
        : category.toString().split(",");
    }

    // Filter by location if provided
    if (location) {
      conditions.location = Array.isArray(location)
        ? { $in: location }
        : location.toString().split(",");
    }

    // Define sorting options based on the sorting parameter
    const sortOptions: any = { createdAt: srt === "desc" ? -1 : 1 };

    // Fetch the list of events with the defined conditions and sorting
    const events = await Event.find(conditions)
      .sort(sortOptions)
      .populate({
        path: "company",
        select: "name image address",
      })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .exec();

    // Count the total number of events matching the conditions
    const totalEvents = await Event.countDocuments(conditions);

    // Send the response with the list of events and the total count
    sendResponse({ events: events, totalEvents: totalEvents }, 200, response);
  } catch (error) {
    sendResponse(
      { message: "Cannot get events, please try again" },
      400,
      response
    );
  }
});
