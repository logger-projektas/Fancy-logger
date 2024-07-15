import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import JobDoneFilter from "../JobDoneFilter/JobDoneFilter";
import JobDoneTable from "../jobDoneTable/jobDoneTable";
import AddJob from "../AddJob/AddJob";
import { fetchWorkEntries } from "../../../services/jobsDoneServices";
import Footer from "../../footer/Footer";

const JobDone = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [jobsDone, setJobsDone] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
    fetchWorkEntries(user.uid, setJobsDone);
  }, [user, loading]);

  useEffect(() => {
    setTableData(jobsDone);
  }, [jobsDone]);

  return (
    <div>
    <section className="container">
      <h2 className="m-3">Atlikti darbai</h2>
      <AddJob />
      {jobsDone.length > 0 && (
        <>
          <JobDoneFilter jobsDone={jobsDone} setTableData={setTableData} />
          {tableData.length === 0 ? (
            <h4 className="m-3 text-center">
              Užklausą atitinkančių rezultatų nerasta.
            </h4>
          ) : (
            <JobDoneTable data={tableData} />
          )}
        </>
      )}
      
    </section>
    <Footer/>
    </div>
  );
};

export default JobDone;
