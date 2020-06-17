const {Schema, model} = require('mongoose');

const todoList = new Schema ({
    descriptionTask: { type: String, required: true },
    checked: { type: Boolean },
    createdDateTime: { type: Date }
});

module.exports = model('todolist', todoList);