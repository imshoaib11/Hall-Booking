import {Router} from "express";
import userService from "../Services/userService.js";

const userController = Router();


userController.get('/',userService.getRooms)
userController.post('/',userService.createRoom)
userController.post('/createBooking',userService.createBooking)
userController.get('/:id/bookingDetails',userService.totalCustomerBooking)
userController.get('/roomList',userService.listAllBookedRooms)

export default userController

