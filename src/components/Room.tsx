import { useState } from "react";
import { db } from "../config/firebase";
import { ref, set, get, remove, onDisconnect } from "firebase/database";
import LeaveBtn from "./LeaveBtn";

interface Props {
  onJoinClick: (e: string) => void;
  setRoomCode: (code: string) => void;
  roomCode: string;
}

export default function Room({
  onJoinClick: onJoin,
  setRoomCode,
  roomCode,
}: Props) {
  const [joinCodeInput, setJoinCodeInput] = useState<string>("");
  const [roomState, setRoomState] = useState<"join" | "create" | undefined>(
    undefined,
  );

  function createRoomCode() {
    const characters = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 4; i++) {
      let randomChar;
      do {
        randomChar = characters[Math.floor(Math.random() * characters.length)];
      } while (code.includes(randomChar));
      code += randomChar;
    }
    return code;
  }

  async function handleLeave() {
    setRoomState(undefined);
    if (roomState == "join") {
    } else if (roomState == "create") {
      if (roomCode) await remove(ref(db, `games/${roomCode}`));
    }
  }

  async function createRoom(code: string) {
    setRoomCode(code);
    await set(ref(db, `games/${code}`), {
      msg: "",
      joined: false,
    });
    onDisconnect(ref(db, `games/${code}`)).remove();
  }

  async function handleJoin() {
    if (!joinCodeInput) return
    const roomRef = ref(db, `games/${joinCodeInput}`);
    const snapshot = await get(roomRef);
    setRoomCode(joinCodeInput);
    if (snapshot.exists()) {
      onJoin(joinCodeInput);
    } else console.log("no room");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 gap-4">
      <div className="flex flex-col items-center justify-center gap-4">
        {roomState == "create" && (
          <h1 className="text-gray-50 text-4xl">{roomCode}</h1>
        )}
        {roomState == undefined && (
          <button
            className="bg-gray-200 px-3 py-2 transition-all duration-200 cursor-pointer rounded-lg w-40 hover:bg-gray-300"
            onClick={() => {
              setRoomState("create");
              createRoom(createRoomCode());
            }}
          >
            Create Room
          </button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        {roomState == undefined && (
          <button
            className="bg-gray-200 px-3 py-2 transition-all duration-200 cursor-pointer rounded-lg w-40 hover:bg-gray-300"
            onClick={() => setRoomState("join")}
          >
            Join Room
          </button>
        )}
        {roomState == "join" && (
          <>
            <input
              type="text"
              placeholder="Enter Code"
              className="bg-gray-50 rounded-2xl p-2 w-40 text-center outline-0 transition-all duration-200 focus:bg-[#cad3e1]"
              onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
              value={joinCodeInput}
              maxLength={4}
            />
            <button
              onClick={handleJoin}
              type="submit"
              className="bg-[#a8bad4] text-center content-center p-3 py-1 transition-all duration-200 cursor-pointer rounded-lg w-20 hover:bg-gray-300"
            >
              Join
            </button>
          </>
        )}
      </div>
      {roomState !== undefined && (
        <LeaveBtn roomCode={roomCode} onLeave={handleLeave} />
      )}
    </div>
  );
}
