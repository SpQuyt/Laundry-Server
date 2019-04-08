// const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const billSchema = require('../models/billSchema');


module.exports = (mongoose, app) => {
  const Bill = mongoose.model('Bill', billSchema)

  app.get('/users/:id/bills', (req, res) => {
    Bill.find({ 'userID': ObjectId(req.params.id) }, function (err, result) {
      if (err) return res.json({
        errors: err
      });

      console.log(result);
      if (result.length == 0) {
        res.json({
          success: false
        });
      }
      else {
        res.json({
          success: true,
          result: result
        });
      }
    })
  });

  app.post('/bill/insertBillToDB', (req, res) => {
    const newBill = new Bill({
      "billID": req.body.billID,
      "userID": ObjectId(req.body.userID),
      "name": req.body.name,
      "services": {
        "dry": parseInt(req.body.dry),
        "wet": parseInt(req.body.wet),
        "jacket": {
          "big": parseInt(req.body.jacketBig),
          "medium": parseInt(req.body.jacketMedium),
          "small": parseInt(req.body.jacketSmall)
        },
        "blanket": {
          "big": parseInt(req.body.blanketBig),
          "medium": parseInt(req.body.blanketMedium),
          "small": parseInt(req.body.blanketSmall)
        },
        "others": {
          "name": req.body.otherName,
          "total": parseInt(req.body.otherTotal)
        }
      },
      "money": parseInt(req.body.money),
      "purchased": req.body.purchased == 'true' ? true : false
    });
    // Bill.insertMany([newBill], (err) => {
    //   if (err) return res.json({ errors: err });
    // })
    // console.log(newBill);
    // res.json({
    //   success: true
    // })
      newBill.save((err, result) => {
        if (err) {
          console.log(err)
          res.json({
            success: false
          })
        }
        
        else res.json({
          success: true,
          result: result
        })
      })
  })

  app.patch('/bill/update/:id', (req, res) => {
    Bill.findOneAndUpdate({ billID: req.params.id }, { $set: { purchased: true } }, { new: true }, (err, result) => {
      if (result == null || err) {
        res.json({
          success: false
        });
      }
      else {
        res.json({
          success: true,
          result: result
        })
      }
    })
  })
}