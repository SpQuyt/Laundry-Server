// const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const billSchema = require('../models/billSchema')


module.exports = (mongoose, app) => {
  var Bill = mongoose.model("Bill", billSchema)

  app.post('/bill/getByUserID', (req, res) => {
    Bill.find({ 'userID': ObjectId(req.body.objID) }, function (err, result) {
      if (err) return handleError(err);

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
    let newBill = new Bill({
      "billID": req.body.billID,
      "userID": {
        "$oid": ObjectId(req.body.userID)
      },
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
    })

    console.log(newBill);

    // newUser.save((err, result) => {
    //   if (err) return console.log(err);
    //   console.log(result.fullname + " saved to collection.");
    // })

    res.json({
      success: true
    })
  })

  app.post('/bill/updateByBillID', (req, res) => {
    Bill.findOneAndUpdate({ billID: req.body.billID }, { $set: { purchased: true } }, { new: true }, (err, result) => {
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