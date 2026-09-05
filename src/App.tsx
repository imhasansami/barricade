import { useEffect, useState } from "react";
import Room from "./components/Room.tsx";
import { db } from "./config/firebase";
import { onValue, ref, update } from "firebase/database";
import Game from "./components/Game.tsx";

export default function App() {
  const [currComponent, setCurrComponent] = useState<string>("room");
  const [roomCode, setRoomCode] = useState<string>("");
  const [msg, setMsg] = useState<string>("hi");

  useEffect(() => {
    if (!roomCode) return;
    const roomRef = ref(db, `games/${roomCode}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.child("joined").val()) setCurrComponent("main");
        setMsg(snapshot.child("msg").val());
      }
    });
    return () => unsubscribe();
  }, [roomCode]);

  // useEffect(() => {}, []);

  async function onEnterMsg(msg: string) {
    await update(ref(db, `games/${roomCode}`), { msg: msg });
  }

  async function handleMainJoin(e: string) {
    await update(ref(db, `games/${e}`), { joined: true });
    setCurrComponent("main");
  }

  function handleLeaveGame() {
    setCurrComponent("room");
  }

  function renderMainContent() {
    switch (currComponent) {
      case "room":
        return (
          <Room
            onJoinClick={handleMainJoin}
            roomCode={roomCode}
            setRoomCode={(code) => setRoomCode(code)}
          />
        );
      case "main":
        return (
          <Game
            msg={msg}
            onEnterMsg={onEnterMsg}
            roomCode={roomCode}
            onLeave={handleLeaveGame}
          />
        );
    }
  }
  return <>{renderMainContent()}</>;
}
