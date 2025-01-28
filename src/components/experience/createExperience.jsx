import React from "react";
import { useNavigate } from "react-router-dom";
import { createExperience } from "../../services/apiService";
import ExperienceForm from "./experienceForm";

const CreateExperience = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            const response = await createExperience(data);

            console.log("Experience created:", response);

            navigate("/experiences");
        } catch (error) {
            console.error("Error creating experience:", error);
        }
    };

    return (
        <div>
            <h2>Create Experience</h2>
            <ExperienceForm
                onSubmit={handleSubmit}
                buttonText="Create Experience"
            />
        </div>
    );
};

export default CreateExperience;
