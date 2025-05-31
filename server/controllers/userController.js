import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//register user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.json({success:false, message:"Missing Details"});
}
const existingUser = await User.findOne({email});
if(existingUser){
    return res.json({success:false, message:"User already exists"});
}
const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({name, email, password:hashedPassword});
const token=jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn:'7d'}); 
    
    } catch (error){ 
        console.log(error);
        return res.json({success:false, message:"Something went wrong"});
    }
}