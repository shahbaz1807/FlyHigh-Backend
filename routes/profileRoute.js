import express from 'express';
import { loginProfile, signupProfile } from '../controllers/profileConroller.js';

const router = express.Router();

router.post('/login', loginProfile)
router.post('/signup', signupProfile)

export default router