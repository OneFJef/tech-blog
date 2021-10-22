const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// GET '/' to list all posts

// GET '/post/:id' on selection of a post

// GET '/dashboard' and verify logged in status

// GET '/login' on selection of dashboard or login page if not logged in

module.exports = router;