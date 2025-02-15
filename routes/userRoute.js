const express = require('express');
const Complain = require('../models/userComplain');
const Schedule = require('../models/scheduleModel');
const Update = require('../models/updateModel');

const userRoute = express.Router();

// user complain create
userRoute.post('/complain', async (req, res) => {
    const { name, email, category, phone, message } = req.body;
    try {
        if (!name || !email || !category || !phone || !message) {
            return res.status(404).json({ message: 'Validation error' })
        }
        const complainCreate = await Complain.findOne({ email });
        if (complainCreate) {
            return res.status(407).json({ message: 'Your complain is Already submitted' })
        }
        const newComplain = new Complain({
            name,
            email,
            category,
            phone,
            message
        })

        await newComplain.save();
        res.status(200).json({ isSuccessfully: true, message: 'Your complain is Successfully submitted', data: newComplain })

    } catch (error) {
        console.log(error)
        return res.status(412).json({ message: 'Internal server error' })
    }
})

//get
userRoute.get('/complain', async (req, res) => {
    try {
        const userFind = await Complain.find()
        if (!userFind) {
            return res.status(404).json({ message: 'No Users' })
        } else {
            res.status(200).json({ isSuccessfully: true, message: 'All data get', data: userFind })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

//schedule post

userRoute.post('/schedule', async (req, res) => {
    const { name, category, email, phone, date, time } = req.body;
    try {
        if (!name || !category || !email || !phone || !date || !time) {
            return res.status(404).json({ message: 'Validation error' })
        }
        const userSchedule = await Schedule.find();
        if (!userSchedule) {
            return res.status(412).json({ isSuccessfully: false, message: 'No Users' })
        }

        const newSchedule = new Schedule({
            name,
            category,
            email,
            phone,
            date,
            time
        })

        await newSchedule.save()
        res.status(201).json({ isSuccessfully: true, message: 'You are Sheduled', data: newSchedule })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ isSuccessfully: false, message: 'Internal server error' })
    }
})


//schedule get
userRoute.get('/schedule', async (req, res) => {
    try {
        const dataGet = await Schedule.find()
        if (dataGet.length === 0) {
            return res.status(407).json({ isSuccessfully: false, message: 'No Users' })
        } else {
            res.status(200).json({ isSuccessfully: true, message: 'Successfully Data Get', data: dataGet })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ isSuccessfully: false, message: 'Internal server error' })
    }
})

//update api post

userRoute.post('/updates', async (req, res) => {
    const { name, category, price, limitedTime } = req.body;

    try {
        if (!name || !category || !price || !limitedTime) {
            return res.status(400).json({ isSuccessfully: false, message: 'Validation error' });
        }

        const newUpdate = new Update({
            name,
            category,
            price,
            limitedTime
        });

        await newUpdate.save();

        res.status(201).json({ isSuccessfully: true, message: 'Successfully Posted', data: newUpdate });

    } catch (error) {
        console.error(error);
        res.status(500).json({ isSuccessfully: false, message: 'Internal server error' });
    }
});


//update get api
userRoute.get('/updates', async (req, res) => {
    try {
        const result = await Update.find()
        return res.status(200).json({ isSuccessfully: true, message: 'Successfully get', data: result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ isSuccessfully: false, message: 'Internal server error' })
    }
})

module.exports = userRoute;