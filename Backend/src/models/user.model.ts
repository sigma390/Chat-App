import mongoose from "mongoose";

interface User { 
    fullname:string,
    username:string,
    password:string,
    gender:string,
    profilePic:string
}

const userSchema = new mongoose.Schema<User>({
    fullname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true,
        enum: ["male", "female"]
    }
    ,
    profilePic :{
        type: String,
        default: "default_profile_pic.jpg"
    }
},{timestamps: true}
)

const User = mongoose.model<User>("User", userSchema);
export default User;
