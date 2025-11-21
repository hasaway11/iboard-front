import { useNavigate } from 'react-router-dom'

function E404() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>원하셨던 페이지가 아닌가요?</h1>
      <p>방문하신 페이지가 변경 혹은 삭제되었을 수 있어요.</p>
      <p>이전 페이지에서 다시 한번 시도해 주세요</p>
      <button className='btn btn-dark' onClick={()=>navigate(-1)}>이전 페이지로</button>
    </div>
  )
}

export default E404