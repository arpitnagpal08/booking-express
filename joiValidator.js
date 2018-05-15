const joi = require("joi");

class joiValidator{
    
    static signUp(){
        const signUpJoi = {
            name: joi.string().required(),
            phone: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required().min(5)
        }
        return signUpJoi;
    }
    
    static login(){
        const loginJoi = {
            email: joi.string().email().required(),
            password: joi.string().required().min(5)
        }
        return loginJoi;
    }

    static address(){
        const addressJoi = {
            detail: joi.string().optional(),
            latitude: joi.string().required(),
            longitude:  joi.string().required(),
            headers: joi.object({
                'token': joi.string().required()
            }).unknown()
        }
        return addressJoi;
    }

    static booking(){
        const bookingJoi = {
            title: joi.string().optional(),
            seat: joi.number().required().min(1),
            source_id: joi.number().required(),
            destination_latitude: joi.string().required(),
            destination_longitude: joi.string().required(),
            headers: joi.object({
                'token': joi.string().required()
            }).unknown()
        }   
        return bookingJoi;
    }

    static getBooking(){
        const getBookingJoi = {
            headers: joi.object({
                'token': joi.string().required()
            }).unknown()
        }
        return getBookingJoi;
    }

}

module.exports = joiValidator