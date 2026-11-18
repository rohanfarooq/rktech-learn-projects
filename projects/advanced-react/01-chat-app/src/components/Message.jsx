function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Message({ message, mine }) {
  return (
    <div className={mine ? "message mine" : "message"}>
      <div className="meta">
        <strong>{mine ? "You" : message.username}</strong>
        <time>{formatTime(message.created_at)}</time>
      </div>
      <p>{message.content}</p>
    </div>
  );
}
