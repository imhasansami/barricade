import { useState } from "react";
import LeaveBtn from "./LeaveBtn";

export default function Game({
  onLeave,
  roomCode,
  onEnterMsg,
  msg,
}: {
  onLeave: () => void;
  roomCode: string;
  onEnterMsg: (msg: string) => void;
  msg: string;
}) {
  const [inputMsg, setInputMsg] = useState<string>("");

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 bg-gray-800 text-white">
      <div>{msg}</div>
      <input
        className="text-center bg-gray-500 transition-all outline-0 focus:bg-gray-600 duration-200 rounded-3xl h-10"
        type="text"
        placeholder="Enter Text"
        value={inputMsg}
        onChange={(e) => setInputMsg(e.target.value)}
      />
      <button
        onClick={() => onEnterMsg(inputMsg)}
        className="bg-gray-500 hover:cursor-pointer py-1 px-4 rounded-xl hover:bg-gray-600 transition-all duration-200"
      >
        Enter
      </button>
      <LeaveBtn roomCode={roomCode} onLeave={onLeave} />
    </div>
  );
}
