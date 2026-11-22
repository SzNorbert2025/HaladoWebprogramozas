
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Movie = require("../models/Movie");

// 1. Összes film lekérése
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// 2. Egy film lekérése ID alapján
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Érvénytelen film ID"
      });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        message: "Film nem található"
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// 3. Új film hozzáadása
router.post("/", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
});

// 4. Film módosítása
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Érvénytelen film ID"
      });
    }

    const movie = await Movie.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!movie) {
      return res.status(404).json({
        message: "Film nem található"
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
});

// 5. Film törlése
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Érvénytelen film ID"
      });
    }

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({
        message: "Film nem található"
      });
    }

    res.status(200).json({
      message: "Film sikeresen törölve"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
