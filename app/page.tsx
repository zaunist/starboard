"use client";
import NavBar from "./components/Nav";
import StarsPage from "./components/StarsPage";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <NavBar />
      <StarsPage />
    </SessionProvider>
  );
}
