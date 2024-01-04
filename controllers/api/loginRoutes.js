const router = require('express').Router();
const { User, BlogPost, Comment} = require('../../models');
// const withAuth = require('../utils/auth');

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
        res.render('login', newUserData)
    }catch(err){
        res.status(500).json(err)
    }
});

router.post('/', async (req,res)=>{
    try{
        const newUserData=await User.create({
          username:req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        req.session.save(() => {
            req.session.loggedIn=true;
            res.status(200).json(newUserData);
        });
    } catch (err){
        res.status(500).json(err)
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData= await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if(!userData){
            res.status(400).json({message: 'Email or password is incorrect, please try again!'});
            return;
        }
        const password=await userData.checkPassword(req.body.password);

        if(!password){
            res.status(400).json({message:'Email or password is incorrect, please try again!'});
            return;
        }
        req.session.save(() =>{
            req.session.loggedIn=true;
            res.status(200).json({user: userData, message:'Welcome!'})
        })
    }catch (err) {
        res.status(500).json(err)
    }
});
module.exports= router;