const Hospital = require("../models/Hospital");
const express = require("express");
const router = express.Router();
const Fileuploads = require("../helpers/Fileupload");

// Get all hospitals
router.get("/", async (req, res) => {
  const hospitals = await Hospital.find();

  if (!hospitals) {
    res.status(404).json({ error: "Not Found" });
  }

  res.status(200).json({
    success: true,
    hospitals,
  });
});

//Get one hospital
router.get("/:hospital_id", async (req, res) => {
  const hospital = await Hospital.findById(req.params.hospital_id);

  if (!hospital) {
    res.status(404).json({ error: "Not Found" });
  }

  res.status(200).json({
    success: true,
    hospital,
  });
});

router.put("/:hospital_id", Fileuploads.single("file"), async (req, res) => {
  const filePath = req.file?.path;
  if (req.file) {
    const hospital = await Hospital.findById(req.params.hospital_id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    hospital.image = filePath;
    await hospital.save();
    return res.json({
      code: 200,
      message: "Hospital successfully updated",
      hospital,
    });
  } else {
    const hospital = await Hospital.findByIdAndUpdate(
      { _id: req.params.hospitl_id },
      req.body,
      { new: true }
    );
    if (!hospital) {
      return res.status.status(404).json({ message: "Hopsital not found" });
    }
    return res.json({
      code: 200,
      message: "Hopsital successfully updated",
      hospital,
    });
  }
});

module.exports = router;
