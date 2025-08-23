import axios from "axios";

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
        throw new Error(error.response?.data?.message || "Failed to fetch user details");
    }
};

export const signin = async (email, password) => {
    try {
        const response = await axios.post(`${dbUri}/api/user/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

export const signup = async ({ name, email, password, otp }) => {
    try {
        const response = await axios.post(`${dbUri}/api/user/register`, {
            name,
            email,
            password,
            otp,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || "Signup failed");
    }
};

export const googleSignin = async (googleToken) => {
    try {
        const response = await axios.post(`${dbUri}/api/user/google`, {
            token: googleToken,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || "Google authentication failed");
    }
};

export const sendOtp = async ({ email, method = "signup" }) => {
    try {
        const response = await axios.post(`${dbUri}/api/otp`, {
            email, method
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || "Failed to send OTP");
    }
};

export const verifyOtp = async ({ email, otp }) => {
    try {
        const response = await axios.post(`${dbUri}/api/otp/verify`, {
            email,
            otp,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || "OTP verification failed");
    }
};

export const resetPassword = async ({ email, otp, newPassword }) => {
    try {
        const response = await axios.post(`${dbUri}/api/user/resetpassword`, {
            email,
            otp,
            newPassword,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || "Password reset failed");
    }
};