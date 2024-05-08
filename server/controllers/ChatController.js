import ChatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create a new chat
export const newChat = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    // Check if a chat with the given members already exists
    const existingChat = await ChatModel.findOne({
      members: { $all: [userId, friendId] },
    });

    if (existingChat) {
      // If the chat already exists, return it
      return res.status(200).json(existingChat);
    }

    // If the chat doesn't exist, create a new one
    const newChat = new ChatModel({
      members: [userId, friendId],
    });
    
    // Save the new chat to the database
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};