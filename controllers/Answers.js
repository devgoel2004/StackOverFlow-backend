import mongoose from "mongoose";
import Questions from "../models/questionsModel.js";
import users from "../models/authModel.js";
export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable");
  }
  updateNoQuestions(_id, noOfAnswers);
  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    });
    const user = await users.findById(userId);
    user.answerGiven += 1;
    user.score2 += 1;
    await user.save();
    if (user.answerGiven == 5) {
      user.badge = "Pupil";
      user.score2 += 20;
    } else if (user.answerGiven == 20) {
      user.badge = "Specialist";
      user.score2 += 50;
    } else if (user.answerGiven == 50) {
      user.badge = "Expert";
      user.score2 += 70;
    } else if (user.answerGiven == 100) {
      user.badge = "Candidate Master";
      user.score2 += 100;
    } else if (user.answerGiven == 250) {
      user.badge = "Master";
      user.score2 += 150;
    } else if (user.answerGiven == 500) {
      user.badge = "Grand Master";
      user.score2 += 200;
    }
    user.score = user.score1 + user.score2;
    await user.save();
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateNoQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
    // res.status(200)
  }
};
export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("answer unavailable...");
  }
  updateNoQuestions(_id, noOfAnswers);
  try {
    await Questions.updateOne(
      {
        id,
      },
      {
        $pull: { answer: { _id: answerId } },
      }
    );
    res.status(200).json({ message: "successfully deleted the answer" });
  } catch (error) {
    res.status(405).json(error);
  }
};
