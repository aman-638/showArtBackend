const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    nickName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    country: {type: String},
    profileImage: {type: String, default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"},
}, {
    versionKey: false,
    timestamps: true
})

UserSchema.pre("save", function(next){
    if(!this.isModified("password")){
        return next();
    }

    let hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

// Compare password
// UserSchema.methods.comparePassword = function(password){
//     return bcrypt.compareSync(password, this.password);
// };

module.exports = User = mongoose.model("user", UserSchema);
