const express = require('express');
const fileUpload = require('express-fileupload');
const busboy = require('connect-busboy');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 3001;
const app = express();
const cors = require('cors');
const admin = require('firebase-admin');
const cred = require('./config/projekat-angular-283d8-firebase-adminsdk-qj4x6-1ad76fa295.json')
admin.initializeApp({
    credential: admin.credential.cert(cred),
    storageBucket: "gs://projekat-angular-283d8.appspot.com",
    databaseURL: 'https://projekat-angular-283d8.firebaseio.com'
  });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(busboy());
app.use(fileUpload())
//app.use("/uploads", express.static(path.join('server/uploads')));
const api = require('./routes/api.js');

app.use('/api',api);
app.get('/', function(req, res){
    //const id = req.params.id 
    res.send('Hello from server');
});
app.listen(PORT, function(req, res){
    console.log('Server is running on localhost:'+PORT);
})