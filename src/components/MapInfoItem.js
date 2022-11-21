import nullLogo from '../util/map_menu_logo/느낌표.png';

const MapInfoItem = ({ name, address, number }) => {
    return (
        <div className="MapInfoItem">
            {
                address ?
                    <>
                        <div className="info-name" ><strong>{name}</strong></div>

                        <div>주소: {address}</div>
                        <div>전화번호: {number}</div>
                    </>
                    :

                    <>
                        <img src={nullLogo} alt="null이미지" style={{ "width": "50px", "height": "50px" }} />
                        <div>{name}</div>
                    </>
            }
        </div>
    );
}

export default MapInfoItem;