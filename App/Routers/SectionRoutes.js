const express = require ("express");

const SectionController = require ('../Controllers/SectionController');

const router = express.Router();

router.post('/Section', SectionController.createSection); //create new section
router.get('/Sections',SectionController.getSections); //get all sections
router.get('/Section/:SectionID',SectionController.getSection); //get section by id
router.put('/Section/:SectionID',SectionController.updateSection); // update section
router.delete('/Section/:SectionID',SectionController.deleteSection); //delete section

module.exports = router;