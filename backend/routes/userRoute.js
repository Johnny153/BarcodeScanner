const router=require('express').Router();
const User=require('../models/user');
const BCrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.get('/',async (req, res) => {
    try{
        const user = await User.find();
        res.json(user);
    } catch(error){
        res.json([message, error]);
    }
})

router.get('/:userId',async (req, res) => {
    try{
        const user = await User.findById(
            {_id:req.params.userId});
        res.json(user);
    } catch(error){
        res.json([message, error]);
    }
})

router.post('/register', async(req, res) => {
    
    try{
        const salt=await BCrypt.genSalt(5);
        const hash=await BCrypt.hash(req.body.password,salt);
        var user= new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role:req.body.role,
            password: hash,
            email: req.body.email
        });
        const savedUser=await user.save();
        res.send({user: savedUser._id});
    }
    catch(error){
        res.status(400).send(error);
    }
})

router.post('/login',async (req, res) => {
    try {
        const user= await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).send('User not found!');
        }

        const checkPass=await BCrypt.compare(req.body.password,user.password);
        if(!checkPass)
        {
            return res.status(400).send('Password is wrong!');
        }
        const token=jwt.sign({
            _id:user._id,
            role:user.role
        }, process.env.SECRET);
        res.header('token',token).send({
            token:token,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            role:user.role,
            productsHistory:user.productsHistory
        }).status(200);
    }
    catch (error) {
        res.status(400).send(error);
    }
})

router.put('/:userId', async(req, res) => {
    try {
        const patched= await User.findByIdAndUpdate(
            {_id:req.params.userId},
            {$set:req.body},
            {new:true});
        res.json(patched);
    }
    catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/:userId', async(req,res) => {
    try {
        const deletedUser=await User.findByIdAndDelete(
            {_id:req.params.userId});
            res.json(deletedUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports=router;