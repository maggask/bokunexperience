import React, { useState, useEffect } from "react";
import { getExperiences } from "../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import ViewExperience from "./experience/viewExperience";

const ListExperiences = () => {
    const [experiences, setExperiences] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { experience_id } = useParams();

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const experiences = await getExperiences();
                setExperiences(experiences);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching experiences:", error);
            }
        };

        fetchExperiences();
    }, []);

    const handleExperienceClick = (experience_id) => {
        navigate(`/experiences/${experience_id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (experience_id) {
        return <ViewExperience />;
    }

    return (
        <div>
            <h2>Experiences</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {experiences.map((experience, index) => (
                    <li
                        key={index}
                        onClick={() => handleExperienceClick(experience.id)}
                        style={{ cursor: "pointer" }}
                    >
                        <h3>{experience.title}</h3>
                        {experience.imageUrl && (
                            <img
                                src={experience.imageUrl}
                                alt={experience.title}
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        )}
                        <p>Rating {experience.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListExperiences;
