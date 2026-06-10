import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import ChangePassword from "./features/member/ChangePassword";
import DeleteAccount from "./features/member/DeleteAccount";
import Login from "./features/member/Login";
import SignUp from "./features/member/SignUp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<div style={{ height: "600px" }}></div>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<ChangePassword />} />
        <Route path="/delete" element={<DeleteAccount />} />
        <Route path="/*" element={<h1>그런건 없어요~</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
