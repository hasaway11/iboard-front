import useAuthStore from '../stores/useAuthStore'
import { Navigate } from 'react-router-dom';

function PublicRoute({element}) {
  const {username} = useAuthStore();

  // 로그인 확인이전이라면
  if (username === undefined) 
    return; 

  return username? <Navigate to="/" replace />:element;
}

export default PublicRoute