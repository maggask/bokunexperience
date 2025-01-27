import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ListExperiences from "./components/listExperiences";
import ViewExperience from "./components/experience/viewExperience";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/experiences" />} />
            <Route path="/experiences" element={<ListExperiences />}>
                <Route path=":experience_id" element={<ViewExperience />} />
            </Route>

            {/* <Route path="new" element={<NewExperience />} />
        <Route
            path=":experience_id/edit"
            element={<EditExperience />}
        /> */}
        </Routes>
    );
}

export default App;
