import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExperience, updateExperience } from "../../services/apiService";
import ExperienceForm from "./experienceForm";

const EditExperience = () => {
    const { experience_id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await getExperience(experience_id);

                setInitialData(response);
            } catch (error) {
                console.error("Error fetching experience:", error);
            }
        };

        fetchExperience();
    }, [experience_id]);

    const handleSubmit = async (data) => {
        try {
            const response = await updateExperience(experience_id, data);

            console.log("Experience updated:", response);

            navigate("/experiences");
        } catch (error) {
            console.error("Error updating experience:", error);
        }
    };

    if (!initialData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Experience</h2>
            <ExperienceForm
                initialData={initialData}
                onSubmit={handleSubmit}
                buttonText="Update Experience"
            />
        </div>
    );
};

export default EditExperience;
