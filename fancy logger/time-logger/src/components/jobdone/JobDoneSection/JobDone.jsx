import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import JobDoneFilter from "../JobDoneFilter/JobDoneFilter";
import JobDoneTable from "../jobDoneTable/jobDoneTable";
import AddJob from "../AddJob/AddJob";
import { fetchWorkEntries } from "../../../services/jobsDoneServices";

const JobDone = () => {
  const navigate = useNavigate();
  const [jobsDone, setJobsDone] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
    fetchWorkEntries(user.uid, setJobsDone);
  }, [user, loading]);

  return (
    <section className="container">
      <h2 className="m-3">Atlikti darbai</h2>
      <AddJob />
      <JobDoneFilter />
      <JobDoneTable data={jobsDone} />
    </section>
  );
};

export default JobDone;
