import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Message from "./Message";
import MessageForm from "./MessageForm";

export default function ChatRoom({ room, user }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    async function loadMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("room", room)
        .order("created_at", { ascending: false })
        .limit(50);
      if (ignore) return;
      if (error) setError(error.message);
      else setMessages(data.reverse());
    }
    loadMessages();

    const channel = supabase
      .channel(`room:${room}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room=eq.${room}`,
        },
        (payload) => {
          setMessages((current) =>
            current.some((m) => m.id === payload.new.id)
              ? current
              : [...current, payload.new]
          );
        }
      )
      .subscribe();

    return () => {
      ignore = true;
      supabase.removeChannel(channel);
    };
  }, [room]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(content) {
    const { error } = await supabase.from("messages").insert({
      room,
      content,
      username: user.user_metadata.username,
    });
    if (error) {
      setError(error.message);
      return false;
    }
    setError(null);
    return true;
  }

  return (
    <section className="room">
      <div className="messages" id="messages">
        {messages.length === 0 && (
          <p className="empty">No messages in #{room} yet. Say hi!</p>
        )}
        {messages.map((m) => (
          <Message key={m.id} message={m} mine={m.user_id === user.id} />
        ))}
        <div ref={bottomRef} />
      </div>
      {error && <p className="error">{error}</p>}
      <MessageForm room={room} onSend={sendMessage} />
    </section>
  );
}
