import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import React, { useRef, useState } from "react";

function App() {
  // DiaryEditor, DiaryList가 함께 쓸 일기 data가 있다. 빈 배열로 시작
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

  const onRemove = (targetId) => {
    console.log(`${targetId} 삭제되었습니다.`)
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  }

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) => it.id === targetId ? {...it, content: newContent } : it)
    )
  }

  return (
    <div className='App'>
      <DiaryEditor onCreate={onCreate}></DiaryEditor>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}></DiaryList>
    </div>
  );
}

export default App;
