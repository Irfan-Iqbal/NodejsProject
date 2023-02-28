const express = require('express')
const app = express();
app.use(express.json());
const port = 3300;
const path = require('path');
app.use(express.json());

const mongoos = require('./Api/Helper/helper')


const authroute = require('./Api/Routes/routes');

app.use('/uploadsImages',express.static(path.join(__dirname,'/uploadsImages')))

app.use('/',authroute);
app.listen(port,()=>{
    console.log("server working on ", port);
});