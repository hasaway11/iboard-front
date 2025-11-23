function CommentWrite({changeComment, writeComment, comment}) {
  return (
    <>
      <hr />
      <div className="mt-3 mb-3">
        <label className="form-label">댓글 작성:</label>
        <textarea className="form-control" rows={5} style={{resize: 'none'}} onChange={e=>changeComment(e.target.value)} value={comment}></textarea>
      </div>
      <div style={{display:'flex', justifyContent:'right'}} >
        <button className='btn btn-primary' onClick={writeComment}>작성하기</button>
      </div>
      <hr />
    </>
  )
}

export default CommentWrite