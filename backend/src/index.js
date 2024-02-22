
const express = require('express')
const cors = require('cors');
const app = express();

require('./database');
app.use(express.json())
app.use(cors());

app.use('/api',require('./routes/index'))

app.listen(3000);
console.log('Server on port', 3000);

require('dotenv').config();
