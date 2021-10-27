const router = require("express").Router();
const { READUNCOMMITTED } = require("sequelize/types/lib/table-hints");
const { User } = require("../../models");

// Create an account.
router.post("/", async (req, res) => {
  try {
    const { user_name, email, password } = req.body;
    if (!user_name || !email || !password)
      res
        .status(400)
        .send("Please enter a User Name, E-Mail, and Password to sign up.");
    const userAccount = User.create({ user_name, email, password });
    req.session.save(() => {
      req.session.user_id = userAccount.id;
      req.session.logged_in = true;

      res.status(200).json(userAccount);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const userAccount = await User.findOne({ where: { email: req.body.email } });

    if (!userAccount) {
      res
        .status(400)
        .json({ message: "Invalid credentials, please try again." });
      return;
    }

    const validPassword = await userAccount.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Invalid credentials, please try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userAccount.id;
      req.session.logged_in = true;

      res.json({ user: userAccount, message: "Login Successful." });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;