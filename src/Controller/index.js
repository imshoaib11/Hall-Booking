import {Router} from 'express';
import userController from './userController.js';
import bookingController from './userController.js'

const controller = Router();

controller.get('/', (req, res) => {
    res.send(`<h1>Hall Booking API is running</h1>`);
});

controller.use('/rooms',userController)
controller.use('/createRoom',userController)
controller.use('/booking',userController)

export default controller;