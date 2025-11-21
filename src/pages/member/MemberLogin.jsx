import { useState } from "react";
import useAuthStore from "../../stores/useAuthStore"

function MemberLogin() {
  const [inputs, setInputs] = useState({username:'', password:''});
  const {setLogin} = useAuthStore();

  const onChange=(e)=>{
    const {name, value} = e.target;
    setInputs(prev=>({...prev, [name]:value}));
  }

  const login=()=>{
    const params={username:inputs.username, password:inputs.password};
    axios.post("http://localhost:8080/login").then(res=>{
      setLogin(res.data.username, res.data.role);
    }).catch(err=>{
      console.log(err);
      alert("로그인할 수 없습니다");
    });
  }

  return (
    <>
      <div className="mb-3 mt-3">
        <label className="form-label">아이디:</label>
        <input className="form-control" onChange={onChange} name="username"/>
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label">비밀번호:</label>
        <input type="password" className="form-control" onChange={onChange} name="password"/>
      </div>
      <div className="mb-3 mt-3 d-grid">
        <button type="button" className="btn btn-outline-primary btn-block" onClick={login}>로그인</button>
      </div>
    </>
  )
}

export default MemberLogin