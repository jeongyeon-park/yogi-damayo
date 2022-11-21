import { useEffect } from 'react';
import { API } from '../util/api'

const GetUserInfo = () => {
    const token = sessionStorage.getItem('jwtToken');
    useEffect(() => {
        postToken();
    }, []);

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
                        console.log(res.data);
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div>테스트</div>
    );
}

export default GetUserInfo;