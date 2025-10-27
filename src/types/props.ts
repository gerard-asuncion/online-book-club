import type { ReactNode } from "react";

export interface WindowProps {
    bookRoom: string;
}

export interface ChatProps {
    bookRoom: string;
}

export interface SidebarProps {
    setBookRoom: React.Dispatch<React.SetStateAction<string>>;
}

export interface AuthProps {
    setIsAuth: React.Dispatch<React.SetStateAction<string | undefined | boolean>>;
}

export interface UseChatProps {
    bookRoom: string;
}

export interface ScreenProps {
    children: ReactNode,
    page: string;
};

export interface ButtonProps {
    children: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    type?: 'button' | 'submit' | 'reset';
}