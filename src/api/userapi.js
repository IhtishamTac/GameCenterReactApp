import axios from "axios";

const ax = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
});

const getGames = async (token, size, page, sortBy, sortDir) => {
    try {
        const res = await ax.get('games', {
            params: {
                page: page || 0,
                size: size || 10,
                sortBy: sortBy || 'title',
                sortDir: sortDir || 'asc'
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(res && res.status === 200){
            return res.data;
        }
    } catch(err) {
        alert(err.response.data.message || 'Unknown error');
    }
}

const UserApi = {
    getGames
}

export default UserApi;