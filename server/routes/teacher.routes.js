const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let teacher = require("../models/teacher-schema");

router.route("/create").post((req, res, next) => {
  teacher
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
  teacher.find().then(function (data) {
    if (!data) {
      return next("Error");
    } else {
      res.json(data);
    }
  });
});

router.route("/edit/:id").get((req, res) => {
  teacher.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/update/:id").put((req, res, next) => {
  teacher.findByIdAndUpdate(
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
        console.log("Teacher updated successfully !");
      }
    }
  );
});

router.route("/delete/:id").delete((req, res, next) => {
  teacher.findByIdAndRemove(req.params.id, (error, data) => {
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
