import noteModel from "../models/notesModel.js";

// Add Note 
export const addNote = async (req, res) => {
    try {
        const { title, content, background } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
        }

        const note = await new noteModel({ title: title, content: content, background: background }).save();

        res.status(201).json({ message: "Note added successfully", note });
    } catch (error) {
        console.log(`Error ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get All Notes
export const getAllNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({});
        res.status(200).json({ message: "Notes fetched successfully", data: notes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get One Note
export const getNote = async (req, res) => {
    try {
        const { noteId } = req.params
        const note = await noteModel.findById(noteId);

        if (!note) {
            return res.status({ message: 'Note not found' })
        }

        res.status(200).json({ message: "Note fetched successfully", data: note });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Delete Note
export const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await noteModel.findByIdAndDelete(noteId);

        if (!note) {
            return res.status({ message: 'Note not found' })
        }

        res.status(200).json({ message: "Note Delete successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update Note
export const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { title, content, background } = req.body;

        const note = await noteModel.findByIdAndUpdate(noteId, { title: title, content: content, background: background }, { new: true, runValidators: true });

        if (!note) {
            return res.status({ message: 'Note not found' })
        }

        res.status(200).json({ message: "Note update successfully" , data: note });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}