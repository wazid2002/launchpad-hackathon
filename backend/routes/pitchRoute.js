
const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");
const Pitch = require("../models/pitch");
const streamifier = require("streamifier");


const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "pitch_decks" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

router.post("/pitch", upload.single("pitchDeck"), async (req, res) => {
  try {
    const {
      title,
      companyName,
      category,
      fundingRound,
      fundingAmount,
      fundingYear,
      shortDescription,
      longDescription,
      userId,
      coverImage,
    } = req.body;

    let deckUrl = "";

    if (req.file && req.file.buffer) {
      deckUrl = await uploadToCloudinary(req.file.buffer);
    }

    // Save pitch to MongoDB
    const newPitch = new Pitch({
      userId,
      title,
      companyName,
      category,
      fundingRound,
      fundingAmount,
      fundingYear,
      shortDescription,
      longDescription,
      coverImage,
      pitchDeckLink: deckUrl,
    });

    await newPitch.save();

    res.status(201).json({
      message: "Pitch submitted successfully",
      pitch: newPitch,
    });
  } catch (err) {
    console.error("Pitch upload error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
