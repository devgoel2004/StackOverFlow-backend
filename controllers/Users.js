import mongoose from "mongoose";
import users from "../models/authModel.js";

//Get All Users controllers
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUsersDetails = [];
    allUsers.forEach((user) => {
      allUsersDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        score: user.score,
        badge: user.badge,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUsersDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Update profile controller
export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("profile unavailable");
  }
  try {
    const updateProfile = await users.findByIdAndUpdate(
      _id,
      {
        $set: { name: name, about: about, tags: tags },
      },
      { new: true }
    );
    res.status(200).json(updateProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
