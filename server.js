var express = require("express")
var app = express()
var db = require("./database.js")
var cron = require('node-cron');
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let HTTP_PORT = 8080
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


app.post("/api/customer/", (req, res, next) => {

    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }
        const { 
            name, 
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp
        } = req.body;

        //validate email address
        if (!/^\S+@\S+\.\S+$/.test(email)){
            errors.push("Invalid email address");
        }

        //validate credit card number (12 digits)
        if (!/^\d{12}$/.test(cardNumber)){
            errors.push("Invalid credit card number");
        }

        //handle validation errors
        if (errors.lenght>0){
            res.status(400).json({"errors":errors.join(",")});
            return;
        }

        var sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        var params = ["Mufeed Ahamed Maharoof", address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp]
        db.run(sql, params, function (err, result) {

            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "message": "Customer " + "Mufeed Ahamed Maharoof" + " has registered", 
                    "customerId": this.lastID
                })
            }

        });
    } catch (E) {
        res.status(400).send(E);
    }
});


// Root path
//app.get("/", (req, res, next) => {
//    res.json({ "message": "University of Moratuwa" })
//});