const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const mysql = require("mysql")
const path = require('path');
const { dblClick } = require("@testing-library/user-event/dist/click");

app.use(cors());
app.use(express.json());

var DBconnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel_management",
})

DBconnection.on('connection', (connection) => {
    connection.on('error', (err) => {
        console.lop(err)
    })
    connection.on('close', (err) => {
        console.log(err)
    })
})

// app.use(express.static(path.join(__dirname,'../client/build')))

// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })


app.use(cors({
    origin: "http://localhost:3000",
    methods: ['PUT', 'GET', 'POST']
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(5000, () => {
    console.log("server is running on port 5000")
    return "test"
})

app.post('/register', (req, res) => {
    let Gmail = req.body.Gmail
    let Password = req.body.Password
    let Firstname = req.body.Firstname
    let Lastname = req.body.Lastname
    let value = [Firstname, Lastname, Gmail, Password]
    DBconnection.query('select Gmail from  users where Gmail = ?', [Gmail], (e, result) => {
        if (result.length > 0) {
            res.send({ result })
        }
        else {
            DBconnection.query('insert into users (Firstname, Lastname, Gmail, Password) values (?)', [value], (e, result) => {
                if (e) console.log(e.message)
                else {
                    res.send('Create successfully')
                }
            })
        }
    })
})

app.post('/login', (req, res) => {
    let Gmail = req.body.Gmail
    let Password = req.body.Password
    DBconnection.query('select * from users where Gmail=? AND Password=?', [Gmail, Password], (e, result) => {
        if (e) console.log(e.message)
        if (result != null) res.send(result)
        else {
            res.send('tai khoan khong ton tai')
        }
    })
})

app.post('/createcustomer', (req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const gender = req.body.gender;
    const room = req.body.room;
    const birthday = req.body.birthday;
    const phone = req.body.phone;
    const identity = req.body.identity;
    const country = req.body.country;
    const address = req.body.address;

    DBconnection.query('INSERT INTO customers (FULL_NAME, ROOM, GENDER, BIRTHDAY, PHONE_NUMBER, IDENTITY_NUMBER, COUNTRY, ADDRESS) VALUES (?,?,?,?,?,?,?,?)',
        [name, room, gender, birthday, phone, identity, country, address], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('value inserted')
            }
        }
    );
})

app.get('/customers', (req, res) => {
    DBconnection.query("SELECT * FROM customers", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

app.put('/updatecustomers', (req, res) => {
    const name = req.body.name
    const room = req.body.room
    const id = req.body.id
    const gender = req.body.gender
    const birthday = req.body.birthday
    const phone = req.body.phone
    const identity = req.body.identity
    const country = req.body.country
    const address = req.body.address

    DBconnection.query("UPDATE customers SET FULL_NAME = ?, ROOM = ?, GENDER = ?, BIRTHDAY = ?, PHONE_NUMBER = ?, IDENTITY_NUMBER = ?, COUNTRY = ?, ADDRESS = ? WHERE ID = ?", 
    [name, room, gender,birthday,phone,identity,country,address,id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.delete('/deletecustomer/:id', (req,res) => {
    const id=req.params.id
    DBconnection.query("DELETE FROM customers WHERE ID = ?", [id], (err,result) =>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    })
})


//Room

app.post('/createroom', (req, res) => {
    console.log(req.body)
    const roomno = req.body.roomno
    const type = req.body.type;
    const price = req.body.price;
    const inroom = req.body.inroom;
    const status = req.body.status;
    const description = req.body.description;

    DBconnection.query('INSERT INTO rooms (ROOM_NO, TYPE, IN_ROOM, PRICE, STATUS, DESCRIPTION) VALUES (?,?,?,?,?,?)',
        [roomno, type, inroom, price, status, description], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('value inserted')
            }
        }
    );
})

app.get('/rooms', (req, res) => {
    DBconnection.query("SELECT * FROM rooms", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

app.put('/updateroom', (req, res) => {
    const roomno = req.body.roomno
    const type = req.body.type
    const inroom = req.body.inroom
    const price = req.body.price
    const status = req.body.status
    const description = req.body.description
    const id = req.body.id

    DBconnection.query("UPDATE rooms SET ROOM_NO = ?, TYPE = ?, IN_ROOM = ?,PRICE = ?, STATUS = ?, DESCRIPTION = ? WHERE ID = ?", 
    [roomno, type, inroom, price, status, description, id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.delete('/deleteroom/:id', (req,res) => {
    const id=req.params.id
    DBconnection.query("DELETE FROM rooms WHERE ID = ?", [id], (err,result) =>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    })
})

//RoomsType

app.post('/createroomstype', (req, res) => {
    console.log(req.body)
    const type = req.body.type;
    const level = req.body.level;
    const price = req.body.price;
    const capacity = req.body.capacity;
    const rate = req.body.rate
    const description = req.body.desc;

    DBconnection.query('INSERT INTO rooms_type (TYPE, LEVEL, PRICE, CAPACITY, SC_RATE, DESCRIPTION) VALUES (?,?,?,?,?,?)',
        [type, level, price, capacity, rate, description], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('value inserted')
            }
        }
    );
})

app.get('/roomstype', (req, res) => {
    DBconnection.query("SELECT * FROM rooms_type", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

app.put('/updateroomstype', (req, res) => {
    const type = req.body.type;
    const level = req.body.level;
    const price = req.body.price;
    const capacity = req.body.capacity;
    const rate = req.body.rate
    const description = req.body.desc;
    const id = req.body.id;

    DBconnection.query("UPDATE rooms_type SET TYPE = ?, LEVEL = ?, PRICE = ?, CAPACITY = ?, SC_RATE = ?, DESCRIPTION = ? WHERE ID = ?", 
    [type, level, price, capacity, rate, description, id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.delete('/deleteroomstype/:id', (req,res) => {
    const id=req.params.id;
    DBconnection.query("DELETE FROM rooms_type WHERE ID = ?", [id], (err,result) =>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    })
})


//reservations

app.post('/createreservation', (req, res) => {
    console.log(req.body)
    const customer = req.body.customer
    const custype = req.body.custype;
    const identity = req.body.identity;
    const address = req.body.address;
    const registration = req.body.registration;
    const arrival = req.body.arrival;
    const departure = req.body.departure;

    DBconnection.query('INSERT INTO reservations (CUSTOMER, CUSTYPE, IDENTITY, ADDRESS, REGISTRATION, ARRIVAL, DEPARTURE) VALUES (?,?,?,?,?,?,?)',
        [customer, custype, identity, address, registration, arrival, departure], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('value inserted')
            }
        }
    );
})

app.get('/reservations', (req, res) => {
    DBconnection.query("SELECT * FROM reservations", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})


// app.get('/api', (req, res ) =>{
//     DBconnection.query("SELECT * FROM `danh_muc_phong`", (error,result) => {
//         res.send(result)
//     })
// })

