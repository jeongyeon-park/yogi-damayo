import { useNavigate } from 'react-router-dom'

const SearchResultComponent = ({ no, type, name, img }) => {

    let srcUrl = `search_img/${img}`;
    const navigate = useNavigate();

    console.log(srcUrl)

    const onResultClick = () => {
        navigate(`/info/${type}`);
    }

    return (
        <>
            {
                no == 999 ? <div style={{ "textAlign": "center" }}> 미등록 쓰레기입니다. <br />요기담아요에 요청을 남겨주시면 빠르게 반영하겠습니다!</div>
                    :
                    <div className="ResultComponent" onClick={onResultClick}>
                        <img src={`img/search_result/${img}`} alt={name} style={{ "width": "100px", "height": "80px", "marginRight": "10px" }} />
                        <div style={{ "color": "blue", "display": "flex", "alignItems": "center", "textDecoration": "underline", "whiteSpace": "noWrap" }}>{name}</div>
                    </div>
            }
        </>

    );
}

export default SearchResultComponent;

