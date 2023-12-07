import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

let api = "https://dev.to/api/articles?username=gereltuyamz";

export default function Home() {
  const [data, setData] = useState([]);
  const valueRef = useRef('');
  const initData = useRef([]);
  const router = useRouter();
  const getData = async (api) => {
    let res = await axios.get(api);
    initData.current = res.data;
    setData(res.data);
  };

  const reset = () => setData(initData.current);

  const filter = (name) => setData(() => initData.current.filter((el) => el.tags === name));
  
  const handler = () => getData("https://dev.to/api/articles");
  
  const handlerInputValue = (value) => {
    valueRef.current =  value;
  }

  const handlerRouter = (id) => router.push(`id=${id}`)
  useEffect(() => {
    getData(api);
  }, []);


  return (
    <main>
      {data.map((el, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundImage: `url(${el.social_image})`,
              height: "500px",
              width: "500px",
            }}
            onClick={() => handlerRouter(el.id)}
          >
            {el.title} <h3>{el.tags}</h3>
          </div>
        );
      })}
      <div style={{ display: "flex", gap: '24px'}}>
        <button onClick={handlerRouter}>load more</button>
        <button onClick={() => filter('webdev')}>webdev</button>
        <button onClick={() => filter('programming')}>programming</button>
        <button onClick={() => filter('nextjs')}>nextjs</button>
        <br />
        <button onClick={reset}>reset</button>
      </div>
      <input style={{ color: 'black'}} onChange={(e) => handlerInputValue(e.target.value)} />
    </main>
  );
}
