const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const dotenv = require( 'dotenv').config();
const db = require('./DBconfig');
const Router = require('./app/routers/endpoint');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

db.on('error', (err)=>{
    console.log('DataBase connection error!.\n'+'Please start the Database server');
    app.use((req, res) => {
        res.json({data:'DataBase connection  error!',
            err:(404),success:false});    });
});


db.once('open', () => {
    console.log("Connected to DataBase.\n"+"starting...");
    Router(app);
});



http.listen(process.env.PORT || 3000, function(){
    console.log("Server Listening On Port %d in %s mode.", this.address().port, app.settings.env);
   });
   
   