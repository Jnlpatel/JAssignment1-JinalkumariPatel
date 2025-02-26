const projectModel = require("./model");

// const listProject = async (request, response) => {
//     let projectData = await projectModel.getProject();
//     if (!projectData.length) {
//         await projectModel.initializeProject();
//         projectData = await projectModel.getProject(); // Ensure data is reloaded after initialization
//     }
//     response.render("projects/list", { projects: projectData });
// };

const listProject = async (request, response) => {
    try {
        let projectData = await projectModel.getProject();
        console.log("Fetched Projects:", projectData);  // Check the output here
        if (!projectData.length) {
            await projectModel.initializeProject();
            projectData = await projectModel.getProject();
            console.log("After initialization:", projectData); // Ensure data is being reloaded
        }
        response.render("projects/list", { projects: projectData });
    } catch (error) {
        console.error("Error fetching projects:", error);
        response.status(500).send("Error fetching projects");
    }
};


const showAddForm = async (request, response) => {
    response.render("projects/add");
};

const addNewProject = async (request, response) => {
    let result = await projectModel.addProject(
        request.body.name,
        request.body.description,
        request.body.technology
    );

    console.log("New project added:", result);
    response.redirect("../list");
};

const deleteProjectById = async (request, response) => {
    let id = request.query.projId;
    await projectModel.deleteProject(id);
    console.log("Project deleted with ID:", id);
    response.redirect("../list");
};

module.exports = {
    listProject,
    showAddForm,
    addNewProject,
    deleteProjectById
};
