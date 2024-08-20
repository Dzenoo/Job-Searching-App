import { asyncErrors } from "../errors/asyncErrors";
import Employer from "../models/employer/employers.schema";
import Seeker from "../models/seeker/seekers.schema";
import Message from "../models/shared/messages.schema";
import { io } from "../server";
import { sendResponse } from "../utils/validation";

// Controller function to create a direct messaging channel between an employer and a seeker
export const createDirectMessages = asyncErrors(async (request, response) => {
  try {
    // Get the employerId from the authenticated user and seekerId from the request parameters
    // @ts-ignore
    const { employerId } = request.user;
    const { seekerId } = request.params;

    // Find the existing employer and seeker by their IDs
    const existingEmployer = await Employer.findById(employerId);
    const existingSeeker = await Seeker.findById(seekerId);

    // Check if the employer or seeker does not exist
    if (!existingEmployer || !existingSeeker) {
      return sendResponse(
        {
          message:
            "The specified employer or seeker could not be found. Please check the IDs and try again",
        },
        404,
        response
      );
    }

    // Check if direct messages already exist between the employer and seeker
    const existingDirectMessages = existingEmployer.directMessages.find(
      (message: any) => message.seekerId.toString() === seekerId.toString()
    );

    if (existingDirectMessages) {
      return sendResponse(
        {
          message:
            "A direct messaging channel between this employer and seeker already exists.",
        },
        400,
        response
      );
    }

    // Prepare direct message data for both employer and seeker
    const directMessagesEmployerData = {
      seekerId: seekerId,
      messages: [],
    };

    const directMessagesSeekerData = {
      employerId: employerId,
      messages: [],
    };

    // Add the direct message entry to both employer and seeker
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

    // Send a success response
    sendResponse(
      { message: "Direct messages successfully created" },
      201,
      response
    );
  } catch (error) {
    // Handle any errors during the process
    sendResponse(
      { message: "Cannot create direct messages, please try again" },
      400,
      response
    );
  }
});

// Controller function to create a new message within an existing direct messaging channel
export const createMessage = asyncErrors(async (request, response) => {
  try {
    // Get the sender and content of the message from the request body
    const { sender, content } = request.body;
    // Get the employerId and seekerId from the request parameters
    const { employerId, seekerId } = request.params;

    // Find the existing employer and seeker by their IDs
    const existingEmployer = await Employer.findById(employerId);
    const existingSeeker = await Seeker.findById(seekerId);

    // Check if the employer or seeker does not exist
    if (!existingEmployer || !existingSeeker) {
      return sendResponse(
        {
          message:
            "The specified employer or seeker could not be found. Please check the IDs and try again.",
        },
        404,
        response
      );
    }

    // Check if direct messages exist between the employer and seeker
    const existingDirectMessages = existingEmployer.directMessages.find(
      (message: any) => message.seekerId.toString() === seekerId.toString()
    );

    if (!existingDirectMessages) {
      return sendResponse(
        {
          message:
            "No direct messaging channel exists between this employer and seeker. Please create one first.",
        },
        404,
        response
      );
    }

    // Create a new message in the database
    const newMessage = await Message.create({
      sender: sender,
      content: content,
    });

    // Add the message to the direct message thread for both employer and seeker
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

    // Emit the new message event to the specific socket room
    io.to(`${employerId}-${seekerId}`).emit("newMessage", newMessage);

    // Send a success response
    sendResponse({ message: "Message successfully sent" }, 201, response);
  } catch (error) {
    // Handle any errors during the process
    sendResponse(
      { message: "Cannot send message, please try again" },
      400,
      response
    );
  }
});
