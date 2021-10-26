const router = require('express').Router();
const { homedir } = require('os');
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// GET '/' to list all posts (pagination)

// GET '/post/:id' on selection of a post

// GET '/dashboard' and verify logged in status

// GET '/login' on selection of dashboard or login page if not logged in

module.exports = router;

// HOME  --  DASHBOARD  --  LOGIN/LOGOUT
// 1) POST
// 2) POST
// 3) POST