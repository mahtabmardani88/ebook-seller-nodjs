const express = require('express');
const keys = require('./config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const { stripePublishableKey } = require('./config/keys_prod');


const app = express();

// handlebars Middleware
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.handlebars'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// app.engine('handlebars' ,exphbs({
//     defaultLayout:"main"
// }));
// app.set("view engine" , 'handlebars');

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// set static folder 
app.use(express.static(`${__dirname}/public`));


// index Routs
app.get('/',(req , res)=>{
    res.render('index');
stripePublishableKey : keys.stripePublishableKey
})
app.get('/success',(req , res)=>{
    res.render('success');

})


// charge rout
app.post("/charge",(req,res)=>{
    const amount = 2500 ;
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description:"web development ebook",
    currency:"usd",
    customer:customer.id
  }))
  .then(charge => res.render('success'));
})

const port = process.env.PORT || 5000;

app.listen(port ,()=>{
    console.log(`server started on port ${port}`);
})