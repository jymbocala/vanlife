import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
// import App from "./App";

function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <header>
          <Link to="/" class="nav__logo">#VANLIFE</Link>
          <nav>
            <Link to="/about">About</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  );
}
function Home() {
  return <h1>Home Page</h1>;
}
function About() {
  return <h1>About Page</h1>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
