const cors = require('cors');
const express = require('express');
const morgan = require('morgan')
const app = express();


//----------import files--------------------------------------
const { badRequest } = require('./src/api/v1/helpers/response_helper')
const version1Index = require("./src/api/v1/index");


app.use(express.json());
app.use(morgan('tiny'))
app.use(cors());

require('./src/api/v1/config/db')
require('dotenv').config()
app.use(cors());

app.use(express.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



//----------redirect routes-----------------------------------
app.use('/v1', version1Index);



//----------for invalid requests start -----------------------


app.all('*', async (req, res) => {
    await badRequest(res, 'Invalid URL');
});
module.exports = app;




module.exports=app