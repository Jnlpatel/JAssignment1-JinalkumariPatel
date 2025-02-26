const skillModel = require("./model");

// List all skills
const listSkills = async (request, response) => {
    let skillData = await skillModel.getSkills();

    if (!skillData.length) {
        await skillModel.initializeSkills();
        skillData = await skillModel.getSkills();
    }

    response.render("skills/list", { skills: skillData });
};

// Show the add skill form
const showAddForm = async (request, response) => {
    response.render("skills/add");
};

// Add a new skill
const addNewSkill = async (request, response) => {
    let result = await skillModel.addSkill(
        request.body.name,
        request.body.proficiency,
        request.body.yearsOfExperience
    );

    console.log(result);
    response.redirect("../list");
};

// Delete a skill by ID
const deleteSkillById = async (request, response) => {
    let id = request.query.skillId;
    await skillModel.deleteSkill(id);
    console.log(id);
    response.redirect("../list");
};

// Export controllers
module.exports = {
    listSkills,
    showAddForm,
    addNewSkill,
    deleteSkillById
};
