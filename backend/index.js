const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', router);

mongoose.connect(String(process.env.MONGODB_URI)).then(() => console.log("DB connected")).catch(er => console.log(er))

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Redapp Backend Running on port ${port}`)
});