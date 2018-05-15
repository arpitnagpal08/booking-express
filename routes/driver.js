const joi = require("joi");
const joiValidator = require("../joiValidator");
const controller = require("../controllers");

let signUp = async (req, res) => {
    let validate = joi.validate(req.body, joiValidator.signUp());
    if(validate.error != null) {
        res.send(validate.error.details[0].message)
    }
    else{
        let sign = await controller.driverController.signUp(req.body);
        return sign
    }
}

let login = async (req, res) => {
    let validate = joi.validate(req.body, joiValidator.login());
    if(validate.error != null){
        res.send(validate.error.details[0].message);
    }
    else{
        let login = await controller.driverController.login(req.body);
        return login;
    }
}

module.exports = {
    signUp,
    login
}

