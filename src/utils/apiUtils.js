import axios from "axios";

const URL = 'https://frederikcphb.dk/tomcat/exam/api';

const apiUtils = () => {

    const getUrl = () => {
        return URL;
    }

    const getAuthAxios = () => {
        const authAxios = axios.create({
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
        })
        return authAxios
    }

    return {
        getUrl,
        getAuthAxios
    }
}

export default apiUtils();