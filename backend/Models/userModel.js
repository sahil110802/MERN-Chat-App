const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema= mongoose.Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        pic:{type:String, required:true, 
            default:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.pngarts.com%2Ffiles%2F10%2FDefault-Profile-Picture-PNG-Image-Background.png&tbnid=O0Bq3ZCk7PEsyM&vet=12ahUKEwil4ejP_v3-AhXFJrcAHU0dBG4QMygOegUIARD2AQ..i&imgrefurl=https%3A%2F%2Fwww.pngarts.com%2Fexplore%2Ftag%2Fdefault-profile-picture&docid=YKFsOEF9iKfEQM&w=973&h=913&q=user%20default%20dp&ved=2ahUKEwil4ejP_v3-AhXFJrcAHU0dBG4QMygOegUIARD2AQ"},
    },
    {
        timestamps:true
    }
);


userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre('save', async function(next){
    if (!this.isModified) {
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

const User= mongoose.model("User",userSchema);
module.exports=User;