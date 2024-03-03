"use client";
import { signIn } from "next-auth/react";
// NavBar.tsx
import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-end p-4 bg-gray-200">
      <div className="flex items-center space-x-4">
        <div>Stars Board</div>
        <button
          onClick={() => signIn("github")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login with GitHub
        </button>
      </div>
    </nav>
  );
};

NavBar.displayName = "NavBar";

export default NavBar;
