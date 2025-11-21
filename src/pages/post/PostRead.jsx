import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore"

function PostRead() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   // 1. 필요한 기늠 가져오기(라우팅, 커스텀훅, 로그인 이름)
  const navigate = useNavigate();
  const {username} = useAuthStore();
  

  // 2. pno 파라미터를 읽어온다
  //    Number(params.get('pno'))는 pno가 null이면 0, 숫자가 아난 경우 NaN
  const [params] = useSearchParams();
  const pno = Number(params.get('pno'));
  if (isNaN(pno) || pno < 1) 
    navigate("/");

  // 3. 로그인 여부 및 작성자 여부를 나타내는 파생 상태(derived state)
  const isLogin = username!==undefined && username!==null;
  const isWriter = data && username && data.writer === username;

  useEffect(()=>{
    setLoading(true);
    axios.get(baseURL + `/api/posts`).then(res=>{
      setData(res.data);
      setLoading(false);
    }).catch(err=>{
      setError(err);
      setLoading(false);
    });
  }, []);

  if(isLoading)
    return <LoadingSpinner />
  if (error)
    return <Alert variant="danger">{String(error)}</Alert>;
  if(data==null)
    return null;

  return (
    <div>PostRead</div>
  )
}

export default PostRead;