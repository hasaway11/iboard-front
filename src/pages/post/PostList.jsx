import { useState } from "react";
import { Alert, Table } from "react-bootstrap"
import { Link } from 'react-router-dom';
import styles from './Posts.module.css';
import Paginations from "../../components/Paginations";

function Post({post}) {
  const {pno, title, writer, writeTime, readCnt} = post;
  return (
    <tr key={post.pno}>
      <td className={styles.pno}>{pno}</td>
      <td className={styles.title}>
        <Link to={`/post/read?pno=${post.pno}`}>{title}</Link>
      </td>
      <td className={styles.writer}>{writer}</td>
      <td className={styles.writeTime}>{writeTime}</td>
      <td className={styles.readCnt}>{readCnt}</td>
    </tr>
  )
}

function PostList() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <>
      <Table  hover>
        <thead>
          <tr>
            <th>번호</th><th>제목</th><th>작성자</th><th>작성일</th><th>조회 </th>
          </tr>
        </thead>
        <tbody>
        {
          data.posts.map(post=><Post key={post.pno} post={post} />)
        }
        </tbody>
      </Table>
      <Paginations pageno={pageno} prev={prev} start={start} end={end} next={next} />
    </>
  )
}

export default PostList