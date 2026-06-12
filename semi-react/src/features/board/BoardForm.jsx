import { useState, useEffect } from "react";
import {
  Page,
  TopBar,
  PageTitle,
  Button,
  List,
  Item,
  ItemTitle,
  ItemMeta,
  Empty,
  Pager,
  PagerButton,
  Loading,
  DetailTitle,
  MetaRow,
  Content,
  FileBox,
  Actions,
  GhostButton,
  DangerButton,
  Field,
  Label,
  Input,
  Message,
  FileLabel,
} from "./styles/Board.styles";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const BoardForm = () => {
  const navi = useNavigate();
  const { boardNo } = useParams();
  const isEdit = boardNo != null;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);
  const onSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setStatus("제목과 내용을 입력하세요");
      return;
    }
    isLoading(true);
    setStatus("");
    //컨트롤러가 폼바인딩 + MultipartFile

    const fd = new FormData();
    fd.append("boardTitle", title);
    fd.append("boardContent", content);
    if (file) fd.append("file", file);
    try {
      if (isEdit) {
        await api.patch(`/boards/${boardNo}`, fd);
        navi(`/boards/${boardNo}`);
      } else {
        await api.post("/boards", fd);
        navi("/boards");
      }
      //await api.post("/boards", fd);
      navi("/boards");
    } catch (err) {
      setStatus("게시글 작성 실패");
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/boards/${boardNo}`).then((result) => {
      const data = result.data;
      if (data) {
        setTitle(data.boardTitle);
        setContent(data.boardContent);
      }
    });
  }, [boardNo, isEdit]);

  return (
    <Page>
      <TopBar>글쓰기</TopBar>

      <Field>
        <Label>제목</Label>
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>
      <Field>
        <Label>내용</Label>
        <Input
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ height: "300px" }}
        />
      </Field>
      <Field>
        <Label>첨부파일</Label>
        <FileLabel>
          파일 선택
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </FileLabel>
      </Field>
      <Actions>
        <Button disabled={loading} onClick={onSubmit}>
          {loading ? "등록 중..." : "등록하기"}
        </Button>
      </Actions>
      {status && <Message>{status}</Message>}
    </Page>
  );
};

export default BoardForm;
