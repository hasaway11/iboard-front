import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Paginations.module.css';
import { Pagination } from "react-bootstrap";


function Paginations({pageno, prev, start, end, next}) {
  const [pages, setPages] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const pageItem=[];
    for(let i=start; i<=end; i++)
      pageItem.push(i);
    setPages({prev, pageItem, next});
  }, []);

  if(pages===null)
    return;

  const move=(pageno)=>navigate(`/?pageno=${pageno}`);

  return (
     <Pagination className={styles.paginations}>
      {
        pages.prev>0 && <Pagination.Item onClick={()=>move(pages.prev)}>이전으로</Pagination.Item>
      }
      {
        pages.pageItem.map(i=><Pagination.Item key={i} active={pageno===i} onClick={()=>move(i)}>{i}</Pagination.Item>)
      }
      {
        pages.next>0 && <Pagination.Item onClick={()=>move(pages.next)}>다음으로</Pagination.Item>
      }
    </Pagination>
  )
}

export default Paginations