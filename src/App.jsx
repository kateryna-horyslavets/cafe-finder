import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/cafe/Homepage"

function App() {
  return (
    <Router>
    <div className="app-container">
      <main>
        <Routes>
          <Route path="/" element={<Homepage/>} />
        </Routes>
      </main>
    </div>
    </Router> 
  )
}

export default App