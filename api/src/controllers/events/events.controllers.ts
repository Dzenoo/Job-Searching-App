import { asyncErrors } from "../../errors";
import { initializeAws } from "../../utils/aws";
import { responseServerHandler, validate } from "../../utils/validation";
import Employer from "../../models/employer/employers.schemas";
import Event from "../../models/employer/events.schemas";
import Seeker from "../../models/seeker/seekers.schemas";

export const createNewEvent = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const existingEvent = await Event.findOne({
      title: request.body.title,
    });
    const image = request.file;
    const eventsData = request.body;

    if (existingEvent) {
      return responseServerHandler(
        { message: "Event with this title already exists" },
        400,
        response
      );
    }

    const allowedProperties = [
      "title",
      "date",
      "description",
      "image",
      "location",
      "category",
    ];

    validate(allowedProperties, eventsData, (error, message) => {
      if (error) {
        return responseServerHandler({ message: message }, 403, response);
      }
    });

    const imageKey = `employer_${employerId}.png`;
    const uploads = await initializeAws(image, imageKey, "events");
    await uploads.done();

    const newEvent = await Event.create({
      ...request.body,
      company: employerId,
      image: `events/${imageKey}`,
    });

    await Employer.findByIdAndUpdate(employerId, {
      $push: { events: newEvent._id },
    });

    responseServerHandler({ event: newEvent }, 201, response);
  } catch (error) {
    responseServerHandler(
      { message: "Cannot create event, please try again" },
      400,
      response
    );
  }
});

export const editEvent = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const updateData = request.body;
    const existingEvent = await Event.findById(request.params.eventId);

    if (!existingEvent) {
      return responseServerHandler(
        { message: "Cannot find event" },
        404,
        response
      );
    }

    if (existingEvent.company.toString() !== employerId) {
      return responseServerHandler(
        { message: "Unauthorized. You are not the owner of this event." },
        403,
        response
      );
    }

    const allowedProperties = [
      "title",
      "date",
      "description",
      "location",
      "category",
    ];

    validate(allowedProperties, updateData, (error, message) => {
      if (error) {
        return responseServerHandler({ message: message }, 403, response);
      }
    });

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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot edit event, please try again" },
      400,
      response
    );
  }
});

export const deleteEvent = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const existingEvent = await Event.findById(request.params.eventId);

    if (!existingEvent) {
      return responseServerHandler(
        { message: "Cannot find event" },
        404,
        response
      );
    }

    if (existingEvent.company.toString() !== employerId) {
      return responseServerHandler(
        { message: "Unauthorized. You are not the owner of this event." },
        403,
        response
      );
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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot delete event, please try again" },
      400,
      response
    );
  }
});

export const registerEvent = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const eventId = request.params.eventId;
    const event = await Event.findById(eventId);

    if (!event) {
      return responseServerHandler(
        { message: "Cannot Find Event" },
        404,
        response
      );
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
  } catch (error) {
    responseServerHandler(
      { message: "Error registering events, please try again" },
      400,
      response
    );
  }
});
