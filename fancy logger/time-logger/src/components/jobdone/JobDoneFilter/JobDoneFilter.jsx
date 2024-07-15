import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import fetchProjects from "../../../services/projectServices";
import fetchJobTypes from "../../../services/jobTypesServices";

const JobDoneFilter = (props) => {
  const { jobsDone, setTableData } = props;
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    project: "",
    jobType: "",
  });
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
    if (user.uid) {
      fetchProjects(user.uid, setProjects);
      fetchJobTypes(setJobTypes);
    }
  }, [user, loading]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let filteredData = jobsDone;
    if (formData.jobType) {
      filteredData = filteredData.filter((item) => {
        return item.workType === formData.jobType;
      });
    }
    if (formData.project) {
      filteredData = filteredData.filter((item) => {
        return item.project === formData.project;
      });
    }
    if (formData.date) {
      filteredData = filteredData.filter((item) => {
        return item.startTime.includes(formData.date);
      });
    }
    setTableData(filteredData);
  };

  const resetHandler = () => {
    setTableData(jobsDone);
    setFormData({
      date: "",
      project: "",
      jobType: "",
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="m-3 d-flex flex-row justify-content-center flex-wrap">
          <div className="m-3">
            <input
              aria-label="data"
              id="date-filter"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="m-3">
            <select
              aria-label="Pasirinkti projektą"
              name="project"
              value={formData.project}
              id="project-filter"
              onChange={handleChange}
            >
              <option value="">Pasirinkti projektą</option>
              {projects.map((project) => (
                <option
                  key={project.id}
                  name={project.pavadinimas}
                  value={project.id}
                >
                  {project.pavadinimas}
                </option>
              ))}
            </select>
          </div>
          <div className="m-3">
            <select
              aria-label="Pasirinkti darbo tipą"
              name="jobType"
              value={formData.jobType}
              id="job-type-filter"
              onChange={handleChange}
            >
              <option value="">Pasirinkti darbo tipą</option>
              {jobTypes.map((jobType) => (
                <option key={jobType.id} name={jobType.name} value={jobType.id}>
                  {jobType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <button type="submit" className="m-3">
              Filtruoti
            </button>
            <button
              type="button"
              className="m-3"
              onClick={() => {
                resetHandler();
              }}
            >
              Pašalinti filtrus
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobDoneFilter;
