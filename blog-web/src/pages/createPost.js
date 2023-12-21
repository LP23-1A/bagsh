import { useRef, useState } from "react";
import axios from "axios";
import { headers } from "../../next.config";

export default function ContactUs() {
  const [data, setData] = useState({ published: true });

  const handlerInput = (event, objectKey) => {
    let mock = {};
    if (objectKey === "tags") {
      mock[objectKey] = [event.target.value];
    } else {
      mock[objectKey] = event.target.value;
    }
    setData({ ...data, ...mock });
  };

  const sendRequest = async () => {
    let response = await axios.post("https://dev.to/api/articles", data, {
      headers: {
        "api-key": "KNz2XYATedYiEAKVkKZzf9zr",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        gap: "32px",
      }}
    >
      <input
        style={{ color: "black" }}
        onChange={(event) => handlerInput(event, "title")}
        placeholder="title"
      />
      <input
        style={{ color: "black" }}
        onChange={(event) => handlerInput(event, "body_markdown")}
        placeholder="description"
      />
      <input
        style={{ color: "black" }}
        onChange={(event) => handlerInput(event, "tags")}
        placeholder="tags"
      />
      <input
        style={{ color: "black" }}
        onChange={(event) => handlerInput(event, "series")}
        placeholder="series"
      />
      <button onClick={sendRequest}>Create post</button>
    </main>
  );
}
