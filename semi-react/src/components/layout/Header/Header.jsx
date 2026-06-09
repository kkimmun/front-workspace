import { useNavigate } from "react-router-dom";
import { Bar, Inner, Brand, Dot, Nav, NavLink, Login } from "./Header.styles";


const Header = () => {

  const navi = useNavigate();

  return (
    <Bar>
      <Inner>
        <Brand onClick={()=>navi("/")}>Pre-Semi</Brand>
        <Nav>
          <NavLink onClick={()=>navi("/signup")}>회원가입</NavLink>
          <Login onClick={() => navi("/login")}>로그인</Login>
        </Nav>
      </Inner>
      
    </Bar>
  );
};

export default Header;
