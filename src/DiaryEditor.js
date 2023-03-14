import React, { useRef, useState } from "react";

const DiaryEditor = ({onCreate}) => {
    
    const authorInput = useRef();
    const contentInput = useRef();
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    });

    const handleChangeState = (e)=>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    };

    // 체크 기능 추가
    // 요즘은 alert을 띄우는게 아니라 포커스를 둔다
    const handleSubmit = () => {
        console.log(state);
        if(state.author.length < 1) {
            // alert("작성자는 1글자 이상 입력해주세요!");
            // focus
            authorInput.current.focus();
            return ;
        }

        if(state.content.length < 5) {
            // alert("본문은 최소 5글자 이상 입력해주세요!");
            // focus
            contentInput.current.focus();
            return ;
        }
        onCreate(state.author, state.content, state.emotion);
        alert("저장 성공");
        setState({
            author: "",
            content: "",
            emotion: 1
        })
    }

    return <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input
            ref = {authorInput}
            name="author"
            value={state.author} 
            onChange={handleChangeState}></input>
        </div>

        <div>
            <textarea 
            ref = {contentInput}
            name="content"
            value={state.content} 
            onChange={handleChangeState}
            ></textarea>
        </div>

        <div>
            <span>오늘의 감정점수 : </span> 
            <select name='emotion' value={state.emotion} onChange={handleChangeState}>
                <option vlaue={1}>1</option>
                <option vlaue={2}>2</option>
                <option vlaue={3}>3</option>
                <option vlaue={4}>4</option>
                <option vlaue={5}>5</option>
            </select>
        </div>

        <div>
            <button onClick={handleSubmit}>저장하기</button>
        </div>

    </div>;
};

export default DiaryEditor;