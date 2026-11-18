import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Auth from "./components/Auth";
import Chat from "./components/Chat";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  if (loading) return <p className="center">Loading...</p>;

  return (
    <main className="app">
      <header className="top">
        <h1>Chat App</h1>
        {session && (
          <div className="user">
            <span id="user-name">{session.user.user_metadata.username}</span>
            <button className="link" onClick={() => supabase.auth.signOut()}>
              Log out
            </button>
          </div>
        )}
      </header>
      {session ? <Chat key={session.user.id} user={session.user} /> : <Auth />}
    </main>
  );
}
