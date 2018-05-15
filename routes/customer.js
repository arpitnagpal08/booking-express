const joi = require("joi");
const joiValidator = require("../joiValidator");
const controllers = require("../controllers");

let signUp = async (req, res) => {
    let validate = joi.validate(req.body, joiValidator.signUp());
    if(validate.error != null) {
        res.send(validate.error.details[0].message);
    }
    else {
        let sign = await controllers.customerController.signUp(req.body);
        return sign;
    }
}

let login = async (req, res) => {
    let validate = joi.validate(req.body, joiValidator.login());
    if(validate.error != null){
        res.send(validate.error.details[0].message);
    }
    else{
        let checkCredentials = await controllers.customerController.login(req.body);
        return checkCredentials;
    }
}

let verifyOtp = async (req, res) => {
    let verify = await controllers.customerController.verifyOtp(req);
    return verify;
}

let addAddress = async (req, res) => {
    let check = joi.validate(req.body, joiValidator.address());
    if(check.error != null){
        res.send(check.error.details[0].message);
    }else{
        let add = await controllers.customerController.addAddress(req);
        return add;    
    }
}



module.exports = {
    signUp,
    login,
    verifyOtp,
    addAddress
}
