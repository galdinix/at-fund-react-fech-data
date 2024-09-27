import React from "react";
import FetchData from "./FetchData"; // Certifique-se de ajustar o caminho para o arquivo correto
import "./App.css";

const App = () => {
  return (
    <div>
      <header>
        <h1>AT fundamentos react</h1>
      </header>
      <main>
        <FetchData />
      </main>
      <footer>
        <p>© footer</p>
      </footer>
    </div>
  );
};

export default App;
