import { useEffect, useState } from 'react';
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import MapInfoItem from '../components/MapInfoItem';
import { API } from '../util/api';
import { FaMapPin } from 'react-icons/fa';
import betteryLogo from '../util/map_menu_logo/건전지.png';
import centerLogo from '../util/map_menu_logo/센터.png';
import trashcanLogo from '../util/map_menu_logo/쓰레기통.png';

import myLocationMarker from '../util/map_marker_img/내위치.png';
import batteryMarker from '../util/map_marker_img/배터리2.png';
import centerMarker from '../util/map_marker_img/센터1.png';
import recycleMarker from '../util/map_marker_img/재활용2.png';


const Map = () => {
    const markerImgs = [centerMarker, batteryMarker, recycleMarker];
    const [currentPosition, setPosition] = useState();
    const [code, setCode] = useState({ code: 0 });
    const [markerList, setMarkerList] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
            setPosition({ lat: 37.570335, lon: 126.978243 });
        });
    }, [])

    useEffect(() => {
        if (currentPosition && code) {
            getMarkerInfo();
        }
        console.log("getMarker 실행");
    }, [code])

    const getMarkerInfo = async () => {
        try {
            let postData = { ...currentPosition, ...code };
            let centerResponse = await fetch(`${API}/coordinate`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            })
                .then((res) => res.json())
                .then((result) => setMarkerList(result.data));

            console.log(markerList);
        }
        catch (err) {
            console.log(err);
        }
    }

    const menuClick = (e) => {
        setCode({ code: e.target.value });
    }

    return (
        <div className="Map">
            <div className='map-intro'>주변의 재활용 센터를 찾아드려요!</div>
            <ul className='link-wrapper'>
                <li value={0} onClick={menuClick}><img src={centerLogo} alt="재활용센터" width={25} />재활용센터</li>
                <li value={1} onClick={menuClick}><img src={betteryLogo} alt="건전지" width={30} /><span>폐건전지&형광등</span></li>
                <li value={2} onClick={menuClick}><img src={trashcanLogo} alt="쓰레기" width={20} />쓰레기&재활용품</li>
                <li><FaMapPin size={20} />내 위치</li>
            </ul>
            <div className='map-wrapper'>
                <div className='left-wrapper'>

                    {markerList.map((item, idx) => <MapInfoItem key={idx} name={item.name} address={item.adderess} number={item.number} />)}

                </div>
                <div className='right-wrapper'>

                    <KakaoMap
                        center={{ lat: 37.570335, lng: 126.978243 }}
                        style={{ width: "800px", height: "700px" }} >
                        <MapMarker
                            position={{ lat: 37.570335, lng: 126.978243 }}
                            image={{ src: myLocationMarker, size: { width: 30, height: 45 } }}
                        />


                        {markerList.map((item, idx) =>
                            <MapMarker
                                key={idx}
                                position={{ lat: item.lat, lon: item.lon }}
                                image={{ src: centerMarker, size: { width: 30, height: 45 } }}
                            />)
                        }
                    </KakaoMap >
                </div>

            </div>
        </div >
    );
}

export default Map;