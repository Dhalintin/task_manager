const User = require("../models/user.model");

class UserService {
    // Get User with email
    async getUser(email) {
        const user = User.findOne({ email });
        return user;
    }
    // Register New User
    async signup(data) {
        const newUser = new User(data);
        return await newUser.save();
    }

    async updateVerifiedStatus(user) {
        const updatedUser = await User.findByIdAndUpdate(
            { _id: user._id },
            { $set: { isVerified: true } }
        );

        return updatedUser;
    }

    async logout(id) {
        const user = User.findOneAndDelete(id);
        return user;
    }
}

module.exports = new UserService();
