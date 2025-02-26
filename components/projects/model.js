const mongoose = require("mongoose");
const db = require("../../db");

const ProjectSchema = new mongoose.Schema(
    {
    name: String,
    description: String,
    technology: String
    }
);

const Project = mongoose.model("Project", ProjectSchema);

async function initializeProject() {
    const projectData = [
        {
            name: "Movie Review System",
            description: "A platform where user can check list of movies and give reviews to it.",
            technology: "ASP.NET Core, C#, Entity Framework, SQL Server, HTML, CSS",
        },
        {
            name: "Employee Task Management System",
            description: "An interactive platform to Manage task easily in organisation.",
            technology: "HTML, CSS, PHP",
        }
    ];

    try {
        const result = await Project.insertMany(projectData);
        console.log("Projects initialized:", result);
    } catch (error) {
        console.error("Error initializing projects:", error);
        throw error;
    }
}

async function getProject() {
    try {
        const projects = await Project.find({});
        console.log("Fetched Projects:", projects);
        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
}

async function addProject(name, description, technology) {
    try {
        const newProject = new Project({ name, description, technology });
        const result = await newProject.save();
        console.log("New Project Added:", result);
        return result;
    } catch (error) {
        console.error("Error adding project:", error);
        throw error;
    }
}

async function deleteProject(id) {
    try {
        const result = await Project.deleteOne({ _id: id });
        console.log("Delete result:", result);
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
}


module.exports = {
    initializeProject,
    getProject,
    addProject,
    deleteProject,
};
