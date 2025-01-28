import React, { useState, useEffect } from "react";
import { getExperiences } from "../services/apiService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ViewExperience from "./experience/viewExperience";
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Typography,
    AppBar,
    Button,
    Container,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import CreateExperience from "./experience/createExperience";

const ListExperiences = () => {
    const [experiences, setExperiences] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { experience_id } = useParams();

    const fetchExperiences = async () => {
        try {
            const experiences = await getExperiences();
            setExperiences(experiences);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching experiences:", error);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, [location]);

    const handleExperienceClick = (experience_id) => {
        navigate(`/experiences/${experience_id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (location.pathname === "/experiences/new") {
        return <CreateExperience />;
    }

    if (experience_id) {
        return <ViewExperience />;
    }

    return (
        <>
            <AppBar position="static" style={{ backgroundColor: "#1b2231" }}>
                <Container
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Typography variant="h2">Experiences</Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/experiences/new")}
                        size="small"
                    >
                        Create new Experience
                    </Button>
                </Container>
            </AppBar>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {experiences.map((experience, index) => (
                    <Card
                        key={index}
                        onClick={() => handleExperienceClick(experience.id)}
                        style={{ cursor: "pointer", marginBottom: 16 }}
                    >
                        <CardHeader title={experience.title} />
                        {experience.imageUrl && (
                            <CardMedia
                                height="300"
                                component="img"
                                src={experience.imageUrl}
                                alt={experience.title}
                            />
                        )}
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
                        </CardContent>
                    </Card>
                ))}
            </ul>
        </>
    );
};

export default ListExperiences;
