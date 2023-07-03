const Section = require("../Models/Sections");
const Question = require("../Models/Questions");
const { generateCustomId } = require("../../utils/GenerateID");

QuestionController = {};

// Create a question
QuestionController.createQuestion = async (req, res) => {
  try {
    // Transform the text to lowercase and remove spaces
    const text = req.body.text;
    const lowercaseText = text.toLowerCase().replace(/\s/g, "");

    // Check if a question with the same modified text already exists
    const existingQuestion = await Question.findOne({ text: lowercaseText });
    if (existingQuestion) {
      return res.status(400).json({ message: "Question already exists" });
    }

    const questionId = await generateCustomId("Question", "QUEST");

    // Create a new question with the generated ID and modified text
    const section = await Section.findOne({id: req.body.sectionID});
    if (!section) {
      return res.status(400).json({ message: "Invalid section id" });
    }
    
    const question = new Question({
      id: questionId,
      sectionID: section.id,
      text: lowercaseText,
      attributes: req.body.attributes,
    });
    await question.save();

    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// get all questions
QuestionController.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single question by ID
QuestionController.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a question
QuestionController.updateQuestion = async (req, res) => {
  try {
    const { section, text, attributes } = req.body;

    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Update the question fields
    question.section = section;
    question.text = text;
    question.attributes = attributes;

    const updatedQuestion = await question.save();
    res.json({ updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a question
QuestionController.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.remove();
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = QuestionController;
