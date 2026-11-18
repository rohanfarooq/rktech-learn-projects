import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function loadNotes() {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) setError(error.message);
      else setNotes(data);
      setLoading(false);
    }
    loadNotes();
  }, []);

  async function addNote(title, content) {
    const { data, error } = await supabase
      .from("notes")
      .insert({ title, content })
      .select()
      .single();
    if (error) {
      setError(error.message);
      return false;
    }
    setNotes([data, ...notes]);
    setError(null);
    return true;
  }

  async function updateNote(id, title, content) {
    const { data, error } = await supabase
      .from("notes")
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      setError(error.message);
      return false;
    }
    setNotes([data, ...notes.filter((n) => n.id !== id)]);
    setEditingId(null);
    setError(null);
    return true;
  }

  async function deleteNote(id) {
    if (!confirm("Delete this note?")) return;
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) return setError(error.message);
    setNotes(notes.filter((n) => n.id !== id));
  }

  return (
    <section>
      <div className="card">
        <NoteForm submitLabel="Add note" onSave={addNote} />
      </div>
      {error && <p className="error">{error}</p>}
      {loading && <p className="center">Loading notes...</p>}
      {!loading && notes.length === 0 && (
        <p className="center" id="empty">
          No notes yet. Write your first one above!
        </p>
      )}
      <ul className="notes">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            editing={note.id === editingId}
            onEdit={setEditingId}
            onCancel={() => setEditingId(null)}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        ))}
      </ul>
    </section>
  );
}
