const mongoose = require('mongoose')


const db = 'mongodb+srv://irfan:toYyVA1Xry7DWKE8@cluster0.7x38uwd.mongodb.net/Irfan?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(db).then(()=>{
    console.log('successfully connected Database')
}).catch((err)=>{
    console.log('unsuccessfull', err)
})

