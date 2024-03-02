"use client";
// NavBar.tsx
import React from "react";

const NavBar: React.FC = () => {
  const loginWithGitHub = () => {
    // GitHub OAuth URL
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      window.location.origin + "/api/auth/callback"
    );
    const scope = encodeURIComponent("user");
    const state = encodeURIComponent(
      Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
  };

  return (
    <nav className="flex justify-end p-4 bg-gray-200">
      <div className="flex items-center space-x-4">
        <div>Stars Board</div>
        <button
          onClick={loginWithGitHub}
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
