import { useState } from "react";
import { Card, Page, Title , Sub, Field, Label, Input, Button, Hint, Message} from "../styles/AuthForm.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const [memberId, setMemberId] = useState('');
    const [memberPwd, setMemberPwd] = useState('');
    const [status, setStatus] = useState('');
    const [loading, isLoading] = useState(false);
    const navi = useNavigate();

    const onChangeId = (e) => {
        setMemberId(e.target.value);
    };
    const onChangePwd = (e) => {
        setMemberPwd(e.target.value);
    };
    const onSubmit = () => {
        if(!memberId || !memberPwd){
            setStatus("아이디랑 비밀번호를 꼭 입력하세요");
            return;
        }
        // 우여곡절 정규표현식 어쩌고 저쩌고
        isLoading(true);
        setStatus("");
        axios.post('http://localhost/api/auth/login', {
            memberId,
            memberPwd
        }).then((result) => {
            console.log(result);
            // 응답데이터를 어딘가에 저장
            // Cookie session방식 로그인에서 알게 모르게 사용했음, sessionId는 cookie에 발급되서 저장됨, cookie는 자동 첨부돼서 저장됨
            // local storage와 session storage의 차이점
            // session storage는 창을 끄면 다 날라가버림
            // local storage는 안지우면 계속 남아있음
            // Cookie, SessionStorage, LocalStorage
            //  제외     종료시 날라감   껐다켜도 유지
            //                session + local : JS로 읽고 쓰기 가능 XSS(악성스크립주입)에 취약
            // cookie : CSRF에 취약

                    // 실무에서 지존 안전한 방법을 택해야한다.
                    // accessToken을 저장소에 저장안하고 걍 메모리
                    // refreshToken은 HttpOnly켜서 쿠키에 저장

            //localStorage.setItem("token", result.data.accessToken);
            //alert(localStorage.getItem("token"));
            login(result.data);
            navi("/");
        }).catch((err) => {
            //console.log(err.response);
            if(err.response.data.code === 400){
                setStatus(err.response.data.message);
            }else{
                setStatus("로그인에 실패했습니다.");
            }
            
            isLoading(false);
        });
    };

    const onKeyDown = (e) => {
        if (e.key == "Enter") onSubmit();
    }

    return (<Page>
        <Card>
            <Title>로그인</Title>
            <Sub>어디 한 번 로그인 해보시지</Sub>

            <Field>
                <Label>아이디</Label>
                <Input placeholder="아이디를 입력하시오." onChange={onChangeId} onKeyDown={onKeyDown}/>
            </Field>
            <Field>
                <Label>비밀번호</Label>
                <Input placeholder="비밀번호를 입력하시오." onChange={onChangePwd} onKeyDown={onkeydown} type="password"/>
            </Field>
            <Button disabled={loading} onClick={onSubmit}>
                  {loading ? "로그인 하는 중..." : "로그인"}
                </Button>
            {status.length > 0 && <Message>{status}</Message>}
        </Card>
    </Page>
    );
}

export default Login;