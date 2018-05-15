let login = (email, password) => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from admin where admin_email='${email}' and admin_password='${password}'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
} 

let getAllCustomers = () => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from customer`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

let getSearchCustomer = (search) => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from customer where customer_id like '%${search}%' or customer_name like '%${search}%' or customer_phone like '%${search}%' or customer_email like '%${search}%' or date like '%${search}%'`, (err, result) => {
            if(err) reject(err);
            resolve(result)
        })
    })
}



let getAllBookings = () => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from booking`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

let getSearchBooking = (search) => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from booking where booking_title like '%${search}%' or booking_id like '%${search}%' or seat like '%${search}%' or customer_address_id like '%${search}%' or destination_latitude like '%${search}%' or destination_longitude like '%${search}%' or date like '%${search}%' or driver_id like '%${search}%'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

let getAllDrivers = () => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from driver`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

let getSearchDriver = (search) => {
    return new Promise ((resolve, reject) => {
        con.query(`select * from driver where driver_id like '%${search}%' or driver_name like '%${search}%' or driver_phone like '%${search}%' or driver_email like '%${search}%' or date like '%${search}%'`, (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

let assignDriver = (data) => {
    return new Promise ((resolve, reject) => {
        con.query(`select driver_id from booking where booking_id='${data.booking_id}'`, (err, result) => {
            if(err) reject(err);
            else{
                if(result[0].driver_id == null){
                    con.query(`update booking set driver_id=${data.driver_id} where booking_id=${data.booking_id}`, (err, result) => {
                        if(err) reject(err);
                        else{
                            con.query(`select * from booking where booking_id=${data.booking_id}`, async (err, result) => {
                                if(err) reject(err);
                                else{
                                    let book_id = `${data.booking_id}`;
                                    let desc = "Driver assigned";
                                    let date = `${new Date()}`;
                                    let log = {
                                        booking_id: book_id,
                                        desc: desc,
                                        date: date
                                    }
                                    const collection = dataBase.collection("log");
                                    let response = await collection.insertOne(log);
                                }
                                resolve(result);
                            })
                        }
                    })
                }
                else{
                    resolve("Driver Already Assigned")
                }
            }
        })
    })
}

let log = async (id) => {
    const collection = dataBase.collection("log");
    let response = await collection.find({}).sort({_id:-1}).toArray();
    return response;
}

let logSearch = async (id, search) => {
    const collection = dataBase.collection("log");

    let desc = {desc: {$regex: search}};
    let booking_id = {booking_id: {$regex: search}};
    let date = {date: {$regex: search}};

    let response = await collection.find({$or: [desc, booking_id, date]}).toArray();
    return response
}


module.exports = {
    login,
    getAllCustomers,
    getSearchCustomer,
    getAllBookings,
    getSearchBooking,
    getAllDrivers,
    getSearchDriver,
    assignDriver,
    log,
    logSearch
}