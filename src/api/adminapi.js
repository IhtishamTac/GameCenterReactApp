import axios from "axios";

const ax = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
});

const getAdmins = async (token) => {
    try {
        const res = await ax.get('admins', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (err) {
        alert(err.response.data.message || 'Unknown error');
        return;
    }
}

const getUsers = async (token) => {
    try {
        const res = await ax.get('usersid', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (err) {
        alert(err.response.data.message || 'Unknown error');
        return;
    }
}

const blockUser = async (token, id, delete_reason) => {
    try {
        await ax.post('users/' + id + '/block', { delete_reason }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        alert(err?.response?.data?.message || 'Unknown error');
        return;
    }
}

const unblockUser = async (token, id) => {
    try {
        await ax.delete('users/' + id + '/unblock', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    } catch (err) {
        alert(err.response.data.message || 'Unknown error');
        return;
    }
}

const adduser = async (token, username, password, navigate) => {
    try {
        const data = { username, password }
        const res = await ax.post('users', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res && res.status === 201) {
            navigate('/list-user');
        }
    } catch (err) {
        alert(err.response.data.message || 'Unknown error');
        return;
    }
}

const updateuser = async (token, id, username, password, navigate) => {
    try {
        const data = { username, password }
        const res = await ax.put('users/' + id, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res && res.status === 201) {
            navigate('/list-user');
        }
    } catch (err) {
        alert(err.response.data.message || 'Unknown error');
        return;
    }
}

const deleteUser = async (token, id) => {
    try {
        await ax.delete('users/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        alert(err.response.data.message || 'Unknown error');
        return;
    }
}

const AdminApi = {
    getAdmins,
    getUsers,
    blockUser,
    unblockUser,
    adduser,
    updateuser,
    deleteUser
}

export default AdminApi;