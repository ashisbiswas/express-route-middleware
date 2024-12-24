import express from 'express'
import { showUsers, getUserById, addUser, updateUser, deleteUser } from '../controller/userController.js'

const userRouter = express.Router()

/**
 * get the user route from userController and pass it
 */
userRouter.get('/', showUsers)
userRouter.get('/:id', getUserById)
userRouter.post('/', addUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)


export default userRouter