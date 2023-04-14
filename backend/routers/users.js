const express = require('express');
const router = express.Router();
const {getUser, addUser, signinUser} = require('../controllers/usersController');

router.get('/getUser', getUser);
router.post('/signup', addUser)
router.post('/signin', signinUser)




module.exports = router;