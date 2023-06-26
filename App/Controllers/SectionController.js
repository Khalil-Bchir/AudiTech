const Section = require('../Models/Questions');
const {generateCustomId} = require('../../utils/GenerateIDUser');

const SectionController = {};

// Create section
SectionController.createSection = async (req, res) =>{
    try{
        // check if name already exists
        const sectionExists = await Section.findOne({name: req.body.name});
        if(sectionExists){
            return res.status(400).json({message: 'Section already exists'});
        }

        // Get the current year as a 2-digit string (e.g. "21" for 2021)
        const year = new Date().getFullYear().toString().slice(-2);

        // Get the number of existing users of the same userType
        const count = await Section.countDocuments({ userType: req.body.Type });

        // Generate a custom ID for the new user
        const customId = generateCustomId(year, req.body.type, count + 1);

        //create new section
        const newSection = new Section({
            sectionID: customId,
            name: req.body.name,
            type: req.body.type,
            description: req.body.body,
        });

        const savedSection = await newSection.save();
        res.status(201).json({savedSection});

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all sections
SectionController.getSections = async (req, res) =>{
    try{
        const sections = await section.find();
        res.status(200).json({sections});
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a section
SectionController.getSection = async (req, res) =>{
    try{
        const section = await section.findById(req.params.id);
        res.status(200).json({section});
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update a section
SectionController.updateSection = async (req, res) =>{
    try{
        const section = await section.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({section});
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a section
SectionController.deleteSection = async (req, res) =>{
    try{
        const section = await section.findByIdAndDelete(req.params.id);
        res.status(200).json({section});
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = SectionController;