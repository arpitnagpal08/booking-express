const express = require('express');
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const connection = require("./connection");

app.use(bodyParser.json())

/**
 * ------------
 * CUSTOMER API
 * ------------
 */
app.post("/customerSignUp", async (req, res) => {
    let resp = await routes.customer.signUp(req, res);
    res.send(resp);
});

app.post("/customerLogin", async (req, res) => {
    let resp = await routes.customer.login(req, res);
    res.send(resp);
});

app.post("/verifyOtp", async (req, res) => {
    let resp = await routes.customer.verifyOtp(req, res);
    res.send(resp);
});

app.post("/addAddress", async (req, res) => {
    let resp = await routes.customer.addAddress(req, res);
    res.send(resp);
});


/**
 * ----------
 * DRIVER API
 * ----------
 */
app.post("/driverSignUp", async (req, res) => {
    let resp = await routes.driver.signUp(req, res);
    res.send(resp);
})

app.post("/driverLogin", async (req, res) => {
    let resp = await routes.driver.login(req, res);
    res.send(resp);
})

/**
 * -----------
 * BOOKING API
 * -----------
 */
 app.post("/booking", async (req, res) => {
    let resp = await routes.booking.insertBooking(req, res);
    res.send(resp);
})

app.get("/getBooking", async(req, res) => {
    let resp = await routes.booking.getBooking(req, res);
    res.send(resp);
})

app.put("/updateBooking", async (req, res) => {
    let resp = await routes.booking.getBooking(req, res);
    res.send(resp);
})


/**
 * ---------
 * ADMIN API
 * ---------
 */
app.post("/adminLogin", async (req, res) => {
    let resp = await routes.admin.adminLogin(req, res);
    res.send(resp);
});

app.get("/getAllCustomers", async (req, res) => {
    let resp = await routes.admin.getAllCustomers(req, res);
    res.send(resp);
});

app.get("/getAllBookings", async (req, res) => {
    let resp = await routes.admin.getAllBookings(req, res);
    res.send(resp);
});

app.get("/getAllDrivers", async (req, res) => {
    let resp = await routes.admin.getAllDrivers(req, res);
    res.send(resp);
})

app.post("/assignDriver", async (req, res) => {
    let resp = await routes.admin.assignDriver(req, res);
    res.send(resp);
})

app.get("/log", async (req, res) => {
    let resp = await routes.admin.log(req, res);
    res.send(resp);
})


let PORT = 3000;

app.set("port", PORT);

connection();

var server = app.listen(app.get("port"), () => {
    console.log(`App is listning at port number ${app.get("port")}`);
})