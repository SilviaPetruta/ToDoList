const {Router} = require('express');
const router = Router();
const ToDoList = require('../models/todolist');
const { Mongoose } = require('mongoose');
const e = require('express');

router.post('/update', async(req, res) => {
    let { checked, id } = req.body;
    let isChecked = checked == 'on' ? true : false;
    
    ToDoList.updateOne({_id: id}, {checked: isChecked}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(`Successfully updated the document with id ${id}`);
        }
    });

    res.redirect('/todolist');
});

router.post('/delete', async(req, res) => {
    let { id } = req.body;
    
    ToDoList.deleteOne({_id: id}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(`Successfully deleted the document with id ${id}`);
        }
    });
    res.redirect('/todolist');
});

router.post('/deleteAll', async(req, res) => {
    
    ToDoList.deleteMany({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(`Successfully deleted all the tasks`);
        }
    });
    res.redirect('/todolist');
});

router.get('/', async(req, res) => {
    let orderBy = req.query.orderBy;

    let myTasks = await ToDoList.find({});
    let myTaskArray = myTasks.map(task => task.toObject());

    if(orderBy) {
        switch(orderBy) {
            case "cdtDesc":
                myTaskArray.sort((a,b) => byCreatedDateTimeDesc(a,b));
                break;
            case "cdtAsc": 
                myTaskArray.sort((a, b) => byCreatedDateTimeAsc(a,b));
                break;
            default:
                break;
        }
    }
    
    res.render('todolist', { myTaskArray });
});

byCreatedDateTimeAsc = (a, b) => {
    firstCreatedDateTime = new Date(a.createdDateTime);
    secondCreatedDateTime = new Date(b.createdDateTime);
    
    return firstCreatedDateTime.getTime() - secondCreatedDateTime.getTime();
}

byCreatedDateTimeDesc = (a, b) => {
    firstCreatedDateTime = new Date(a.createdDateTime);
    secondCreatedDateTime = new Date(b.createdDateTime);
    
    return secondCreatedDateTime.getTime() - firstCreatedDateTime.getTime();
}

router.post('/', async(req, res) => {
    let { descriptionTask } = req.body;
    let date_ob = new Date();
    // console.log(date_ob);

    const task = new ToDoList({
        descriptionTask,
        checked: false,
        createdDateTime: date_ob
    });

    await task.save();
    res.redirect('/todolist');
})

module.exports = router;