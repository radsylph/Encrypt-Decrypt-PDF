import { Router } from "express"
import { hello } from "../controllers/index.controllers.js"

const router = Router()
router.get('/', hello)

export default router