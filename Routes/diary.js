const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Diary = require("../models/Diary");
const { body, validationResult } = require("express-validator");
//route 1:get all the diary
router.get("/fetchdiary", fetchuser, async (req, res) => {
  try {
    const diary = await Diary.find({ user: req.user.id });
    res.json(diary);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//route 2: add diary
router.post(
  "/addiary",
  fetchuser,
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 5 characters long"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 3 characters long"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const diary = new Diary({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedDiary = await diary.save();
      res.json(savedDiary);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//rote 3:delte a diary
router.delete("/deletediary/:id", fetchuser, async (req, res) => {
  try {
    let diary = await Diary.findById(req.params.id);
    if (!diary) {
      return res.status(404).send("Not found");
    }
    if (diary.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    diary = await Diary.findByIdAndDelete(req.params.id);
    res.json({ Success: "You Diary has been deleted", diary: diary });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
