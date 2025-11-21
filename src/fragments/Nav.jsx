import axios from "axios";
import useAuthStore from "../stores/useAuthStore";
import { Link } from "react-router-dom";

function Nav() {
  const {role, setLogout} = useAuthStore();

  const doLogout=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:8080/logout').then(()=>setLogout()).catch(err=>console.log(err));
  }

  if(!role) {
    return (
      <nav>
        <ul>
          <li><Link to={"/"} style={{color:'white'}}>HOME</Link></li>
          <li><Link to={"/member/signup"}>회원가입</Link></li>
          <li><Link to={"/member/find-username"}>아이디 찾기</Link></li>
          <li><Link to={"/member/login"}>로그인</Link></li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav>
        <ul>
          <li><Link to={"/"} style={{color:'white'}}>HOME</Link></li>
          <li><Link to={"/member/read"}>내정보</Link></li>
          <li><Link to={"/post/write"} >글쓰기</Link></li>
          <li><Link to={"#"} onClick={doLogout}>로그아웃</Link></li>
        </ul>     
      </nav>
    )
  }
}

export default Nav