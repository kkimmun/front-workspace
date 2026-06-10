import { useState, createContext, useContext } from "react";

// 보관함 만들기
const AuthContext = createContext(null);

// 보관함에 값 넣고 나눠주는 역할
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return {
      memberId: localStorage.getItem("memberId"),
      memberName: localStorage.getItem("memberName"),
      role: localStorage.getItem("role"),
    };
  });

  const login = (data) => {
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", DataTransfer.refreshToken);
    localStorage.setItem("memberId", data.memberId);
    localStorage.setItem("memberName", data.memberName);
    localStorage.setItem("role", data.role);

    setUser({
      memberId: data.memberId,
      memberName: data.memberName,
      role: data.role,
    });
  };

  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("memberId");
    // localStorage.removeItem("memberName");
    // localStorage.removeItem("role");

    ["token", "refreshToken", "memberId", "memberName", "role"].forEach((k) => {
      localStorage.removeItem(k);
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogin: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
