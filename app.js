require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

app.get('/', async (req, res) => {
  const Project = require('./models/project');
  const Skill = require('./models/skill');
  const projects = await Project.find();
  const skills = await Skill.find();
  res.render('index', { projects, skills });
});

const port = process.env.PORT || 3000;
//SET UP SERVER LISTENING
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})