const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
/* GET users listing. */
userRouter.get("/login", function (req, res, next) {
  res.render("login", { title: "Login - Todos" });
});
userRouter.post("/logout", function (req, res, next) {
  res.clearCookie("connect.sid");
  req.session.destroy((error) => {
    if (error) {
      return res.status(404).send(false);
    }
    return res.status(200).send(true);
  });
});
userRouter.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ status: false, message: "Schema error" });
  }
  try {
    const user = await User.findByPk(email);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Email doesn't exists" });
    }
    if (user.password !== password) {
      return res
        .status(404)
        .json({ status: false, message: "Password incorrect" });
    }
    req.session.user = { email: user.email, name: user.name };
    return res.status(200).json({
      status: true,
      message: "Authentication successfull",
      user: { email: user.email, name: user.name, id: user.id },
    });
  } catch (error) {
    return res.status(404).json({ status: false, message: "Error occured" });
  }
});
userRouter.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Signup - Todos", message: {} });
});
userRouter.post("/signup", async function (req, res, next) {
  const { name, email, password } = req.body;
  try {
    if (!User.findByPk(email)) {
      return res.render("signup", {
        title: "Signup - Todos",
        message: { isError: true, data: "User already exists " },
      });
    }
    await User.create({ name, email, password });
    return res.render("signup", {
      title: "Signup - Todos",
      message: { isError: false, data: "User created login to continue" },
    });
  } catch (error) {
    return res.render("signup", {
      title: "Signup - Todos",
      message: { isError: false, data: "Some error occured !" },
    });
  }
});

module.exports = userRouter;
