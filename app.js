const path=require('path')
const express=require('express');
const app=express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const bodyparser= require('body-parser'); // But here we have not used body-parser.
const port=80;

// EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('foldername'));
app.use('/static', express.static('static'));// For serving static files
app.use(express.urlencoded());

// MONGOOSE
// Defining the schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const contact = mongoose.model('contact', contactSchema);

// PUG SPECIFIC STUFF
app.set('view engine','pug');// Set the template engine as pug
app.set('views', path.join(__dirname, 'views'));//Set the views directory

// Our Endpoints
app.get('/', (req, res)=>{
    const con= "This is the best content in internet so far so use it wisely."
    const params= {};
    res.status(200).render('home.pug',params);
})

app.get('/contact', (req, res)=>{
    const con= "This is the best content in internet so far so use it wisely."
    const params= {};
    res.status(200).render('contact.pug',params);
})

app.post('/contact', (req, res)=>{
    let myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to db sucessfully");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the db");
    })
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`we are successfully listening on port 80`);
})