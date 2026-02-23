import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/cafe/Homepage"
import SearchResults from "./components/cafe/SearchResults";

export default function App() {
  return (
    <Router>
    <div className="app-container">
      <main>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/results" element={<SearchResults/>} />
        </Routes>
      </main>
    </div>
    </Router> 
  )
}
