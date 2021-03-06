const services = require("../services");
const jwt = require("jsonwebtoken");
const boom = require("boom");

async function insertBooking(req){
    try {
        let verifyToken = await jwt.verify(req.headers.token, 'secretKey');
        let insert = await services.bookingServices.insertBooking(verifyToken, req.body);
        return {
            statusCode: 200,
            message: "Booking Inserted",
            data: {
                title: req.body.title,
                source_latitude: insert[0].latitude,
                source_longitude: insert[0].longitude,
                destination_latitude: req.body.destination_latitude,
                destination_longitude: req.body.destination_longitude
            }
        }
        
    } catch (error) {
        return error;
    }
}

async function getBooking(req){
    try {
        let verifyToken = await jwt.verify(req.headers.token, 'secretKey');
        if(req.headers.search){
            let getSearchBookings = await services.bookingServices.getSearchBookings(verifyToken, req.headers.search);
            if(getSearchBookings.length != 0){
                let bookings = [];
                getSearchBookings.forEach(element => {
                    let getBookings = {
                        booking_title: element.booking_title,
                        source_latitude: element.latitude,
                        source_longitude: element.longitude,
                        destination_latitude: element.destination_latitude,
                        destination_longitude: element.destination_longitude,
                        customer_details: {
                            name: element.customer_name,
                            email: element.customer_email,
                            phone: element.customer_phone
                        }
                    }
                    bookings.push(getBookings);
                });
                return bookings;
            }
            else{
                return "No booking Found"
            }
        }
        else{
            let getBook = await services.bookingServices.getBooking(verifyToken);
            let bookings = [];
            getBook.forEach(element => {
                let getBookings = {
                    booking_title: element.booking_title,
                    source_latitude: element.latitude,
                    source_longitude: element.longitude,
                    destination_latitude: element.destination_latitude,
                    destination_longitude: element.destination_longitude,
                    customer_details: {
                        name: element.customer_name,
                        email: element.customer_email,
                        phone: element.customer_phone
                    }
                }
                bookings.push(getBookings);
            });
            return bookings;
        }
    } catch (error) {
        return error;        
    }
}


async function updateBooking(req){
    try {
        let verifyToken = jwt.verify(req.headers.token, 'secretKey');
        let updateBook = await services.bookingServices.updateBooking(verifyToken, req.body);
        return {
            statusCode: 200,
            message: "Booking Updated",
            data: {
                seat: req.body.seat,
                destination_latitude: req.body.destination_latitude,
                destination_longitude: req.body.destination_longitude
            }
        }
    } catch (error) {
        return error
    }
}


module.exports = {
    insertBooking,
    getBooking,
    updateBooking
}