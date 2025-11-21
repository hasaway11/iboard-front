import { useState } from "react";
import { baseURL } from "../../utils/constant";
import { Alert } from "react-bootstrap";
import useAuthStore from "../../stores/useAuthStore"

function MemberRead() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [setLogout] = useAuthStore();

  useEffect(()=>{
    setLoading(true);
    axios.get(baseURL + "/members/member").then(res=>{
      setData(res.data);
      setLoading(false);
    }).catch(err=>{
      setError(err);
      setLoading(false);
    });
  }, []);

  const resign=()=>{
    const choice = confirm("탈퇴하시겠습니까'?");
    if(!choice)
      return;

    axios.delete(baseURL + "/members/member").then(res=>{
      alert("탈퇴되었습니다. 이용해주셔서 감사합니다");
      setLogout();
    }).catch(err=>{
      alert("작업에 실패했습니다");
      console.log(err);
    })
  }

  if(isLoading)
    return <LoadingSpinner />
  if (error)
    return <Alert variant="danger">{String(error)}</Alert>;
  if(data==null)
    return null;

  return (
    <>
      <table className='table table-border'>
        <tbody>
          <tr>
            <td>아이디</td>
            <td>{data.username}</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{data.email}</td>
          </tr>
          <tr>
            <td>가입입</td>
            <td>{`${data.joinday} (${data.days}일)`}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button className='btn btn-success' onClick={()=>navigate('/member/change-password')}>비밀번호 변경으로</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-3 mb-3">
        <button className="btn btn-danger" onClick={resign}>탈퇴</button>
      </div>
    </>
  )
}

export default MemberRead