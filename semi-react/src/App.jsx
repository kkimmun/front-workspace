import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import BoardDetail from "./features/board/BoardDetail";
import BoardForm from "./features/board/BoardForm";
import BoardList from "./features/board/BoardList";
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
        <Route path="/boards" element={<BoardList />} />
        <Route path="/boards/:boardNo" element={<BoardDetail />} />
        <Route path="/boards/write" element={<BoardForm />} />
        <Route path="/boards/:boardNo/edit" element={<BoardForm />} />
        <Route path="/*" element={<h1>그런건 없어요~</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
