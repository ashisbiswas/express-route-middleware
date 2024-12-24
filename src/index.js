import express from 'express'
import 'dotenv/config'
import userRouter from './routes/userRoutes.js'


const app = express()

/**
 * this middleware is used for 
 * getting the body as json
 */
app.use(express.json())



/**
 * use userRouter
 */
app.use('/api/user', userRouter)






const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`The server is running at http://localhost:${PORT}`)
})