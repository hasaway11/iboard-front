import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

import Header from './fragments/Header'
import Nav from './fragments/Nav'
import Footer from './fragments/Footer'

import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'

import PostList from './pages/post/PostList'
import PostRead from './pages/post/PostRead'
import PostWrite from './pages/post/PostWrite'
import PostUpdate from './pages/post/PostUpdate'

import MemberSignup from './pages/member/MemberSignUp'
import MemberFind from './pages/member/MemberFind'
import MemberRead from './pages/member/MemberRead'
import MemberChangePassword from './pages/member/MemberChangePassword'
import MemberLogin from './pages/member/MemberLogin'

import E403 from './pages/error/E403'
import E404 from './pages/error/E404'
import userAuthStore from './stores/useAuthStore'
import { useEffect } from 'react'

function App() {
  const location = useLocation();
  const {fetchAndStoreAuth} = userAuthStore();

  // 이동할 때마다 인증 정보를 업데이트
  useEffect(()=>{
    fetchAndStoreAuth()
  }, [location]);  

  return (
    <div className="App">
      <Header />
      <Nav />
      <main>
        <section>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/read" element={<PostRead />} />
            <Route path="/post/write" element={<PrivateRoute element={<PostWrite />} /> } />
            <Route path="/post/update" element={<PrivateRoute element={<PostUpdate />} /> } />
            <Route path="/member/signup" element={<PublicRoute element={<MemberSignup />} />} />
            <Route path="/member/login" element={<PublicRoute element={<MemberLogin />} /> } />
            <Route path="/member/find-username" element={<PublicRoute element={<MemberFind />} /> } />
            <Route path="/member/read" element={<PublicRoute element={<MemberRead />} /> } />
            <Route path="/member/change-password" element={<PublicRoute element={<MemberChangePassword />} /> } />
            <Route path="/e403" element={<E403 />} />
            <Route path="*" element={<E404 />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
