const router = require('express').Router();
const { User, BlogPost, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
  const post= await BlogPost.findAll({
  
    include: [
      {
        model: User,
        attributes: ['username'],
       
      }
    ]
  
  }) ;


  const posts= post.map((blog) => blog.get({plain:true}))

  res.render('homepage', {
    posts, 
    loggedIn: req.session.loggedIn
  });
} catch(err){
  res.status(500).json(err)
}
});


router.get('/login', (req,res) =>{
  if (req.session.loggedIn){
    res.redirect('/profile');
    return;
  }
  res.render('login')
});

router.get('.post/:id', withAuth, async (req,res) => {
  try{
    const dbPostData =await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        }, {
          model: Comment,
          attributes:['id', 'commentText', 'user_id']
        }
      ]
    });
    const post = dbPostData.get({ plain:true});

    res.render('blogPost', {
      ...post,
      loggedIn: req.session.loggedIn,
      user_id:req.session.user_id
    })
  }catch(err){
    res.status(500).json(err)
  }
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
  }catch (err) {
    res.status(500).json(err)
  }
})
module.exports= router;