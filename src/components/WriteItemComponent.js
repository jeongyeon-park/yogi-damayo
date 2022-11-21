

const WriteItemComponent = ({ item }) => {

    return (
        <div className="WriteItemComponent">
            <div className="top-wrap">
                <img src="/img/yogi_damayo_logo/yogi.jpg" alt="profile" style={{ "width": "50px", "borderRadius": "20px" }} />
                <strong>{item.nickname}</strong>
            </div>
            <div className="mid-wrap">
                {item.content}
            </div>
            <div className="bottom-wrap">


            </div>
        </div>
    );
}

export default WriteItemComponent;