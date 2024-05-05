import Header from "../components/Header";
import "../css/chatRoom.css";
import "../css/colors.css";

import { ChatRoomProps } from "../interfaces/interfaces";
import SendMessageForm from "../components/SendMessageForm";
import { useRef } from "react";

function ChatRoom({
  messages,
  joins,
  currentUser,
  sendMessage,
  userColors,
}: ChatRoomProps) {
  const messagesRef = useRef<HTMLElement>(null);

  return (
    <main>
      <Header />
      <section className="chatRoom">
        <article className="messages" ref={messagesRef}>
          <div>
            {messages?.map((msg, index) => (
              <article key={index}>
                <p className="messages__article--message">
                  <span
                    className={
                      userColors?.filter(
                        (userColor) => userColor.name === msg.userName
                      )[0].color
                    }
                  >
                    {msg.userName + ">"}
                  </span>{" "}
                  {msg.msg}
                </p>
              </article>
            ))}
          </div>
        </article>
        <article className="users">
          {joins?.map((join, index) => (
            <article key={index}>
              <p className="users__article--notification">💬{join}</p>
            </article>
          ))}
        </article>
        <article className="controllers">
          <SendMessageForm
            currentUser={currentUser}
            messages={messages}
            sendMessage={sendMessage}
            messagesRef={messagesRef}
          ></SendMessageForm>
        </article>
      </section>
    </main>
  );
}

export default ChatRoom;
