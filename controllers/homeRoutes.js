const router = require("express").Router();
const { homedir } = require("os");
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

// GET '/' to list all posts with comments.
router.get("/", async (req, res) => {
  try {
    const data = await Post.findAll({
      attributes: ["id", "title", "content", "date_created", "user_id"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "date_created", "user_id", "post_id"],
          order: [["date_created", "DESC"]],

          include: { model: User, attributes: ["user_name"] },
        },
        {
          model: Comment,
          attributes: ["id", "comment", "date_created", "user_id", "post_id"],
          include: { model: User, attributes: ["user_name"] },
        },
      ],
    });

    const allPost = data.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      allPost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET '/post/:id' on selection of a post

// GET '/dashboard' and verify logged in status

// GET '/login' on selection of dashboard or login page if not logged in

module.exports = router;

// HOME  --  DASHBOARD  --  LOGIN/LOGOUT
// 1) POST
// 2) POST
// 3) POST
