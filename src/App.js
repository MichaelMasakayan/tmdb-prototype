import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./MovieScope";
import Panel from "./components/Panel";
import Container from "./components/Container";
import tmdbPNG from "./assets/tmdb.png";

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Panel />
                <Container />
              </>
            }
          />
        </Routes>
        <footer className="footer">
          <img src={tmdbPNG} alt="API Logo" className="api-logo" />
        </footer>
      </MovieProvider>
    </div>
  );
}
export default App;
