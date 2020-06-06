const express =require('express');
const path =require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const db =require('./config/Key').mongoURI;

mongoose.connect(db, {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true, 
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Routes
const user = require('./routes/api/users');


app.use(express.static(__dirname));
app.use(express.static(__dirname + '/uploads'));
app.use(express.static('dist'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
//enable files upload

app.use(bodyParser.urlencoded({limit: '50mb',extended : true }));

app.use('/api/user',user);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../dist/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
})


var port = process.env.PORT || 5001;   
app.listen(port, ()=> console.log('Listening on port ',port));