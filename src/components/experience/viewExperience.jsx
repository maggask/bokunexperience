import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getExperience, deleteExperience } from "../../services/apiService";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import EditExperience from "./editExperience";

const ViewExperience = () => {
    const [experience, setExperience] = useState(null);
    const [loading, setLoading] = useState(true);
    const { experience_id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

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

    // Check if the current path is for editing the experience
    if (location.pathname.endsWith("/edit")) {
        return <EditExperience />;
    }

    return (
        <Card>
            <CardHeader title={experience.title} />
            {experience.imageUrl && (
                <CardMedia
                    height="300"
                    component="img"
                    src={experience.imageUrl}
                    alt={experience.title}
                />
            )}
            <CardContent>
                <Typography variant="body1" component="p" align="left">
                    {experience.description}
                </Typography>
            </CardContent>
            <CardContent
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <GradeIcon style={{ color: "#f1db0e" }} />
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="left"
                >
                    {experience.rating}
                </Typography>
                <Button
                    type="button"
                    onClick={() =>
                        navigate(`/experiences/${experience_id}/edit`)
                    }
                >
                    Edit
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        deleteExperience(experience_id);
                        navigate("/experiences");
                    }}
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};

export default ViewExperience;
