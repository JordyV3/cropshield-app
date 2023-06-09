import express from 'express'
import { analisis } from '../controllers/apiController.js'

const router = express.Router()


router.get('/analisis/', analisis)


export default router