
/*const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");
const Pitch = require("../models/pitchModel"); 

router.post("/", upload.single("pitchDeck"), async (req, res) => {
  try {
    const {
      title,
      companyName,
      category,
      stage,
      shortDescription,
      detailedDescription,
      firebaseUserId,
    } = req.body;

    let deckUrl = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "pitch_decks" },
        (error, result) => {
          if (error) throw error;
          deckUrl = result.secure_url;
        }
      );
      const stream = require("streamifier").createReadStream(req.file.buffer);
      stream.pipe(uploadResult);
    }

    // Save pitch to MongoDB
    const newPitch = new Pitch({
      userId: firebaseUserId,
      title,
      companyName,
      category,
      stage,
      shortDescription,
      detailedDescription,
      pitchDeckUrl: deckUrl,
    });

    await newPitch.save();

    res.status(201).json({ message: "Pitch submitted successfully", pitch: newPitch });
  } catch (err) {
    console.error("Pitch upload error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;*/
