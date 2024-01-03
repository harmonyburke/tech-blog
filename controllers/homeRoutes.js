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
    
  }) res.render('homepage', {User});
} catch(err){
  res.status(500).json(err)
}
})