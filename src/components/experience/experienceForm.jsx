import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ExperienceForm = ({
    initialData = { title: "", rating: 0, description: "", imageUrl: "" },
    onSubmit,
    buttonText,
}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        rating: initialData?.rating || 0,
        description: initialData?.description || "",
        imageUrl: initialData?.imageUrl || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title: formData.title,
            rating: parseInt(formData.rating),
            description: formData.description,
            imageUrl: formData.imageUrl,
        };

        onSubmit(data);
    };

    return (
        <Paper elevation={4} style={{ padding: "20px" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <TextField
                    variant="outlined"
                    label="Title"
                    size="small"
                    type="text"
                    name="title"
                    defaultValue={formData.title}
                    onChange={handleChange}
                    required
                />
                <TextField
                    variant="outlined"
                    label="Rating"
                    size="small"
                    type="number"
                    name="rating"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    defaultValue={formData.rating}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    label="Description"
                    multiline
                    rows={4}
                    name="description"
                    defaultValue={formData.description}
                    onChange={handleChange}
                    required
                />
                <TextField
                    variant="outlined"
                    label="Image URL"
                    size="small"
                    name="imageUrl"
                    type="text"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                />
            </Box>
            <Box
                component="section"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                <Button
                    variant="contained"
                    type="button"
                    sx={{
                        backgroundColor: "#37b26d",
                        marginRight: 5,
                        color: "#fff",
                    }}
                    onClick={handleSubmit}
                    disabled={!formData.title || !formData.description}
                >
                    {buttonText}
                </Button>
                <Button
                    variant="outlined"
                    type="button"
                    sx={{ color: "#1b2231", borderColor: "#1b2231" }}
                    onClick={() => navigate("/experiences")}
                >
                    Cancel
                </Button>
            </Box>
        </Paper>
    );
};

export default ExperienceForm;
