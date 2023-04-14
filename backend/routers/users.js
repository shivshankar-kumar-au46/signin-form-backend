const express = require('express');
const router = express.Router();
const {getUser, addUser, signinUser} = require('../controllers/usersController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/getUser',router.use(verifyToken), getUser);
router.post('/signup', addUser)
router.post('/signin',router.use(verifyToken), signinUser)




module.exports = router;