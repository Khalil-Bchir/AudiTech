const Section = require("../Models/Sections");
const { generateCustomId } = require("../../utils/GenerateSectionID");

const SectionController = {};

// Create section
SectionController.createSection = async (req, res) => {
  try {
    const sectionId = await generateCustomId();

    //transform the name to lowercase and removing spaces
    let { name } = req.body;
    name = name.toLowerCase().replace(/\s/g, "");

    // Check if a module with the same modified name already exists
    const existingModule = await Section.findOne({ name });
    if (existingModule) {
      return res
        .status(400)
        .json({ message: "Section with the same name already exists" });
    }

    // Create the new section with the generated ID
    const module = new Section({ ...req.body, sectionID: sectionId });
    await module.save();

    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sections
SectionController.getSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json({ sections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a section
SectionController.getSection = async (req, res) => {
  try {
    const sectionID = req.params.sectionID;
    const section = await Section.findOne({sectionID: sectionID});
    res.status(200).json({ section });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a section
SectionController.updateSection = async (req, res) => {
  try {
    const section = await Section.findOneAndUpdate(req.params.sectionID, req.body, {
      new: true,
    });
    res.status(200).json({ section });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a section
SectionController.deleteSection = async (req, res) => {
  try {
    const section = await Section.findOneAndDelete(req.params.sectionID);
    res.status(200).json({ section });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = SectionController;
