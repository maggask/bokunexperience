import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getExperience } from "../../services/apiService";

const ViewExperience = () => {
    const [experience, setExperience] = useState(null);
    const [loading, setLoading] = useState(true);
    const { experience_id } = useParams();

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const experience = await getExperience(experience_id);
                setExperience(experience);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching experience:", error);
            }
        };

        fetchExperience();
    }, [experience_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!experience) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{experience.title}</h1>
            {experience.imageUrl && (
                <img
                    src={experience.imageUrl}
                    alt={experience.title}
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            )}
            <p>{experience.description}</p>
            <p>Rating {experience.rating}</p>
        </div>
    );
};

export default ViewExperience;
