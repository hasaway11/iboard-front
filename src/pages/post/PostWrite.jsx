import { useState } from "react"
import ReactQuill from "react-quill-new"
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import  "./PostWrite.css";
import { modules } from "../../utils/constant";

function PostWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const write=()=>{
    const params = {title, content};
    console.log(params);
    api.post("/api/posts/new", new URLSearchParams(params)).then(res=>navigate(`/post/read?pno=${res.data.pno}`)).catch(err=>console.log(err));
  }

  return (
    <>
      <div className="mb-3 mt-3">
        <label className="form-label">제목:</label>
        <input className="form-control" onChange={(e)=>setTitle(e.target.value)} name="title" />
      </div>
      <ReactQuill theme="snow" name="content" modules={modules} value={content} onChange={(value)=>setContent(value)} />
      <div className="mb-3 mt-3 d-grid">
        <button type="button" className="btn btn-outline-primary btn-block" onClick={write}>글쓰기</button>
      </div>
    </>
  )
}

export default PostWrite