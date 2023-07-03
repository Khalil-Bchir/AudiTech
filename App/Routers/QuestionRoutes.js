const express = require ("express");

const QuestionController = require ('../Controllers/QuestionController');

const router = express.Router();

router.post('/Question', QuestionController.createQuestion); //create new Question
router.get('/Questions',QuestionController.getAllQuestions); //get all Questions
router.get('/Question/:ID',QuestionController.getQuestionById); //get Question by id
router.put('/Question/:ID',QuestionController.updateQuestion); // update Question
router.delete('/Question/:ID',QuestionController.deleteQuestion); //delete Question

module.exports = router;