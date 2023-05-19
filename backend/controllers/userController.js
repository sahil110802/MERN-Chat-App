const asyncHandler=require('express-async-handler');
const User=require('../Models/userModel');

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,pic}=req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter All Fields"); 
    }

    const userExists= User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists"); 
    }


    const user=await User.create({
        name, email, password, pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
        })
    }
    else{
        res.status(400);
        throw new Error("Unable to create user");
    }
})


module.exports={registerUser};