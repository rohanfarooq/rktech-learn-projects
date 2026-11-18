import { useState } from "react";

export default function NoteForm({
  initialTitle = "",
  initialContent = "",
  submitLabel,
  onSave,
  onCancel,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const ok = await onSave(title.trim(), content.trim());
    if (ok && !onCancel) {
      setTitle("");
      setContent("");
    }
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        required
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <div className="row">
        <button type="submit">{submitLabel}</button>
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
