import { useNavigate } from 'react-router-dom'

const SearchResultComponent = ({ type, name, img }) => {

    let srcUrl = `search_img/${img}`;
    const navigate = useNavigate();

    console.log(srcUrl)

    const onResultClick = () => {
        navigate(`/info/${type}`);
    }

    return (
        <div className="ResultComponent" onClick={onResultClick}>
            <img src={`img/search_result/${img}`} alt={name} style={{ "width": "100px", "height": "80px" }} />
            {console.log(process.env.PUBLIC_URL + `img/search_result/${img}`)}
            <div style={{ "color": "blue" }}>{name}</div>
        </div>
    );
}

export default SearchResultComponent;

