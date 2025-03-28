const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        username: {
            type: String,
            required: true,
            minlength: 3,
            unique: true,
            trim: true,
        },
        firstname: {
            type: String,
            required: true,
            minlength: 3,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            minlength: 3,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["User", "Admin"],
            default: "User",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
