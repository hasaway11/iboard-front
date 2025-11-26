import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore"
import { useEffect, useRef, useState } from "react";
import CommentWrite from "../../components/CommentWrite";
import CommentList from "../../components/CommentList";
import api from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Alert } from "react-bootstrap";

function PostRead() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   // 1. 필요한 기늠 가져오기(라우팅, 커스텀훅, 로그인 이름)
  const navigate = useNavigate();
  const {username} = useAuthStore();
  

  // 2. pno 파라미터를 읽어온다
  //    Number(params.get('pno'))는 pno가 null이면 0, 숫자가 아난 경우 NaN
  const [searchParams] = useSearchParams();
  const pno = searchParams.get('pno');
  if(pno==null)
    return <Navigate to="/"/>

  useEffect(()=>{
    setLoading(true);
    api.get(`/api/posts/post?pno=${pno}`).then(res=>{
      const {comments, ...post} = res.data;
      setPost(post);
      setComments(comments);
      setLoading(false);
    }).catch(err=>{
      setError(err);
      setLoading(false);
    });
  }, []);

  // 3. 로그인 여부 및 작성자 여부를 나타내는 파생 상태(derived state). data가 필요하므로 guard 이후에 계산
  const isLogin = username!==undefined && username!==null;
  const isWriter = post && username && post.writer === username;

  const deletePost=()=>api.delete(`/api/posts/post?pno=${post.pno}`).then(()=>navigate("/")).catch(err=>console.log(err));

  const changeComment=(text)=>setComment(text);

  const writeComment=()=>{
    const params = {pno:post.pno, content:comment}
    api.post("/api/comments/new", new URLSearchParams(params)).then(res=>{
      setComment("");
      setComments(res.data)
    }).catch(err=>console.log(err));
  }

  const deleteComment=(cno,pno)=>{
    api.delete(`/api/comments?cno=${cno}&pno=${pno}`).then(res=>setComments(res.data)).catch(err=>console.log(err));
	}

  if(isLoading)
    return <LoadingSpinner />
  if (error)
    return <Alert variant="danger">{String(error)}</Alert>;
  if(post==null)
    return null;
  
  return (
    <div>
      <div className="read-title mb-2">{post.title}</div>
      <div className="mb-3" style={{display:'flex', justifyContent:'space-between'}}>
        <div>
          <span className='read-value'>{post.writer}</span>
          <span className='read-value'> | </span>
          <span className="read-key">글번호 </span>
          <span className='read-value'>{post.pno}</span>
          <span className='read-value'> | </span>
          <span className='read-value'>{post.writeTime}</span>
          <span className='read-value'> | </span> 
          <span className="read-key">조회 </span>
          <span className='read-value'>{post.readCnt}</span>
          <span className='read-value'> | </span> 
        </div>
      </div>
      <div style={{minHeight:"600px", backgroundColor:'#f1f1f1', padding:'5px', overflow:'auto'}} dangerouslySetInnerHTML={{ __html: post.content }} />
      {
        isWriter &&
        <div className='mt-3 mb-3'>
          <button className="btn btn-success me-3" onClick={()=>navigate(`/post/update?pno=${pno}`)} >업데이트로</button>
          <button className="btn btn-danger" onClick={deletePost}>삭제하기</button>
        </div>
      }

      <div className='mt-3 mb-3'>
        { isLogin && <CommentWrite changeComment={changeComment} writeComment={writeComment} comment={comment} /> }
        { comments.length>0 && <CommentList comments={comments} deleteComment={deleteComment} /> }
      </div>
    </div>
  )
}

export default PostRead;