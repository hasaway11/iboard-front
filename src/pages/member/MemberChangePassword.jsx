import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useState } from "react";
import { validate } from "../../utils/function";
import useAuthStore from "../../stores/useAuthStore";


function MemberChangePassword() {
  const [inputs, setInputs] = useState({currentPassword:'', newPassword:'', newPassword2:''});
  const [messages, setMessages] = useState({currentPassword:'', newPassword:'', newPassword2:''});
  const {setLogout} = useAuthStore();

  const navigate = useNavigate();
  const failStyle = {color:'red', fontSize:'0.8em'};

  const onChange=(e)=>{
    const {name, value} = e.target;
    setInputs(prev=>({...prev, [name]:value}));
  }

  const checkPassword=(name)=>{
    const message = validate('password', inputs[name]);
    setMessages(prev=>({...prev, [name]:message}));
  }

  const checkNewPassword2=()=>{
    if(inputs.newPassword2==='')
      setMessages(prev=>({...prev, newPassword2:'새 비밀번호를 다시 입력하세요'}));
    else if(inputs.newPassword2!==inputs.newPassword)
      setMessages(prev=>({...prev, newPassword2:'새 비밀번호가 일치하지 않습니다'}));
  }

  const changePassword=()=>{
    checkPassword("currentPassword");
    checkPassword("newPassword");
    checkNewPassword2();
    const checkResult = messages.currentPassword==="" && messages.newPassword==="" && messages.newPassword2==="";
    if(!checkResult)
      return;

    const params = {currentPassword:inputs.currentPassword, newPassword:inputs.newPassword};

    api.patch("/api/members/password", new URLSearchParams(params)).then(()=>{
      alert("비밀번호를 변경했습니다. 다시 로그인하세요");
      setLogout();
      navigate("/member/login");
    }).catch(err=>{
      alert("비밀번호를 변경할 수 없습니다");
    });
  }

  return (
    <>
      <div className="mb-3 mt-3">
        <label className="form-label">현재 비밀번호:</label>
        <input type="password" className="form-control" onChange={onChange} onBlur={()=>checkPassword('currentPassword')} name="currentPassword"/>
        {messages.currentPassword!=='' && <span style={failStyle}>{messages.currentPassword}</span>}
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label">새 비밀번호:</label>
        <input type="password" className="form-control" onChange={onChange} onBlur={()=>checkPassword("newPassword")} name="newPassword"/>
        {messages.newPassword!=='' && <span style={failStyle}>{messages.newPassword}</span>}
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label">새 비밀번호 확인:</label>
        <input type="password" className="form-control" onChange={onChange} onBlur={checkNewPassword2} name="newPassword2"/>
        {messages.newPassword2!=='' && <span style={failStyle}>{messages.newPassword2}</span>}
      </div>
      <div className="mb-3 mt-3 d-grid">
        <button type="button" className="btn btn-outline-primary btn-block" onClick={changePassword}>가입하기</button>
      </div>
    </>
  )
}

export default MemberChangePassword