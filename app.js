require('dotenv').config()
const express=require('express')
const app=express()
const mongoose = require('mongoose');
const ejsMate=require('ejs-mate')
const passport=require('passport')
const LocalStrategy = require('passport-local');
const session = require("express-session");
const User=require('./models/User')
const UserRoutes=require('./routes/userRoutes')
const path=require('path')

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("DataBase Connected Successfully");
})
.catch((err)=>{
    console.log(err);
})



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        maxAge: 7 * 24 * 60 * 60 * 1000 * 1
    }
}))


app.use(express.static('views'));

app.use(express.urlencoded({extended:true}));



app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(UserRoutes)


const port=process.env.PORT
app.listen(port,()=>{
    console.log(`Server is Connected At Port No ${port}`);
})