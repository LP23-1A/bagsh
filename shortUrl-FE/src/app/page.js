'use client'
import axios from "axios"
import { useState } from "react";
// import { useEffect } from "react";
const defaultUrl = 'http://localhost:4000/';

export default function Home() {
  const [url, setUrl] = useState('');
  const [data, setData ] = useState([])
  const handler = async () => {

    let res = axios.post(defaultUrl, { url: url })
    console.log(res, 'res');
  }

  return (
    <main className="min-h-screen p-24">
      <input onChange={(event) => setUrl(event.target.value)} style={{ color: 'black' }} />
      <button onClick={handler}>click me</button>
    </main>
  )
}
