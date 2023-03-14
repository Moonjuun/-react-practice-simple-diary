import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: "최문준",
    content: "하이!",
    emotion: 5,
    created_date: new Date().getTime()
  },
  {
    id: 2,
    author: "이정환",
    content: "하이!",
    emotion: 4,
    created_date: new Date().getTime()
  },
  {
    id: 3,
    author: "이수만",
    content: "하이!",
    emotion: 3,
    created_date: new Date().getTime()
  }
  ,{
    id: 4,
    author: "김동훈",
    content: "하이!",
    emotion: 2,
    created_date: new Date().getTime()
  }
];

function App() {
  return (
    <div className='App'>
      <DiaryEditor></DiaryEditor>
      <DiaryList diaryList={dummyList}></DiaryList>
    </div>
  );
}

export default App;
