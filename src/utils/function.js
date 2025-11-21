const validationRules = {
  username: {
    emptyMessage : "아이디는 필수입력입니다",
    pattern: /^[0-9a-z]{6,10}$/,
    patternMessage: "아이디는 숫자와 소문자 6~10자입니다"
  },
  password: {
    emptyMessage : "비밀번호는 필수입력입니다",
    pattern: /^[0-9A-Za-z]{6,10}$/,
    patternMessage: "비밀번호는 영숫자 6~10자입니다"
  },
  email: {
    emptyMessage : "이메일는 필수입력입니다",
    pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    patternMessage: "이메일을 올바르게 입력해주세요"
  }
};

const validate=(name, value)=>{
  if(value==='')
    return {validateResult:false, message:validationRules[name].emptyMessage};
  if(validationRules[name].pattern.test(value)===false)
    return {validateResult:false, message:validationRules[name].patternMessage};
  return {validateResult:true};
}

export {validate}