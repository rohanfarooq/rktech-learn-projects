import { useState } from "react";

export default function MessageForm({ room, onSend }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const content = text.trim();
    if (!content) return;
    setSending(true);
    const ok = await onSend(content);
    setSending(false);
    if (ok) setText("");
  }

  return (
    <form className="send" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Message #${room}`}
        maxLength={500}
        aria-label="Message"
      />
      <button type="submit" disabled={sending || !text.trim()}>
        Send
      </button>
    </form>
  );
}
