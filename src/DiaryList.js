import DiaryItem from "./DiaryItem";

const DiaryList = ( {onEdit, onRemove, diaryList} ) => {
    return (<div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}의 일기가 있습니다.</h4>
        <div>
            {diaryList.map((it) => ( 
                <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove}></DiaryItem>
            ))}
        </div>
    
    </div>
    );
};

// App.js에서 배열이 undefined로 넘어올 수도 있으니 
DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;