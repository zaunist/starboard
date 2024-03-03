import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex justify-end p-4 bg-gray-200">
      <div className="flex items-center space-x-4">
        {status === "authenticated" ? (
          <div>{session?.user?.name || "Stars Board"}</div>
        ) : (
          <div>Stars Board</div>
        )}
        {status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login with GitHub
          </button>
        )}
      </div>
    </nav>
  );
};

NavBar.displayName = "NavBar";

export default NavBar;
