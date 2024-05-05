import { RefObject } from "react";

interface Message {
    msg: string;
    userName: string;
}

interface signProps {
    joinChatRoom : (userName: string, chatRoom: string) => Promise<void>
}

interface UserColors {
    name: string;
    color: string;
}

interface ChatRoomProps {
    messages: Message[] | undefined;
    joins: string[] | undefined;
    userColors: UserColors[] | undefined;
    currentUser: string | undefined;
    sendMessage: (message: string) => Promise<void>;
}

interface SendMessageFormProps {
    messages: Message[] | undefined;
    currentUser: string | undefined;
    messagesRef: RefObject<HTMLElement> | null
    sendMessage: (message: string) => Promise<void>;
}

export type {Message, UserColors, signProps, ChatRoomProps, SendMessageFormProps};