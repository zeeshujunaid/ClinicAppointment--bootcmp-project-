import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import patient from "./layout/patient";

function App() {
  const [count, setCount] = useState(0);
  const role = "patient";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<patient />} />
          <Route path="/dash" element={<dash />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
