import { useState } from "react";
import {
  Card,
  Page,
  Title,
  Sub,
  Field,
  Label,
  Input,
  Button,
  Hint,
  Message,
  DangerButton,
} from "../styles/AuthForm.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const DeleteAccount = () => {
  const navi = useNavigate();
  const { logout } = useAuth();
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const onSubmit = async () => {
    if (!password) {
      setStatus("비밀번호를 입력해주세요.");
      return;
    }
    if (!agree) {
      setStatus("유의사항에 동의해주세요.");
      return;
    }
    isLoading(true);
    setStatus("");
    try {
      await api.delete("/members", { data: { password } });
    } catch (err) {
      setStatus(err.response?.data.message || "회원탈퇴 실패");
    } finally {
      isLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <Title>회원 탈퇴하기</Title>
        <Sub>탈퇴해도 메일 보내면 다시 살려드림</Sub>

        <ul style={{ padding: "0px", fontSize: "12px", colorL: "lightgray" }}>
          <li>탈퇴 후 동일한 아이디로 재가입할 수 없습니다.</li>
          <li>작성하신 데이터는 정책에 따라 보관됩니다.</li>
        </ul>
        <Field>
          <Label>비밀번호를 입력하세요.</Label>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Field>

        <label
          style={{
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            margin: "4px 0 20px",
          }}
        >
          <input
            type="checkbox"
            style={{ width: "15px", height: "15px", color: "crimson" }}
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>유의사항을 모두 확인했으면 탈퇴에 동의하겠습니다.</span>
        </label>

        <DangerButton disabled={loading} onClick={onSubmit}>
          {loading ? "탈퇴하는 중" : "탈퇴하기"}
        </DangerButton>

        {status && <Message>{status}</Message>}
      </Card>
    </Page>
  );
};

export default DeleteAccount;
