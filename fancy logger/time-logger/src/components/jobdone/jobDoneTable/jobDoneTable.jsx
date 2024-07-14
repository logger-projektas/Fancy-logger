import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleDelete } from "../../../services/jobsDoneServices";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import fetchProjects from "../../../services/projectServices";
import fetchJobTypes from "../../../services/jobTypesServices";
import AddJobForm from "../AddJob/AddJobForm";

const JobDoneTable = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workType: "",
    project: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDocId, setEditDocId] = useState(null);

  const [projects, setProjects] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
    fetchProjects(user.uid, setProjects);
    fetchJobTypes(setJobTypes);
  }, [user, loading]);

  const handleEdit = (entry) => {
    setFormData(entry);
    setIsEditing(true);
    setEditDocId(entry.id);
    setFormVisible(true);
  };

  return (
    <>
      <div className="container">
        {isFormVisible && (
          <AddJobForm
            setFormVisible={setFormVisible}
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editDocId={editDocId}
            setEditDocId={setEditDocId}
          />
        )}
        <div className="table-responsive">
          <table className="table mb-3">
            <thead>
              <tr>
                <th scope="col">Pradžia</th>
                <th scope="col">Pabaiga</th>
                <th scope="col">Projektas</th>
                <th scope="col">Darbo tipas</th>
                <th scope="col">Aprašymas</th>
                <th scope="col" colSpan="2">
                  Veiksmai
                </th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((entry, index) => (
                <tr key={index}>
                  <td scope="row">{entry.startTime}</td>
                  <td>{entry.endTime}</td>
                  <td id={entry.project}>
                    {projects.find((p) => p.id === entry.project)?.pavadinimas}
                  </td>
                  <td id={entry.workType}>
                    {jobTypes.find((jt) => jt.id === entry.workType)?.name}
                  </td>
                  <td>
                    <a
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#entry-${entry.id}`}
                    >
                      <i className="bi bi-three-dots"></i>
                    </a>
                    <div
                      className="modal fade"
                      id={`entry-${entry.id}`}
                      tabIndex="-1"
                      aria-labelledby={`entryLabel-${entry.id}`}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4
                              className="modal-title fs-5"
                              id={`entryLabel-${entry.id}`}
                            >
                              Aprašymas
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <p>{entry.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      type="button"
                      onClick={() => {
                        handleEdit(entry);
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      type="button"
                      onClick={() => {
                        handleDelete(entry.id);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default JobDoneTable;
