import { child, get, ref, update } from "firebase/database";
import { db } from "../config/firebase";

export default function LeaveBtn({
  onLeave,
  roomCode,
}: {
  onLeave: () => void;
  roomCode: string;
}) {
  return (
    <button
      className="bg-red-400 text-black hover:text-white p-3 py-1 transition-all duration-200 cursor-pointer rounded-lg w-20 hover:bg-red-500"
      onClick={async () => {
        const roomRef = ref(db, `games/${roomCode}`);
        // if ((await get(roomRef)).exists())
        if ((await get(child(roomRef, "joined"))).val())
          await update(roomRef, { joined: false });
        onLeave();
      }}
    >
      Leave
    </button>
  );
}
