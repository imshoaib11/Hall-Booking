import { rooms } from "../Data/rooms.js";
import { booking } from "../Data/bookings.js";

const getRooms = (req,res)=>{
    try{
        res.status(200).send(
            {
                message:"List of All Rooms",
                data: rooms
            })
    }
    catch(err){
        res.status(500).send(
            {
                message: err.message || "Internal Server Error",
                error: err.message
            })
    }
}

const createRoom = (req,res)=>{
    try{
        let {name, seats, amenities, price} = req.body;

        
        let newRoom = {
            id: (rooms.length+1).toString(),
            name,
            seats,
            amenities,
            price,
            bookings:[]
        }
        
        rooms.push(newRoom);
        res.status(201).send(
            {
                message:"New Room Created Successfully",
                data: newRoom
            })
    }
    catch(err){
        res.status(500).send(
            {
                message: err.message || "Internal Server Error",
                error: err.message
            })
    }
}

const createBooking = (req,res) =>{
    try{
        let {customerName, roomId, date, startTime, endTime} = req.body;

        let room = rooms.find(r=> r.id == roomId)
        if(!room){
            res.status(404).send(
                {
                    message:"Room not found"
                }
            )
        }

        let newBooking = {
            id: (booking.length+1).toString(),
            customerName,
            roomId,
            date,
            startTime,
            endTime,
            status: "Booked" 
        }

        room.booking.push(newBooking)
        booking.push(newBooking)

        res.status(201).send(
            {
                message:"Booking Done Sucessfully",
                data: newBooking
            }
        )
    }
    catch(error){
        res.status(500).send(
            {
                message: error.message || "Internal Server Error"
            }
        )
    }
}

const listAllBookedRooms = (req,res) =>{
    try{
        let roomList = rooms.map(room =>{
            let roomBookings = booking.filter(bookings => bookings.roomId == room.id)

            return{
                roomName: room.name,
                bookedStatus: roomBookings.length > 0 ? "Booked":"Available",
                bookings: roomBookings.map(booking => ({
                    customerName: booking.customerName,
                    date: booking.date,
                    startTime: booking.startTime,
                    endTime: booking.endTime
                }))
            }
        })

        res.status(200).send(
            {
                message:"Room Booking Data fetched Successfully",
                data: roomList
            }
        )
    }
    catch(error){
        res.status(500).send(
            {
                message: error.message || "Internal Server Error"
            }
        )
    }
}

const totalCustomerBooking = (req,res) => {
    try{
        const {id} = req.params;

        // Filter bookings for the specified customer
        const customerBooking = booking.filter(bookings=> bookings.id === Number(id))

        if(customerBooking.length === 0){
            return res.status(400).send({message: "Booking Not Found"})
        }

        // Count the number of times the customer has booked each room
        const roomBookingCount = {}

        customerBooking.forEach(bookings => {
            if(!roomBookingCount[bookings.roomId]){
                roomBookingCount[bookings.roomId] = 0;
            }
            else{
                roomBookingCount[bookings.roomId]++
            }
        })

        // Map bookings to include required details and booking count
        const bookingDetails = customerBooking.map(booking => ({
            bookingCount: roomBookingCount[booking.roomId],
            customerName: booking.customerName,
            roomName: rooms.find(r => r.id === booking.roomId).name,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingId: booking.bookingId,
            bookingDate: booking.bookingDate || "N/A",
            bookingStatus: booking.status
        }))

        res.status(200).send(
            {
                message:"Customer Booking Data fetched Successfully",
                data: bookingDetails
            }
        )

    }
    catch(error){
        res.status(500).send(
            {
                message: error.message || "Internal Server Error"
            }
        )
    }
}
export default {
    getRooms,
    createRoom,
    createBooking,
    listAllBookedRooms,
    totalCustomerBooking
}