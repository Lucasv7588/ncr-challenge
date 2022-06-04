const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Api = require('./api/api');
const cors = require('cors');

const app = express();

const whitelist = ["http://localhost:3000", "http://localhost:4000"];
const corsOptions = {
    origin: function(origin, callback) {
        if(!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/ncr', Api)

mongoose.connect(
    "mongodb://localhost:27017/ncr",
    {   useNewUrlParser: true    },
    (err, res) => {
        err && console.log("Error conectando a la base de datos " + err);
        app.listen(4000, () => {
            console.log("Server running on http://localhost:4000");
        })
    }
);