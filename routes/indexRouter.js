const {Router} = require('express');
const router = Router();
const ToDoListUser = require('../models/user');

router.get('/', async(req, res) => {
    res.render('index');
});

router.post('/', async(req, res) => {
    let { name, email, password } = req.body;

    if(await ToDoListUser.validateSignup(name, email)) {
        res.render('index', {err: 'A user with that username or email already exists'});
        return;
    }

    console.log('exited the thing');

    const userToDoList = new ToDoListUser({
        name,
        email,
        password
    });

    console.log(userToDoList);
    
    await userToDoList.save();
    res.redirect('/todolist');
});

module.exports = router;