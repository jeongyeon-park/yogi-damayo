import { useState, useEffect } from "react";
import { API } from '../util/api';
import { FaSearch } from "react-icons/fa";
import ChatRoomItem from '../components/ChatRoomItem';

const SearchCommunity = () => {

    const token = sessionStorage.getItem('jwtToken');
    const [search, setSearch] = useState("");
    const [chatList, setChatList] = useState([]);
    const [msg, setMsg] = useState(false);

    const [userInfo, setUserInfo] = useState({ "nickname": "", "email": "" });

    useEffect(() => {
        if (token) {
            postToken();
        }
    }, [token])

    const postToken = async () => {
        try {
            let res = await fetch(`${API}/user/token`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: token })
            }).then((res) => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        setUserInfo(res.data);
                    } else if (res.statusCode == 500) {
                        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
                        sessionStorage.removeItem('jwtToken');
                        navigator('/login');
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    const clickSearch = () => {
        if (search.trim().length) {
            getSearchChat();
        }
    }
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter' && search.trim().length) {
            getSearchChat();
        }
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const getSearchChat = async () => {
        try {
            const res = await fetch(`${API}/searchroom?keyword=${search}`
            ).then((res) => res.json()
            ).then(res => {
                if (res.statusCode == 200) {
                    setChatList(() => [...res.data]);
                    this.forceUpdate();
                    setMsg(false);
                    this.searchTag.classList.add('hide');
                }
                else if (res.statusCode == 203) {
                    setChatList(() => []);
                    setMsg(true);
                }
            }
            );

        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div className="SearchCommunity">
            <div style={{ "textAlign": "center", "fontFamily": "'Jua', sans-serif" }}>관심있는 키워드로 채팅방을 검색 해보세요!</div>
            <div className="search-wrap">
                <input
                    className="tag-search"
                    placeholder='이름/태그 검색'
                    onChange={handleChange}
                    onKeyPress={handleOnKeyPress}
                />
                <FaSearch style={{ "position": "relative", "right": "30px", "top": "3px" }} onClick={clickSearch} />
            </div>
            <div className='chat-room-items-wrap' style={{ "textAlign": "center" }}>
                {msg ? <div style={{ "width": "100%" }}>일치하는 방이 없습니다.<br />다른 검색어를 입력해주세요.</div> : null}
                {console.log(chatList)}
                {
                    chatList.length != 0 ?
                        chatList.map((item, idx) => <ChatRoomItem userInfo={userInfo} key={item.rum} data={item} />)
                        :
                        null
                }
            </div>
        </div>
    );
}

export default SearchCommunity;