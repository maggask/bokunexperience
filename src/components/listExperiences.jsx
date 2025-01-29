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
    Box,
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
                    maxWidth={false}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        src="src/assets/bokunlogo.png"
                        alt="logo"
                    />
                    <Typography variant="h2">Experiences</Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/experiences/new")}
                        size="small"
                        sx={{ backgroundColor: "#37b26d" }}
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
                        sx={{
                            maxWidth: 1000,
                            margin: "auto",
                            maxHeight: "100%",
                            cursor: "pointer",
                            marginBottom: 16,
                        }}
                    >
                        <CardHeader title={experience.title} />
                        {experience.imageUrl && (
                            <CardMedia
                                component="img"
                                src={experience.imageUrl}
                                alt={experience.title}
                                style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    display: "block",
                                    margin: "auto",
                                }}
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
