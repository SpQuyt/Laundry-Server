const express = require('express');
const app = express();
const port = 3000;
// const bodyParser = require('body-parser');
const cors = require('cors');
// const md5 = require('md5')
const mongoose = require('mongoose');

/*Load Controllers*/
const billController = require('./controllers/billController');
const userController = require('./controllers/userController');

// const Mailer = require('./mailer')
// const QRCode = require('qrcode')
const jwt = require('jsonwebtoken')
const os = require('os');

const urlDB = 'mongodb://admin123:admin123@ds141368.mlab.com:41368/quick_laundry';
// const salt = 'namquocsonha';
// const home_url = 'http://127.0.0.1:3000'
const jwt_key = 'qlovesh';

//get IPv4 Address to get the local Server URL
var networkInterfaces = Object.values(os.networkInterfaces())
  .reduce((r, a) => {
    r = r.concat(a)
    return r;
  }, [])
  .filter(({ family, address }) => {
    return family.toLowerCase().indexOf('v4') >= 0 &&
      address !== '127.0.0.1'
  })
  .map(({ address }) => address);
var ipAddresses = networkInterfaces.join(', ')
const url = ipAddresses + ":" + port;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect(urlDB, { useNewUrlParser: true })
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("DB OK")
});

billController(mongoose, app);
userController(mongoose, app);
app.listen(port, () => console.log(url));