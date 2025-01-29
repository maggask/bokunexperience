import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getExperience, deleteExperience } from "../../services/apiService";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { ArrowBack, Edit, Delete } from "@mui/icons-material";
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ArrowBack
                    style={{ cursor: "pointer", marginLeft: 8 }}
                    onClick={() => navigate("/experiences")}
                />
                <CardHeader title={experience.title} />
            </Box>
            {experience.imageUrl && (
                <CardMedia
                    height="100%"
                    width="100%"
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
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    component="div"
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}
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
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        startIcon={<Edit />}
                        variant="contained"
                        type="button"
                        sx={{ backgroundColor: "#37b26d", color: "#fff" }}
                        onClick={() =>
                            navigate(`/experiences/${experience_id}/edit`)
                        }
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Delete />}
                        sx={{ color: "#f00", borderColor: "#f00" }}
                        type="button"
                        onClick={() => {
                            deleteExperience(experience_id);
                            navigate("/experiences");
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ViewExperience;
