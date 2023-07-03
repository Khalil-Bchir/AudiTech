const Section = require("../Models/Sections");
const { generateCustomId } = require("../../utils/GenerateID");

const SectionController = {};

// Create section
SectionController.createSection = async (req, res) => {
  try {
    // Transform the name to lowercase and remove spaces
    const name = req.body.name;
    const lowercaseName = name.toLowerCase().replace(/\s/g, "");

    // Check if a section with the same modified name already exists
    const existingSection = await Section.findOne({ name: lowercaseName });
    if (existingSection) {
      return res.status(400).json({ message: "Section with the same name already exists" });
    }

    const sectionId = await generateCustomId("Section", "SEC");

    // Create the new section with the generated ID and modified name
    const section = new Section({ ...req.body, id: sectionId, name: lowercaseName });
    await section.save();

    res.status(201).json(section);
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
    const id = req.params.ID;
    const section = await Section.findOne({ ID: id });
    res.status(200).json({ section });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a section
SectionController.updateSection = async (req, res) => {
  try {
    const section = await Section.findOneAndUpdate(req.params.id, req.body, {
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
    const section = await Section.findOneAndDelete(req.params.ID);
    res.status(200).json({ section });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = SectionController;
