import { asyncErrors } from "../../errors";
import { responseServerHandler } from "../../utils/validation";
import { io } from "../../server";
import Employer from "../../models/employer/employers.schemas";
import Seeker from "../../models/seeker/seekers.schemas";
import Message from "../../models/shared/messages.schemas";

export const createDirectMessages = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const { seekerId } = request.params;
    const existingEmployer = await Employer.findById(employerId);
    const existingSeeker = await Seeker.findById(seekerId);

    if (!existingEmployer || !existingSeeker) {
      return responseServerHandler(
        { message: "Employer or Seeker not found" },
        404,
        response
      );
    }

    const existingDirectMessages = existingEmployer.directMessages.find(
      (message: any) => message.seekerId.toString() === seekerId.toString()
    );

    if (existingDirectMessages) {
      return responseServerHandler(
        { message: "Direct messages already exist" },
        400,
        response
      );
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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot create direct messages, please try again" },
      400,
      response
    );
  }
});

export const typeMessage = asyncErrors(async (request, response) => {
  try {
    const { sender, content } = request.body;
    const { employerId, seekerId } = request.params;

    const existingEmployer = await Employer.findById(employerId);
    const existingSeeker = await Seeker.findById(seekerId);

    if (!existingEmployer || !existingSeeker) {
      return responseServerHandler(
        { message: "Employer or Seeker not found" },
        404,
        response
      );
    }

    const existingDirectMessages = existingEmployer.directMessages.find(
      (message: any) => message.seekerId.toString() === seekerId.toString()
    );

    if (!existingDirectMessages) {
      return responseServerHandler(
        { message: "Direct messages do not exist" },
        404,
        response
      );
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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot send message, please try again" },
      400,
      response
    );
  }
});
