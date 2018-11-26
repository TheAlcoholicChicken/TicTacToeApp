const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

//Mongo db
const dbRoute = "mongodb://tsu:123456a@ds247852.mlab.com:47852/tictactoe";

mongoose.connect(
    dbRoute,
    { useNewUrlParser: true}
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//bodyParser parses the request body to be a readable JSON format.
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));

//this GET method fetches all available data in our database.
router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    });
});

// Update method, overwrites existing data in db
router.post("/updateData", (req, res) => {
    const{id, update} = req.body;
    Data.findOneAndUpdate(id, update, err => {
        if(err) return res.json({success: false, error: err});
        return res.json({success:true});
    });
});

// Delete method, removes existing data in our db
router.delete("/deleteData", (req, res) => {
    const {id} = req.body;
    Data.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({success: true});
    });
});

// Create method, this adds new data in our database.
router.post/("/putData", (req, res) => {
    let data = new Data();

    const {id, message} = req.body;

    if((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return res.json({ success: false, error: err});
        return res.json({ success: true});
    });
});

// append /api for http requests
app.use("/api", router);

// launch backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON POORT ${API_PORT}`));