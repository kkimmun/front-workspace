import { useState } from "react";
import { Card, Page, Title , Sub, Field, Label, Input, Button, Hint, Message} from "../styles/AuthForm.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ChangePassword = () => {

    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [newPwdConfirm, setNewPwdConfirm] = useState('');
    const [status, setStatus] = useState('');
    const [loading, isLoading] = useState(false); 

    const mismatch = newPwdConfirm.length > 0 && newPwd !== newPwdConfirm

    const onSubmit = async () => {
        if(!currentPwd || !newPwd){
        setStatus("모든 항목을 입력해주세요");
        return;
        }
        if(mismatch){
            setStatus("새 비밀번호가 일치하지 않습니다.");
            return;
        }
        // 비동기 코드를 동기식으로 처리하고 싶을 때 사용하는 문법
        // async / await는 .then() .catch()를 위에서 아래로 읽기 편하게 쓴 문법
        try{
        await api.patch("/members",{
            memberPwd : currentPwd,
            updatePwd: newPwd
        });
        setStatus("비밀번호가 변경되었습니다.");
        setCurrentPwd("");
        setNewPwd("");
        setNewPwdConfirm("");
    } catch (err) {
        console.log(err.response.data.message);
        setStatus(err.response.data.message);
    } finally{
        isLoading(false);
    }

    }

    return(
        <Page>
            <Card>
                <Title>비밀번호 바꾸기</Title>
                <Sub>안전한 사용을 위해 3개월마다 바꾸시오.</Sub>

                <Field>
                    <Label>현재 비밀번호</Label>
                    <Input type="password" placeholder="현재 비밀번호"
                    onChange={e => setCurrentPwd(e.target.value)}/>
                </Field>
                <Field>
                    <Label>새 비밀번호</Label>
                    <Input type="password" placeholder="새 비밀번호"
                    onChange={e=>setNewPwd(e.target.value)}/>
                </Field>
                <Field>
                    <Label>새 비밀번호 확인</Label>
                    <Input type="password" placeholder="새 비밀번호 확인"
                    onChange={e=>setNewPwdConfirm(e.target.value)}/>

                    {mismatch && <Hint $error>비밀번호가 일치하지 않습니다.</Hint>}
                </Field>

                <Button disabled={loading} onClick={onSubmit}>
                    {loading ?"바꾸는 중" : "비밀번호 바꾸기" }</Button>

                {status && <Message>{status}</Message>}
            </Card>
        </Page>
    );
};

export default ChangePassword;