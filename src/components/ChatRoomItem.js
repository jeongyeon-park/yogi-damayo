import { useState } from 'react';

const ChatRoomItem = ({ data }) => {
    console.log(data);
    const [info, setInfo] = useState(data);


    return (
        <div className='RoomItem' style={{ "border": "1px solid grey", "borderRadius": "5px", "width": "20rem" }}>
            <div>{info['title']}</div>
            <div>{info['count']}명 / {info['maxnum']}명</div>
            {/* {info['tags'].length ? info['tags'].map((tag) => <div>#{tag}</div>) : null} */}
        </div>
    );
}

export default ChatRoomItem;

