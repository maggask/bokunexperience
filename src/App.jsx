import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ListExperiences from "./components/listExperiences";
import ViewExperience from "./components/experience/viewExperience";
import CreateExperience from "./components/experience/createExperience";
import EditExperience from "./components/experience/editExperience";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/experiences" />} />
            <Route path="/experiences" element={<ListExperiences />}>
                <Route path=":experience_id" element={<ViewExperience />}>
                    <Route path="edit" element={<EditExperience />} />
                </Route>
                <Route path="new" element={<CreateExperience />} />
            </Route>
        </Routes>
    );
}

export default App;
