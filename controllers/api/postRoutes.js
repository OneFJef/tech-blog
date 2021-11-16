const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// GET '/' All posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "date_created"],
      order: [["date_created", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "date_created",
          ],
          include: {
            model: User,
            attributes: ["user_name"],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = (postData) => res.json(postData.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get '/:id' post by ID
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "content", "title", "date_created"],
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "date_created",
          ],
          include: {
            model: User,
            attributes: ["user_name"],
          },
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "Post was not found by that ID." });
      return;
    }
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST '/:id' (check login)
router.post('/', withAuth, (req, res) => {
    console.log('error');
    Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    })
      .then((postData) => {
        console.log(postData, 'post-creation');
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// UPDATE '/:id' (check login)
router.put('/:id', withAuth, (req, res) => {
    Post.update({
      where: {
        id: req.params.id,
      },
    })
      .then((postData) => {
        if (!postData) {
          res.status(404).json({ message: 'Post was not found by that ID.' });
          return;
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// DELETE '/:id' (check login)
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((postData) => {
        if (!postData) {
          res.status(404).json({ message: 'Post was not found by that ID.' });
          return;
        }
        res.json(postData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

module.exports = router;
