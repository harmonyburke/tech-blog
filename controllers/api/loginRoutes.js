const router = require('express').Router();
const { User, BlogPost, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        const newUserData=await User.findAll({
            attributes:[
                'id',
                'username',
                'password',
                'email'
            ]
        })
        res.render('login', {User})
    }catch(err){
        res.status(500).json(err)
    }
})