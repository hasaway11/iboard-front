import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

function PrivateRoute({ element }) {
  const username = useAuthStore();

  // 로그인 확인이전이라면
  if (username === undefined) 
    return; 

  // 로그인 확인 이후라면 로그인 여부에 따라 처리
  return username ? element : <Navigate to="/member/login" replace />;
};

export default PrivateRoute;