import React, { useState, useEffect } from "react";

const ExperienceForm = ({ initialData = {}, onSubmit, buttonText }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || "",
        description: initialData.description || "",
        image: null,
    });

    useEffect(() => {
        setFormData({
            title: initialData.title || "",
            description: initialData.description || "",
            image: null,
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);

        if (formData.image) {
            data.append("image", formData.image);
        }

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Image:</label>
                <input type="file" name="image" onChange={handleChange} />
            </div>
            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default ExperienceForm;
