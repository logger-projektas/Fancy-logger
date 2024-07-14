import React, { useState } from "react";
import AddJobForm from "./AddJobForm";

const AddJob = () => {
  const [formData, setFormData] = useState({
    workType: "",
    project: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
    setIsEditing(false);
    setFormData({
      workType: "",
      project: "",
      description: "",
      startTime: "",
      endTime: "",
    });
  };

  return (
    <div>
      <button onClick={toggleFormVisibility} className="btn btn-primary m-3">
        {isFormVisible ? "Atšaukti" : "Pridėti naują darbą"}
      </button>
      {isFormVisible && (
        <AddJobForm
          setFormVisible={setFormVisible}
          formData={formData}
          setFormData={setFormData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default AddJob;
