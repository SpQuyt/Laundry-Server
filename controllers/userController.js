// const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const userSchema = require('../models/userSchema')


module.exports = (mongoose, app) => {
  var User = mongoose.model("User", userSchema)
  
  app.post('/users/login', (req, res) => {
    console.log(req.body);
    User.find({ 'username': req.body.username, 'password': req.body.password }, function (err, result) {
      if (err) return handleError(err);

      if (result.length == 0) {
        res.json({
          success: false
        });
      }
      else {
        // jwt.sign({ username: result.username }, jwt_key, {expiresIn: '6h'}, function(err, token) {
        //   if (err) return res.json({error: err})

        //   console.log(token)
        //   res.json({
        //     success: true, 
        //     token: token,
        //     result: result
        //   }) 
        // });
        res.json({
          success: true,
          result: result
        });
      }
    })
  })
}