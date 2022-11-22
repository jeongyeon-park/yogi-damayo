
const WriteItemComponent = ({ item, nickname }) => {

    return (
        <div className="WriteItemComponent">
            <div className="top-wrap">
                <img src="/img/yogi_damayo_logo/yogi.jpg" alt="profile" style={{ "width": "50px", "borderRadius": "20px" }} />
                <strong>{item.nickname}</strong>
            </div>
            <div className="mid-wrap">
                {item.content}
            </div>
            <div className="bottom-wrap" >
                {item.imageList.map((url) => <img src={url} alt="img" />)}

            </div>
            {nickname == item.nickname ? (<div className='btns'><button>수정하기</button></div>) : null}

        </div>
    );
}

export default WriteItemComponent;