const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const user = require("./routes/user.routes");
const userproduct = require('./routes/user.product.routes');
const product = require("./routes/product.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose');
require("dotenv").config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const cors = require('cors');
app.use(cors({
  origin: '*'
  //origin: ['http://wwww.section.io', 'https://www.google.com']
}))

app.use('/', express.static('files'));

mongoose.set('strictQuery', false);
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true},
  (err) => {
    if (err){
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
)

app.use('/api/userproduct', userproduct);
app.use('/api/user', user);
app.use('/api/product', product);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument.options)
);

app.listen(port, ()=>{
  console.log(`Server is listening in port ${port}`);
})

