import { useParams } from "react-router-dom";
import { infoTag } from "../util/img_text";

const Info = () => {

    const { id } = useParams();

    const color = infoTag[id][1];
    const img = infoTag[id][2];
    return (
        <>
            <div style={{ "backgroundColor": color }}>
                <img src={img} alt={"logo"} />
            </div>

        </>
    )
}

export default Info;