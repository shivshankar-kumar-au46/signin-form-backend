const express = require('express');
const router = express.Router();
const {getUser, addUser, loginUser, logoutUser} = require('../controllers/usersController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/getUser',verifyToken, getUser);
router.post('/signup', addUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)




module.exports = router;