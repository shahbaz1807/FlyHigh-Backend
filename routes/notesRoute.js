import express from 'express';
import { addNote, deleteNote, getAllNotes, getNote, updateNote } from '../controllers/notesController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-note', authMiddleware ,  addNote);
router.get('/get-notes', authMiddleware, getAllNotes);
router.get('/get-note/:noteId' , authMiddleware, getNote);
router.delete('/delete-note/:noteId', authMiddleware , deleteNote);
router.put('/update-note/:noteId', authMiddleware , updateNote);

export default router