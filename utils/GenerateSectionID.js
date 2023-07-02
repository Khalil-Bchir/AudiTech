const Section = require ('../App/Models/Sections')

async function getHighestSectionId() {
    const highestSection = await Section.findOne().sort('-sectionID').exec();
    if (highestSection) {
      return parseInt(highestSection.sectionID.substring(3));
    }
    return 0;
  }
  
  async function generateCustomId() {
    const lastId = await getHighestSectionId();
    const nextId = lastId + 1;
    const paddedId = nextId.toString().padStart(3, '0');
    return `SEC${paddedId}`;
  }
  
module.exports = {generateCustomId};