const User = require("./User");
const Post = require("./Post");

// User has many Posts

// Post belongs to a single user

module.exports = { User, Post };
