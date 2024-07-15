const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let question = require("../models/question-schema");

router.route("/create").post((req, res, next) => {
  question
    .create(req.body)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      return next(error);
    });
});

router.route("/").get((req, res) => {
  const { dateasked, answered, sessionref } = req.query;

  const filters = {};

  if (dateasked) {
    filters.dateasked = dateasked;
  }

  if (answered) {
    filters.answered = answered === "true";
  }

  if (sessionref) {
    filters.sessionref = sessionref;
  }

  question
    .find(filters)
    .exec()
    .then((questions) => {
      res.json(questions);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.route("/edit/:id").get((req, res) => {
  question.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/update/:id").put((req, res, next) => {
  const questionId = req.params.id;
  const updatedData = req.body;

  console.log("Updating question:", questionId);

  const allowedUpdates = ["starttime", "endtime", "answered"];
  const updates = {};

  for (const key in updatedData) {
    if (allowedUpdates.includes(key)) {
      updates[key] = updatedData[key];
    }
  }

  if (updates.answered === false && typeof updates.answered !== "undefined") {
    updates.answered = true;
  }

  question
    .findByIdAndUpdate(questionId, { $set: updates }, { new: true })
    .then((updatedQuestion) => {
      if (!updatedQuestion) {
        return res.status(404).json({ error: "Question not found" });
      }
      console.log("Question updated successfully!");
      res.json(updatedQuestion);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.route("/delete/:id").delete((req, res, next) => {
  question.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
