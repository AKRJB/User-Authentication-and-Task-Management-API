import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'User Name is required'],
            trim: true,
            minLength: 2,
            maxLength: 50,
          },
          email: {
            type: String,
            required: [true, 'User Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
          },
          password: {
            type: String,
            required: [true, 'User Password is required'],
            minLength: 6,
          }
    }, {timestamps: true}
)


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)
