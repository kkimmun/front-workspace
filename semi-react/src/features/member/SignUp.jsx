import { useState } from "react";
import { Card, Page, Title , Sub, Field, Label, Input, Button, Hint, Message} from "../styles/AuthForm.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPwdConfirm, setMemberPwdConfirm] = useState("");
  const [loading, isLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navi = useNavigate();

  const onChangeId = e => {
    setMemberId(e.target.value);
  };
  const onChangePwd = e => {
    setMemberPwd(e.target.value);
  };
  const onChangeName = e => {
    setMemberName(e.target.value);
  };
  const onChangePwdConfirm = e => {
    setMemberPwdConfirm(e.target.value);
  };

  const onSubmit = () => {
    if(!memberId || !memberPwd || !memberName || !memberPwdConfirm){
        setStatus('모든 항목을 입력해주세요.');
        return;
    }
    const reg = /^[A-Za-z0-9]{5,20}$/;
    if(!reg.test(memberId)){
        setStatus("아이디는 영어 또는 숫자로 이루어진 5글자 이상 20자 이하여야 합니다.");
        return
    }
    const regName = /^[가-힣]{2,20}$/;
    if(!regName.test(memberName)){
        setStatus("사용자 이름은 한글로 2글자에서 20글자 까지만 입력이 가능합니다.");
        return;
    }

    setStatus("");
    isLoading(true);

    axios.post("http://localhost/api/members", {
        memberId,
        memberPwd,
        memberName
    }).then((result) => {
        console.log(result);

        if(result.status === 201){
            setStatus('회원가입에 성공했습니다.');
            setTimeout(()=>{
                navi("/");
            }, 2000);
        }
    })
    .catch((error) => {
        //console.log(error.response);
        setStatus(error.response.data.message);
        isLoading(false);
    });
  };

  return <Page>
      <Card>
        <Title>회원가입</Title>
        <Sub>서비스 이용을 위해 계정을 생성해주세요.</Sub>

        <Field>
            <Label>아이디</Label>
            <Input onChange={onChangeId} placeholder="아이디를 입력해주세요"/>
        </Field>
        <Field>
            <Label>이름</Label>
            <Input onChange={onChangeName} placeholder="이름을 입력해주세요"/>
        </Field>
        <Field>
            <Label>비밀번호</Label>
            <Input type="password" onChange={onChangePwd} placeholder="비밀번호를 입력해주세요"/>
        </Field>
        <Field>
            <Label>비밀번호 확인</Label>
            <Input type="password" onChange={onChangePwdConfirm} placeholder="비밀번호를 한 번 더 입력해주세요"/>
            {
                (memberPwdConfirm.length > 0 && memberPwd !== memberPwdConfirm)
                && <Hint>비밀번호가 일치하지 않습니다.</Hint>
            }
        </Field>

        <Button onClick={onSubmit} disabled={loading}>
            {loading ? "가입중..." : "가입하기"}
            </Button>
        {status.length > 0 && <Message>{status}</Message>}
      </Card>
  </Page>

}

export default SignUp;