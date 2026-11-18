import { useState } from "react";
import ChatRoom from "./ChatRoom";

const ROOMS = ["general", "react", "help"];

export default function Chat({ user }) {
  const [room, setRoom] = useState("general");

  return (
    <div className="chat card">
      <nav className="rooms">
        {ROOMS.map((name) => (
          <button
            key={name}
            className={name === room ? "active" : ""}
            onClick={() => setRoom(name)}
          >
            # {name}
          </button>
        ))}
      </nav>
      <ChatRoom key={room} room={room} user={user} />
    </div>
  );
}
