import { useParams } from "react-router-dom";
import { infoTag } from "../util/img_text";

const Info = () => {

    const { id } = useParams();

    const name = infoTag[id][1];
    const color = infoTag[id][2];
    const img = infoTag[id][3];
    const logo = infoTag[id][4] || null;

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
                    <p className='info-title'><strong style={{ "color": color }}>{name}</strong> 맞나요?</p>
                    <p>{name} 분리수거 주의 사항을 아래에서 확인해주세요. </p>
                </div>
            </div>

            <div className='middle-content'>
                <p className="info-cautions">분리수거 주의사항</p>
                <p>내용</p>
                <p>내용</p>
            </div>

        </div>
    )
}

export default Info;