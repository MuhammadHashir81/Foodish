import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:'String',
        required:[true,'name is required']
    },
    email:{
        type:'String',
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:'String',
        required:[true,'password is required']
    }

});


export const User = mongoose.model('User',userSchema)