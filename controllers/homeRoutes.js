const router = require('express').Router();
const { User, BlogPost, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
  const post= await BlogPost.findAll({
    attributes: [
      'id',
      'post',
      'title',
      'date_created'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'commentText', 'user_id', 'post_id', 'date_created'],
        include:{
          model:User,
          attributes:['username']
        }
      }
    ]
    
  }) 
  res.render('homepage', post);
} catch(err){
  res.status(500).json(err)
}
});
router.get('/login', (req,res) =>{
  if (req.session.loggedIn){
    res.redirect('/');
    return;
  }
  res.render('login')
});
router.post('/', async (req, res)=>{
  try{
    const dbPostData=await BlogPost.findAll({
      title:req.body.title,
      post: req.body.post,
      date_created:req.body.date_created,
      user_id: req.body.user_id,
    });
    res.status(200).json(dbPostData);
  }catch (err){
    res.status(500).json(err)
  }
})
module.exports= router;