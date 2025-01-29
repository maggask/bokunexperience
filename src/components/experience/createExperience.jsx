import React from "react";
import { useNavigate } from "react-router-dom";
import { createExperience } from "../../services/apiService";
import ExperienceForm from "./experienceForm";
import { Typography } from "@mui/material";

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
            <Typography variant="h5" style={{ marginBottom: "5px" }}>
                Create Experience
            </Typography>
            <ExperienceForm
                onSubmit={handleSubmit}
                buttonText="Create Experience"
            />
        </div>
    );
};

export default CreateExperience;
