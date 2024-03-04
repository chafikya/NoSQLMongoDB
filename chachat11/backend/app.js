
const express = require('express')
const cors = require('cors');
const app = express();

require('./database');
app.use(express.json())
app.use(cors());


app.listen(3000);
console.log('Server on port', 3000);

