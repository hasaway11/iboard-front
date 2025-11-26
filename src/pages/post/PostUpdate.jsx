import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import { modules } from "../../utils/constant";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Alert } from "react-bootstrap";

function PostUpdate() {
  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pno = searchParams.get('pno');
  if(pno==null)
    return <Navigate to="/"/>

  useEffect(()=>{
    setLoading(true);
    api.get(`/api/posts/post?pno=${pno}&includeComments=false`).then(res=>{
      const {comments, ...post} = res.data;
      setPost(post);
      setLoading(false);
    }).catch(err=>{
      setError(err);
      setLoading(false);
    });
  }, []);

  const handleChangeTitle = (e)=>setPost({...post, title: e.target.value});

  // ReactQuill 전용 핸들러 추가
  // ReactQuill의 onChange: (content, delta, source, editor) => {}
  // 첫 번째 파라미터가 바로 변경된 content 값
  const handleQuillChange = (content)=>setPost({...post, content: content});

  const update=()=>{
    const params = {pno, title:post.title, content:post.content};
    api.put("/api/posts/post", new URLSearchParams(params)).then(res=>navigate(`/post/read?pno=${pno}`)).catch(err=>console.log(err));
  }


  if(isLoading)
    return <LoadingSpinner />
  if (error)
    return <Alert variant="danger">{String(error)}</Alert>;
  if(post==null)
    return null;

  return (
    <>
      <div className="mb-3 mt-3">
        <label className="form-label">제목:</label>
        <input className="form-control" onChange={handleChangeTitle} name="title" value={post.title} />
      </div>
      <ReactQuill theme="snow" name="content" modules={modules} onChange={handleQuillChange} value={post.content} />
      <div className="mb-3 mt-3 d-grid">
        <button type="button" className="btn btn-outline-primary btn-block" onClick={update}>변경하기</button>
      </div>
    </>
  )
}

export default PostUpdate