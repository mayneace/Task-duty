import "./App.css";

import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import NavBar from "./components/NavBar";
import Cover from "./pages/Cover";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyTask from "./pages/MyTask";
import NewTask from "./pages/NewTask";
import Edit from "./pages/Edit";
import RootLayout from "./layout/RootLayout";
import RollerLoader from "./components/RollerLoader";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#FAF9FC]">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#363636",
                  color: "#FFFFFF",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "14px",
                },

                success: {
                  iconTheme: {
                    primary: "#974FD0",
                    secondary: "#FFFFFF",
                  },
                },
              }}
            />
            <Suspense fallback={<RollerLoader />}>
              <Routes>
                <Route element={<RootLayout />}>
                  <Route path="/" element={<Cover />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/myTask" element={<MyTask />} />
                    <Route path="/newTask" element={<NewTask />} />
                    <Route path="/editTask/:id" element={<Edit />} />
                  </Route>

                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
