import { useState, useEffect } from "react";
import { SendMessageFormProps } from "../interfaces/interfaces";

function SendMessageForm({
  sendMessage,
  messagesRef,
  messages,
  currentUser
}: SendMessageFormProps) {
  const [message, setMessage] = useState("");

  // Esta función desplaza el scroll hacia abajo
  function scrollDown() {
    if (messagesRef?.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  function handleSubtmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    sendMessage(message);
    setMessage("");
  }

  useEffect(() => {
    if (messages?.slice(-1)[0].userName === currentUser) scrollDown(); 
  }, [messages]);

  return (
    <form action="" onSubmit={handleSubtmit} className="controllers__form">
      <input
        className="controllers__form--input"
        type="text"
        name="messageController"
        id="messageController"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Type message"
        autoComplete="off"
      />
      <button
        type="submit"
        className="controllers__form--btn"
        disabled={!message}
      >
        Send
      </button>
    </form>
  );
}

export default SendMessageForm;
