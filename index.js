require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)

const startApp = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, ()=>console.info(`MongoDB run is success on ${process.env.MONGODB_URL}`))

        app.listen(PORT, () => console.info(`Server run is success on port = ${PORT}`))

    } catch (e) {
        console.error(e)
    }
}

startApp()