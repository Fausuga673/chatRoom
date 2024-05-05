import { useState } from "react";
import Header from "../components/Header";
import { signProps } from "../interfaces/interfaces";
import '../css/signForm.css'

function Sign({ joinChatRoom }: signProps) {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [error, setError] = useState<string | null>(null);

  function handleSubtmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (userName === "" || chatRoom === "") {
      setError("Completa los campos.");
      return;
    }

    if (!buttonDisabled ) {
      setButtonDisabled(true);
      joinChatRoom(userName, chatRoom);
    }


  }

  return (
    <section className="SignContainer">
      <Header />
      <form className="signForm" onSubmit={handleSubtmit}>
        <img
          src="https://iconape.com/wp-content/files/fb/353373/svg/353373.svg"
          alt="icono de personas"
        />
        <div className="signForm__group">
          User name:
          <input
            autoComplete="off"
            type="text"
            name="userNameControl"
            id="userNameControl"
            placeholder="Example: xXMinecrafterXx777"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="signForm__group">
          Room:
          <input
            autoComplete="off"
            type="text"
            name="chatRoomControl"
            id="chatRoomControl"
            placeholder="Example: room4"
            onChange={(e) => setChatRoom(e.target.value)}
          />
        </div>
        <div className="error">{error && error}</div>
        <button type="submit" disabled={buttonDisabled}>Go</button>
      </form>
    </section>
  );
}

export default Sign;
