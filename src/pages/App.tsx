import React from "react";
import Navbar from "../components/layouts/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="max-h-full min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="py-5">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
