import useAuthStore from '../stores/useAuthStore';

function CommentList({comments, deleteComment}) {
  const {username} = useAuthStore();

  return (
		<>
		{
			comments.map(comment=>{
				return (
					<div key={comment.cno}>
						<div className='upper'style={{display:"flex", justifyContent: "space-between"}}>
							<div>
								<strong>{comment.writer}</strong>&nbsp;&nbsp;
								{
									(comment.writer===username) && <button className="btn btn-outline-danger" onClick={()=>deleteComment(comment.cno, comment.pno)}>삭제</button>
								}			
							</div>
						<div>{comment.writeTime}</div>
						</div>
						<div className='lower'>{comment.content}</div>
						<hr />
					</div>	
				)			
			})
		}
		</>
  )
}

export default CommentList