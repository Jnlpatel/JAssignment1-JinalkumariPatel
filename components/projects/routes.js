const express = require("express");
const router = express.Router();

const { listProject, showAddForm, addNewProject, deleteProjectById } = require("./controller");

router.get("/list", listProject);
router.get("/add", showAddForm);
router.post("/add/submit", addNewProject);
router.get("/delete/submit", deleteProjectById);

module.exports = router;
