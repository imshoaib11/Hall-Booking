// const express = require('express') //Common JS

import express from 'express' //ES6 New feature
import dotenv from 'dotenv';
import controller from './src/Controller/index.js';

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use(controller)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

