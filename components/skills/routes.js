const express = require("express");
const router = express.Router();
const { listSkills, showAddForm, addNewSkill, deleteSkillById } = require("./controller");

router.get("/list", listSkills);
router.get("/add", showAddForm);
router.post("/add/submit", addNewSkill);
router.get("/delete/submit", deleteSkillById);

module.exports = router;
