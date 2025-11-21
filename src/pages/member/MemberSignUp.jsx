import { useState } from "react"
import { validate } from "../../utils/function";
import {baseURL} from '../../utils/constant'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MemberSignup() {
  const [inputs, setInputs] = useState({username:'', password:'', password2:'', email:''});
  const [messages, setMessages] = useState({username:'', password:'', password2:'', email:''});

  const navigate = useNavigate();
  const failStyle = {color:'red', fontWeight:'0.8em'};

  const onChange=(e)=>{
    const {name, value} = e.target;
    setInputs(prev=>({...prev, [name]:value}));
  }

  const checkUsername=()=>{
    const result = validate('username', inputs.username);
    if(!result.validateResult)
      setMessages(prev=>({...prev, username:result.message}));
  }

  const checkPassword=()=>{
    const result = validate('password', inputs.password);
    if(!result.validateResult)
      setMessages(prev=>({...prev, password:result.message}));
  }

  const checkEmail=()=>{
    const result = validate('email', inputs.email);
    if(!result.validateResult)
      setMessages(prev=>({...prev, email:result.message}));
  }

  const checkPassword2=()=>{
    if(inputs.password2==='')
      setMessages(prev=>({...prev, password2:'새 비밀번호를 입력하세요'}));
    else if(inputs.password2!==inputs.password)
      setMessages(prev=>({...prev, password2:'새 비밀번호가 일치하지 않습니다'}));
  }

  const signUp=()=>{
    checkUsername();
    checkPassword();
    checkPassword2();
    checkEmail();
    
    const checkResult = !messages.username && !messages.password && !messages.password2 && !messages.email;
    if(!checkResult)
      return;
    
    const params = {username:inputs.username, password:inputs.password, email:inputs.email};
    axios.post(baseURL + "/members/new", new URLSearchParams(params)).then(()=>{
      alert("가입되었습니다");
      navigate("/member/login");
    }).catch(err=>{
      alert("회원 가입에 실패했습니다");
      console.log(err)
    })
  }

  return (
    <>
      <div className="mb-3 mt-3">
        <label className="form-label">아이디:</label>
        <input className="form-control" onBlur={checkUsername} onChange={onChange} name="username"/>
        {messages.username!=='' && <span style={failStyle}>{messages.username}</span>}
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label">비밀번호:</label>
        <input type="password" className="form-control" onBlur={checkPassword}  onChange={onChange} name="password"/>
        {messages.password!=='' && <span style={failStyle}>{messages.password}</span>}
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label">비밀번호 확인:</label>
        <input type="password" className="form-control" onBlur={checkPassword2}  onChange={onChange} name="password2"/>
        {messages.password2!=='' && <span style={failStyle}>{messages.password2}</span>}
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label">이메일:</label>
        <input type="email" className="form-control" onBlur={checkEmail}  onChange={onChange} name="email"/>
        {messages.email!=='' && <span style={failStyle}>{messages.email}</span>}
      </div>   
      <div className="mb-3 mt-3 d-grid">
        <button type="button" className="btn btn-outline-primary btn-block" onClick={signUp}>가입하기</button>
      </div>
    </>
  )
}

export default MemberSignup