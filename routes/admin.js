const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Skill = require('../models/skill');

// Admin Dashboard
router.get('/', (req, res) => {
  res.render('admin/dashboard');
});

// ---- PROJECT ROUTES ---- //

// List all projects
router.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.render('admin/projects', { projects });
});

// Add project form
router.get('/projects/add', (req, res) => {
  res.render('admin/addProject');
});

// Add project POST
router.post('/projects/add', async (req, res) => {
  const { title, description, technologies, link, image } = req.body;
  await Project.create({ title, description, technologies: technologies.split(','), link, image });
  res.redirect('/admin/projects');
});

// Edit project form
router.get('/projects/edit/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('admin/editProject', { project });
});

// Update project
router.post('/projects/edit/:id', async (req, res) => {
  const { title, description, technologies, link, image } = req.body;
  await Project.findByIdAndUpdate(req.params.id, { title, description, technologies: technologies.split(','), link, image });
  res.redirect('/admin/projects');
});

// Delete project
router.get('/projects/delete/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/admin/projects');
});

// ---- SKILL ROUTES ---- //

// List all skills
router.get('/skills', async (req, res) => {
  const skills = await Skill.find();
  res.render('admin/skills', { skills });
});

// Add skill form
router.get('/skills/add', (req, res) => {
  res.render('admin/addSkill');
});

// Add skill POST
router.post('/skills/add', async (req, res) => {
  const { name, category, proficiency } = req.body;
  await Skill.create({ name, category, proficiency });
  res.redirect('/admin/skills');
});

// Edit skill form
router.get('/skills/edit/:id', async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  res.render('admin/editSkill', { skill });
});

// Update skill
router.post('/skills/edit/:id', async (req, res) => {
  const { name, category, proficiency } = req.body;
  await Skill.findByIdAndUpdate(req.params.id, { name, category, proficiency });
  res.redirect('/admin/skills');
});

// Delete skill
router.get('/skills/delete/:id', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/admin/skills');
});

module.exports = router;
