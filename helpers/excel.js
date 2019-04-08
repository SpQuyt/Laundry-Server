var Excel = require('exceljs');

var wb = new Excel.Workbook();
var path = require('path');
var filePath = path.resolve(__dirname,'Sample-DB-Chủ-hàng.xlsx');

var i = 5;

function updateToDB (i) {
  var sh = wb.getWorksheet("Sheet1");
  let newUser = new User({
    username: sh.getRow(i).getCell(2).value,
    password: '7fc56270e7a70fa81a5935b72eacbe29',
    fullname: sh.getRow(i).getCell(4).value,
    address: sh.getRow(i).getCell(5).value,
    price: {
      dry: sh.getRow(i).getCell(6).value,
      wet: sh.getRow(i).getCell(7).value,
      jacket: {
        big: sh.getRow(i).getCell(8).value,
        medium: sh.getRow(i).getCell(9).value,
        small: sh.getRow(i).getCell(10).value
      },
      blanket: {
        big: sh.getRow(i).getCell(11).value,
        medium: sh.getRow(i).getCell(12).value,
        small: sh.getRow(i).getCell(13).value
      },
      others: {
        name: sh.getRow(i).getCell(14).value,
        total: sh.getRow(i).getCell(15).value
      }
    }
  })

  console.log(newUser.fullname)

  newUser.save((err, result) => {
    if (err) return console.log(err);
    console.log(result.fullname + " saved to collection.");
  })

  if (i == sh.rowCount) {

  }
  else {
    updateToDB(i+1);
  }
}

wb.xlsx.readFile(filePath).then(function(){
  updateToDB(i);
});