import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { infoTag } from "../util/img_text";
import { IMAGE_API } from "../util/api";

const Info = () => {

    const { id } = useParams();

    const code = infoTag[id][0];
    const name = infoTag[id][1];
    const color = infoTag[id][2];
    const img = infoTag[id][3];
    const logo = infoTag[id][4] || null;

    const [recycling, setRecycling] = useState([]);

    useEffect(() => {
        getRecycling();
    }, []);


    const getRecycling = async () => {
        try {
            const res = await fetch(`${IMAGE_API}/method?code=${code}`
            ).then((res) => res.json());

            if (res.statusCode == 200) {
                delete res.data.name;
                setRecycling(Object.entries(res.data));
                console.log(Object.entries(res.data));
            }
        } catch (err) {
            console.log(err);
        }
    }

    const searchKeyword = async () => {
        try {

        } catch (err) {
            console.log(err);
        }
    }

    return (

        <div className='Info'>
            <div className='main-content'>
                <div className='info-img-wrapper'>
                    <div className='background-circle' style={{ "position": "relative", "backgroundColor": "grey", "padding": "73px 23px", "borderRadius": "100px", "width": "100px", "hight": "100px" }}></div>
                    <div style={{ "position": "relative", "left": "30px", "top": "-120px", "backgroundColor": color, "padding": "20px", "borderRadius": "100px", "width": "100px", "hight": "100px" }}>
                        <img src={img} alt={"logo"} style={{ "width": "100px", "height": "100px" }} />

                    </div>
                </div>

                <div className='info-description'>
                    {logo ? <img src={logo} alt={"logo"} style={{ "width": "65px", "height": "65px" }} /> : null}
                    <p className='info-title'><strong style={{ "color": color }}>{name}</strong> </p>
                    <p>{name} 분리수거 주의 사항을 아래에서 확인해주세요. </p>
                </div>
            </div>

            <div className='middle-content'>
                <p className="info-cautions">분리수거 주의사항</p>
                {
                    recycling.map((item, index) => (
                        <>
                            <strong>{item[0]}</strong>{
                                item[1].map((i) => (<p>{i}</p>))
                            }
                        </>)
                    )}
            </div>

        </div>
    )
}

export default Info;