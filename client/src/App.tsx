import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Cover from "./pages/Cover";
import MyTask from "./pages/MyTask";
import NewTask from "./pages/NewTask";
import Edit from "./pages/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-[#FAF9FC]">
          <NavBar />
          <Routes>
            <Route path="/" element={<Cover />} />
            <Route path="/myTask" element={<MyTask />} />
            <Route path="/newTask" element={<NewTask />} />
            <Route path="/editTask/:id" element={<Edit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
