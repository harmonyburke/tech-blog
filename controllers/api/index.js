const router = require('express').Router();
const loginRoutes = require('./loginRoutes');
const userRoutes=require('./userRoutes');
const blogPostRoutes=require('./blogPostRoutes')


router.use('/login', loginRoutes);
router.use('/user', userRoutes );
router.use('/blogPosts', blogPostRoutes)
// make route for post and comments

module.exports = router;
