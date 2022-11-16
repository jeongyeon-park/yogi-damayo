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
            <img src={`/img/${img}`} alt={name} />
            {console.log(process.env.PUBLIC_URL + `/search_img/${img}`)}
            <div>{name}</div>
        </div>
    );
}

export default SearchResultComponent;

