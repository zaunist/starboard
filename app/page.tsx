"use client";
import React from "react";
import NavBar from "./components/Nav";
import StarsPage from "./components/StarsPage";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <SessionProvider>
      <NavBar />
      <Suspense fallback={<Loading></Loading>}></Suspense>
      <StarsPage />
    </SessionProvider>
  );
}
