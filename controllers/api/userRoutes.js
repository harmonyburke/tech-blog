const router = require("express").Router();
const { User } = require("../../models");

// GET all User Data
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// new user sign up adds user to db
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);

    req.session.save(() => {
      (req.session.user_id = dbUserData.id), (req.session.loggedIn = true);

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Wrong username or password, please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    // For when working with cookies
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = User.username;
      req.session.user_id = User.user.id;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one user
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);

    // testing the route
    res.json(userData);

    // For sending userData to login.handlebars
    // res.render('login', { userData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
