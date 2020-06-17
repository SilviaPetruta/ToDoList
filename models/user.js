const {Schema, model} = require('mongoose');

const ToDoListUser = new Schema({
    name: { type: String, required:true, unique: true },
    email: { type: String, required:true, unique: true },
    password: { type: String, required:true }
}, {
    toObject: {virtuals: true}
});
//schema vs model

ToDoListUser.statics.validateSignup = async function(name, email) {
    let existingEmail = await this.findOne({ email });
    let existingUserName = await this.findOne({ name });
    //object || null

    if(existingEmail || existingUserName) {
        console.log("found user");
        return true;
    }

    console.log("did not find user");
    return false;
};

module.exports = model('todolistusers', ToDoListUser);