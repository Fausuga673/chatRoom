import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { Message, UserColors } from "./interfaces/interfaces";
import Sign from "./pages/Sign";
import ChatRoom from "./pages/ChatRoom";
import "./App.css";

const colors = [
  "fuchsia",
  "purple",
  "orange",
  "yellow",
  "green",
  "blue",
  "cyan",
  "red",
];

function App() {
  const [conn, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<Message[]>();
  const [joins, setJoins] = useState<string[]>();
  const [userColors, setUserColors] = useState<UserColors[]>();

  const [currentUser, setCurrentUser] = useState<string>();

  function addRandomColor(userName: string) {
    // random color
    const color = Math.floor(Math.random() * colors.length);
    setUserColors((prevColors) => {
      // comprobamos si ya hay un usuario con ese nombre
      const alreadyExists = prevColors?.some((item) => item.name === userName);

      if (alreadyExists) return prevColors;

      // si no existe añadimos el usuario con su respectivo color.
      return [
        ...(prevColors || []),
        {
          name: userName,
          color: colors[color],
        },
      ];
    });
  }

  async function joinChatRoom(userName: string, chatRoom: string) {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("http://chatappservice.somee.com/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("JoinRoom", (_userName, msg) => {
        setJoins((prevJoins) => [...(prevJoins || []), msg]);
      });

      conn.on("LeaveRoom", (_userName, msg) => {
        setJoins((prevJoins) => [...(prevJoins || []), msg]);
      });

      conn.on("ReceiveSpecificMessage", (userName, msg) => {
        setMessages((prevMessages) => [
          ...(prevMessages || []),
          {
            userName,
            msg,
          },
        ]);

        addRandomColor(userName);
      });

      await conn.start();
      await conn.invoke("JoinRoom", { userName, chatRoom });

      setConnection(conn);
    } catch (e) {
      console.log(e);
    }
  }

  async function sendMessage(message: string) {
    try {
      await conn?.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(()=>{
    if (joins) setCurrentUser(joins[0].split(" ")[0])
  }, [joins])

  return (
    <>
      {!conn ? (
        <Sign joinChatRoom={joinChatRoom} />
      ) : (
        <ChatRoom
          messages={messages}
          joins={joins}
          currentUser={currentUser}
          sendMessage={sendMessage}
          userColors={userColors}
        />
      )}
    </>
  );
}

export default App;
