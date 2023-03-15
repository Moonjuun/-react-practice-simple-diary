import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import React, { useMemo, useEffect, useRef, useState } from "react";

function App() {
  // DiaryEditor, DiaryList가 함께 쓸 일기 data가 있다. 빈 배열로 시작
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
    console.log(res);

    const initData = res.slice(0,20).map((it) =>{
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random()*5)+1,
        created_date : new Date().getTime(),
        id : dataId.current++
      }
    })
    setData(initData);
  };

  // 마운트 되는 시점에 함수를 호출!
  useEffect(() => {
    getData();
  }, [])

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

  // 함수 연산을 최적화 해주는 useMemo
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석");

    const goodCount = data.filter((it)=>it.emotion >=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = Math.round((goodCount / data.length) * 100);
    return {goodCount, badCount, goodRatio};
  }, [data.length] // data.length 길이가 변화하지 않으면 렌더링X
  );

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className='App'>
      <DiaryEditor onCreate={onCreate}></DiaryEditor>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}></DiaryList>
    </div>
  );
}

export default App;
