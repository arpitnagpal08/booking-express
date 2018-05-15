const controller = require("../controllers");
const joi = require("joi");
const joiValidator = require("../joiValidator");

let adminLogin = async (req, res) => {
    let validate = joi.validate(req.body, joiValidator.login());
    if(validate.error != null){
        res.send(validate.error.details[0].message);
    }
    else{
        let login = await controller.adminController.adminLogin(req);
        return login;
    }
}

let getAllCustomers = async (req, res) => {
    let getAllCust = await controller.adminController.getAllCustomers(req);
    return getAllCust;
}

let getAllBookings = async (req, res) => {
    let getAllBooks = await controller.adminController.getAllBookings(req);
    return getAllBooks;
}

let getAllDrivers = async (req, res) => {
    let getDriver = await controller.adminController.getAllDrivers(req);
    return getDriver;
}

let assignDriver = async (req, res) => {
    let assignDriver = await controller.adminController.assignDriver(req);
    return assignDriver;
}

let log = async (req, res) => {
    let getLog = await controller.adminController.log(req);
    return getLog;
}


module.exports = {
    adminLogin,
    getAllCustomers,
    getAllBookings,
    getAllDrivers,
    assignDriver,
    log
}