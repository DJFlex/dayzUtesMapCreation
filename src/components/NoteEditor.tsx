import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import { Save } from 'lucide-react';

interface NoteEditorProps {
  stepId: string;
  existingNote?: Note;
  onSaveNote: (note: Note) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ 
  stepId, 
  existingNote, 
  onSaveNote 
}) => {
  const [content, setContent] = useState<string>(existingNote?.content || '');
  
  useEffect(() => {
    if (existingNote) {
      setContent(existingNote.content);
    } else {
      setContent('');
    }
  }, [existingNote, stepId]);

  const handleSave = () => {
    if (content.trim()) {
      const note: Note = {
        stepId,
        content,
        timestamp: existingNote?.timestamp || Date.now()
      };
      
      onSaveNote(note);
      
      if (!existingNote) {
        setContent('');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">My Notes</h3>
      
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] min-h-[150px]"
        placeholder="Add your notes for this step here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      
      <div className="flex justify-end mt-3">
        <button
          onClick={handleSave}
          disabled={!content.trim()}
          className={`flex items-center px-4 py-2 rounded-md ${
            content.trim()
              ? 'bg-[var(--accent)] text-white hover:bg-opacity-90'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } transition-colors`}
        >
          <Save size={16} className="mr-2" />
          <span>{existingNote ? 'Update Note' : 'Save Note'}</span>
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
