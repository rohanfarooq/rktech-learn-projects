import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Auth() {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);

    const { data, error } =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else if (mode === "signup" && !data.session) {
      setMessage({
        type: "info",
        text: "Check your email to confirm your account, then log in.",
      });
    }
  }

  const isSignup = mode === "signup";

  return (
    <form className="card auth" onSubmit={handleSubmit}>
      <h2>{isSignup ? "Create an account" : "Welcome back"}</h2>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </label>
      <button type="submit" disabled={busy}>
        {busy ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
      </button>
      {message && <p className={message.type}>{message.text}</p>}
      <p className="switch">
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <button
          type="button"
          className="link"
          onClick={() => {
            setMode(isSignup ? "login" : "signup");
            setMessage(null);
          }}
        >
          {isSignup ? "Log in" : "Create an account"}
        </button>
      </p>
    </form>
  );
}
