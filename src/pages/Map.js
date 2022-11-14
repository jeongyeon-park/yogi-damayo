import { useEffect, useState } from 'react';
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import { API } from '../util/api';

const Map = () => {

    const [currentPosition, setPosition] = useState({ lat: 0, lon: 0, });
    const [centerList, setCenterList] = useState({});
    const [batteryList, setBatteryList] = useState({});
    const [trashCanList, setTrashCanList] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setPosition({ lat: 37.570335, lon: 126.978243 }, getMarkerInfo());
            // setPosition({ lat: position.coords.latitude, lng: position.coords.longitude, }, getMarkerInfo());
        });


    }, [])

    const getMarkerInfo = async () => {
        try {
            let centerResponse = await fetch(`${API}/coordinate`, {
                method: "post",
                body: JSON.stringify({ ...currentPosition, code: 1 })
            })
                .then((res) => res.json())
                .then((result) => console.log(result));
        }
        catch (err) {
            console.log(err);
        }
    }



    return (
        <div className="Map">
            <div className=''>

            </div>
            <KakaoMap
                center={{ lat: 37.570335, lng: 126.978243 }}
                style={{ width: "70vw", height: "700px", margin: "0 auto" }} >
                <MapMarker position={{ lat: 37.570335, lng: 126.978243 }}>

                </MapMarker>
            </KakaoMap >


        </div >
    );
}

export default Map;