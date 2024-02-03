var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE IF NOT EXISTS customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            address text,
            email text,
            dateOfBirth text,
            gender text,
            age INTEGER,
            cardHolderName text,
            cardNumber INTEGER,
            expiryDate text,
            cvv INTEGER,
            timeStamp text
            )`, (err) => {
            if (err) {
                // handle table creation error
                console.error(err.message);
            } else {
                // table exists or has been created successfully
                //var insert = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
                //db.run(insert, ["Mufeed M A", "No 324/A Ra De Mel Road, Colombo", "lakith@gmail.com", "1991.02.25", "male", 28, "Mufeed M A",102445217895 ,"12/2022", 246, "2022-12-31 23:59:59"])
            }
        })
    }
})

module.exports = db

