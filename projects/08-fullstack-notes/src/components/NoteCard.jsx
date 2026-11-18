import NoteForm from "./NoteForm";

function formatDate(iso) {
  return new Date(iso).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function NoteCard({
  note,
  editing,
  onEdit,
  onCancel,
  onUpdate,
  onDelete,
}) {
  if (editing) {
    return (
      <li className="card note">
        <NoteForm
          initialTitle={note.title}
          initialContent={note.content}
          submitLabel="Save"
          onSave={(title, content) => onUpdate(note.id, title, content)}
          onCancel={onCancel}
        />
      </li>
    );
  }

  return (
    <li className="card note">
      <h3>{note.title}</h3>
      {note.content && <p className="content">{note.content}</p>}
      <div className="row">
        <small>Edited {formatDate(note.updated_at)}</small>
        <button className="secondary" onClick={() => onEdit(note.id)}>
          Edit
        </button>
        <button className="danger" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
