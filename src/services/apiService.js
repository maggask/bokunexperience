import axios from "axios";

const API_URL = "https://demo.bokun.me/mtttdbx72nmamgli5hk8nyfm";

const getExperiences = async () => {
    try {
        const response = await axios.get(`${API_URL}/experiences`);
        return response.data;
    } catch (error) {
        console.error("Error fetching experiences:", error);
        throw error;
    }
};

const getExperience = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/experiences/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching experience:", error);
        throw error;
    }
};

const createExperience = async (experience) => {
    try {
        const response = await axios.post(`${API_URL}/experiences`, experience);
        return response.data;
    } catch (error) {
        console.error("Error creating experience:", error);
        throw error;
    }
};

const updateExperience = async (id, experience) => {
    try {
        const response = await axios.put(
            `${API_URL}/experiences/${id}`,
            experience
        );
        return response.data;
    } catch (error) {
        console.error("Error updating experience:", error);
        throw error;
    }
};

const deleteExperience = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/experiences/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting experience:", error);
        throw error;
    }
};

export {
    getExperiences,
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience,
};
