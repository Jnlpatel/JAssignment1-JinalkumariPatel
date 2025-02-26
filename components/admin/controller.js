const adminModel = require("./model");

const loginForm = (req, res) => {
    res.render("admin/login");
};

const login = async (req, res) => {
    let auth = await adminModel.authenticateAdmin(req.body.user, req.body.pass);
    if (auth) {
        req.session.loggedIn = true;
        req.session.user = req.body.user;
        res.redirect("/admin");
    } else {
        res.render("admin/login", { err: "Admin not found" });
    }
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};

const registerForm = (req, res) => {
    res.render("admin/register");
};

const register = async (req, res) => {
    let result = await adminModel.addAdmin(req.body.user, req.body.pass);
    if (result) {
        res.redirect("/admin/login");
    } else {
        res.render("admin/register", { err: "Username already exists" });
    }
};

const adminPage = (req, res) => {
    if (req.session.loggedIn) {
        res.render("admin/admin", { username: req.session.user });
    } else {
        res.redirect("/admin/login");
    }
};

module.exports = { loginForm, login, logout, registerForm, register, adminPage };
