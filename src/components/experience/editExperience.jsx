import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateExperience } from "../../services/apiService";
import ExperienceForm from "./experienceForm";

const EditExperience = () => {
    const { experience_id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await updateExperience(experience_id);

                setInitialData(response.data);
            } catch (error) {
                console.error("Error fetching experience:", error);
            }
        };

        fetchExperience();
    }, [experience_id]);

    const handleSubmit = async (data) => {
        try {
            const response = await apiService.put(
                `/experience/${experience_id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Experience updated:", response.data);

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
