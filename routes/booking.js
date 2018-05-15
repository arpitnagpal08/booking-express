const joi = require("joi");
const joiValidator = require("../joiValidator");
const controller = require("../controllers");

let insertBooking = async (req, res) => {
    let validate = joi.validate(req.body, joiValidator.booking());
    if(validate.error != null){
        res.send(validate.error.details[0].message);
    }
    else{
        let insert = await controller.bookingController.insertBooking(req);
        return insert;
    }
}

let getBooking = async (req, res) => {
        let getBook = await controller.bookingController.getBooking(req);
        return getBook;
}

let updateBooking = async (req, res) => {
    let updateBook = await controller.bookingController.updateBooking(req);
    return updateBook;
}

module.exports = {
    insertBooking,
    getBooking,
    updateBooking
}
