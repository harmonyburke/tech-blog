const router = require('express').Router();
const loginRoutes = require('./loginRoutes');
const userRoutes=require('./userRoutes');
const blogPostRoutes=require('./blogPostRoutes');
const commentRoutes=require('./commentRoutes');


router.use('/login', loginRoutes);
router.use('/user', userRoutes );
router.use('/blogPosts', blogPostRoutes)
router.use('/comment', commentRoutes)
// make route for post and comments

module.exports = router;
