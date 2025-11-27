import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore"
import { useEffect, useRef, useState } from "react";
import CommentWrite from "../../components/CommentWrite";
import CommentList from "../../components/CommentList";
import api from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Alert } from "react-bootstrap";

function PostRead() {
  // 서버에서 수신한 글과 댓글들
  // 서버는 글과 댓글들을 함께 응답하지만, 댓글 작성/삭제하면 댓글들만 갱신해야 하므로 분리해서 관리
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  // 작성중인 댓글 내용을 저장하는 상태
  const [comment, setComment] = useState('');

  // 서버와 통신 상황 처리에 필요한 상태
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const {username} = useAuthStore();
  

  // 1. pno 파라미터를 읽어온다
  //    Number(params.get('pno'))는 pno가 null이면 0, 숫자가 아난 경우 NaN
  const [searchParams] = useSearchParams();
  const pno = searchParams.get('pno');
  if(pno==null)
    return <Navigate to="/"/>

  // 2. 서버에서 응답을 수신해 글과 댓글을 분리해서 저장
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

  // 4. 글 삭제 후 /로 이동하는 핸들러
  const deletePost=()=>api.delete(`/api/posts/post?pno=${post.pno}`).then(()=>navigate("/")).catch(err=>console.log(err));

  // 5. 댓을 입력 핸들러
  const changeComment=(text)=>setComment(text);

  // 6. 댓글 작성하면 새로운 댓글들로 갱신하는 핸들러
  const writeComment=()=>{
    const params = {pno:post.pno, content:comment}
    api.post("/api/comments/new", new URLSearchParams(params)).then(res=>{
      setComment("");
      setComments(res.data)
    }).catch(err=>console.log(err));
  }

  // 7. 댓글 삭제하면 새로운 댓글들로 갱신하는 핸들러
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
      {/* 글 제목, 작성자, 번호, 작성시간, 조회수 출력 */}
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

      {/* 글 본문 출력. ReactQuill로 작성한 글은 dangerouslySetInnerHTML을 이용해 출력한다 */}
      <div style={{minHeight:"600px", backgroundColor:'#f1f1f1', padding:'5px', overflow:'auto'}} dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* 글 작성자인 경우 업데이트, 삭제 버튼 출력*/}
      {
        isWriter &&
        <div className='mt-3 mb-3'>
          <button className="btn btn-success me-3" onClick={()=>navigate(`/post/update?pno=${pno}`)} >업데이트로</button>
          <button className="btn btn-danger" onClick={deletePost}>삭제하기</button>
        </div>
      }

      <div className='mt-3 mb-3'>
        {/* 로그인한 경우 댓글 작성 영역 출력 */}
        { isLogin && <CommentWrite changeComment={changeComment} writeComment={writeComment} comment={comment} /> }

        {/* 댓글들 출력 */}
        { comments.length>0 && <CommentList comments={comments} deleteComment={deleteComment} /> }
      </div>
    </div>
  )
}

export default PostRead;