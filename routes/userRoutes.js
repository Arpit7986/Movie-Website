const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("movies/login")
})

router.get("/register", (req, res)=>{
    res.render("movies/register")
})

router.post('/register', async(req, res)=>{
    const {username, email, password} = req.body;
    const user = new User({username, email});
    await User.register(user, password);
    res.redirect('login');
})

router.post('/login', 
   passport.authenticate('local', { failureRedirect: '/login' }), 
    (req, res) => {
    res.redirect('/movies');
})

router.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

  router.get('/movies',(req,res)=>{
    res.render('arpit')
  })

module.exports = router;
