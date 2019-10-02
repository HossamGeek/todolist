const mongoose = require('mongoose');
const db = mongoose.connection;
const env = process.env;
const DBPort = 29258;
const DBHost = "@ds229258.mlab.com";
const DBName = "todolist";
const DBusername = "admin";
const DBpassword = "admin159753";
let connection;

if (process.env.NODE_ENV === 'production')
    connection = mongoose.connect('mongodb://' + DBusername + ':' + DBpassword +
    DBHost + ':' + DBPort + '/' + DBName + '', {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true});
else
    connection = mongoose.connect('mongodb://' + 
    DBHost + ':' + DBPort + '/' + DBName + '', {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true});

    module.exports =  db;