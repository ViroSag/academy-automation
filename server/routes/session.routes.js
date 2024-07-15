const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let session = require("../models/session-schema");

router.route("/create").post((req, res, next) => {
  session
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
  session.find().then(function (data) {
    if (!data) {
      return next("Error");
    } else {
      res.json(data);
    }
  });
});

router.route("/:id").get((req, res, next) => {
  const sessionId = req.params.id;

  session
    .findById(sessionId)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
});

router.route("/edit/:id").get((req, res) => {
  session.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/update/:id").put((req, res, next) => {
  const updateQuery = {
    $set: req.body,
  };

  session
    .findByIdAndUpdate(req.params.id, updateQuery)
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(data);
      console.log("Session updated successfully !");
    })
    .catch((error) => {
      next(error);
      console.log(error);
    });
});

router.get("/active/active", async (req, res) => {
  try {
    const activeSessions = await session.find({ isactive: true });

    if (!activeSessions) {
      return res.status(404).json({ message: "No active sessions found" });
    }

    res.status(200).json(activeSessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/deactivate/:id", async (req, res) => {
  const sessionId = req.params.id;

  try {
    const sessiontoupdate = await session.findById(sessionId);
    console.log("session found");

    if (!sessiontoupdate) {
      return res.status(404).json({ message: "Session not found" });
    }

    sessiontoupdate.isactive = false;

    await sessiontoupdate.save();

    res.status(200).json({ message: "Session deactivated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:sessionid/:studentid", async (req, res, next) => {
  const { sessionid, studentid } = req.params;

  try {
    const sessionn = await session.findById(sessionid);

    if (!sessionn) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (!sessionn.students.includes(studentid)) {
      sessionn.students.push(studentid);

      await sessionn.save();
    }

    return res.json(sessionn);
  } catch (error) {
    return next(error);
  }
});

router.route("/delete/:id").delete((req, res, next) => {
  session.findByIdAndRemove(req.params.id, (error, data) => {
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
