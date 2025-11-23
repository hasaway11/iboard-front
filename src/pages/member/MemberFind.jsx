import { useState } from "react"
import api from "../../utils/api";

function MemberFind() {
  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState(0);
  const [foundId, setFoundId] = useState("");

  const onChange=(e)=>setEmail(e.target.value);

  const find=()=>{
    api.get(`/members/username?email=${email}`).then(res=>{
      setFoundId(res.data);
      setSearchResult(1);
    }).catch(err=>{
      setSearchResult(-1);
    });
  }

  return (
    <>
      {
        searchResult==1 && (
        <div className="alert alert-success">
          <strong>아이디 : </strong> {foundId}
        </div>)
      }
      {
        searchResult==-1 && (
        <div className="alert alert-danger">
          <strong>검색 실패! </strong> 아이디를 찾을 수 없습니다
        </div>)
      }
      <div className="mb-3 mt-3">
        <label className="form-label">이메일:</label>
        <input type="email" className="form-control" onChange={onChange} name="email"/>
      </div>  
      <div className="mb-3 mt-3 d-grid">
        <button type="button" className="btn btn-outline-primary btn-block" onClick={find}>찾기</button>
      </div> 
    </>
  )
}

export default MemberFind