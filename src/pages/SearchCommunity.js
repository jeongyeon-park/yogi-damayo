import { useState } from "react";
import { API } from '../util/api';
import { FaPlus, FaHashtag, FaSearch } from "react-icons/fa";
import ChatRoomItem from '../components/ChatRoomItem';

const SearchCommunity = () => {

    const [search, setSearch] = useState("");
    const [chatList, setChatList] = useState([]);
    const [msg, setMsg] = useState(false);

    const clickSearch = () => {
        if (search.length) {
            getSearchChat();
        }
    }

    const getSearchChat = async () => {
        try {
            const res = await fetch(`${API}/searchroom?keyword=${search}`
            ).then((res) => res.json()
            ).then(res => {
                if (res.statusCode == 200) {
                    setChatList(res.data);
                    setMsg(false);
                    this.searchTag.classList.add('hide');
                }
                else if (res.statusCode == 203) {
                    setMsg(true);
                }
            }
            );

        } catch (e) {
            console.log(e);
        }
    }
    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="SearchCommunity">
            <div className="search-wrap">
                <input className="tag-search" placeholder='이름/태그 검색' onChange={handleChange} /><FaSearch style={{ "position": "relative", "right": "30px", "top": "3px" }} onClick={clickSearch} />
            </div>
            <div className="result-wrap">
                {msg ? <div style={{ "textAlign": "center" }}>일치하는 방이 없습니다. <br /> 다른 검색어를 입력 해주세요.</div> : <div></div>}

                {
                    chatList.length != 0 ?
                        chatList.map((item, idx) => <ChatRoomItem key={idx} data={item} />)
                        :
                        null
                }
            </div>
        </div>
    );
}

export default SearchCommunity;