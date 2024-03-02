// 导入必要的模块
import { SessionProvider } from "next-auth/react";
import NavBar from "./components/Nav";
import StarsPage from "./stars/page";

export default function Home() {
  return (
    <>
      <NavBar />
      <StarsPage />
    </>
  );
}
