import React from "react";
import { useState, useTransition } from "react";

const Test = () => {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);

  const Listnum = 20000;
  const handleClick = (e) => {
    setInput(e.target.value);

    startTransition(() => {
      let arr = [];
      for (let i = 0; i < Listnum; i++) {
        arr.push(e.target.value);
      }
      setResult(arr);
    });
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleClick} />
      {isPending
        ? "wait"
        : result.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
    </div>
  );
};

export default Test;
