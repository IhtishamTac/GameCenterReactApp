import axios from "axios";

const ax = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
});

const signin = async (username, password, navigate) => {
    const data = { username, password }
    try {
        const res = await ax.post('auth/signin', data);
        if(res && res.status === 200){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', username);
            navigate('/dashboard');
        }
    } catch (err) {
        alert(err.response.data.message || 'Unknown Error');
    }
}

const signout = async (token, navigate) => {
    try {
        const res = await ax.post('auth/signout', {}, {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        });
        if(res && res.status === 200){
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/');
        }
    } catch (err) {
        alert(err.response.data.message || 'Unknown Error');
    }
}

const Api = {
    signin,
    signout
}

export default Api;