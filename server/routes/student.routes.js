const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let student = require("../models/student-schema");

router.route("/create").post((req, res, next) => {
  student
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
  student.find().then(function (data) {
    if (!data) {
      return next("Error");
    } else {
      res.json(data);
    }
  });
});

router.get("/:id", async (req, res) => {
  try {
    const requiredStudent = await student.findOne({ studentid: req.params.id });

    if (!requiredStudent) {
      return res.status(404).json({ message: "No student found" });
    }

    res.status(200).json(requiredStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.route("/edit/:id").get((req, res) => {
  student.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/update/:id").put((req, res, next) => {
  student.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
});

router.route("/delete/:id").delete((req, res, next) => {
  student.findByIdAndRemove(req.params.id, (error, data) => {
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
