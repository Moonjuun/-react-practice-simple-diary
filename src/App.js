import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import React, { useRef, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current
    }
    dataId.current += 1;
    // 새로 추가하면 맨위에 보여줄거라서 맨 밑에서 보여줄거면 setData([...data, newItem]);
    setData([newItem, ...data]); 


  };

  return (
    <div className='App'>
      <DiaryEditor onCreate={onCreate}></DiaryEditor>
      <DiaryList diaryList={data}></DiaryList>
    </div>
  );
}

export default App;
