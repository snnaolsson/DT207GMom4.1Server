const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//user schemqa
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true, 
        trim: true
    },
    password: {
        type: String, 
        requires: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//hash pw
userSchema.pre("save", async function(next){
    try{
        if(this.isNew || this.isModified("password")){
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    }catch(error){
        next(error);
    }
});

//register user
userSchema.statics.register = async function (username, password){
    try{
        const user = new this({username, password});
        await user.save();
        return user;
    }catch(error){
        throw error;
    }
};

//compare hashed pw
userSchema.methods.comparePassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password);
       
    }catch(error){
        throw error;
    }
};

//ogin user
userSchema.statics.login = async function(username, password){
    try{
        const user = await this.findOne({username});
        if (!user){
            throw new Error('Incorrect username or password');
        }
        const ifPasswordMatch = await user.comparePassword(password);
        //incorrect
        if(!ifPasswordMatch){
            throw new Error('Invalid username or password');
        }

    }catch(error){
        throw error;
    }
}

const User = mongoose.model("user", userSchema);
module.exports = User;