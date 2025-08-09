import axios from "axios"

const dbUri = process.env.NEXT_PUBLIC_BACKEND_URL;

export const userDetails = async (token) => {
    try {
        const res = await axios.get(`${dbUri}/api/user/details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const signin = async (email, password) => {
    try {
        const response = await axios.post(`${dbUri}/api/user/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const signup = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${dbUri}/api/user/register`, {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.message);
    }
}

export const sendOtp = async ({ email }) => {
    try {
        const response = await axios.post(`${dbUri}/api/otp`, {
            email,
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.message);
    }
}

export const verifyOtp = async ({ email, otp }) => {
    try {
        const response = await axios.post(`${dbUri}/api/otp/verify`, {
            email,
            otp
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.message);
    }
}