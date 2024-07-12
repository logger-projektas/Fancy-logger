import JobDoneFilter from "../JobDoneFilter/JobDoneFilter";
import JobDoneTable from "../jobDoneTable/jobDoneTable";

const JobDone = () => {
  return (
    <section>
      <h1 className="text-center m-3">Atliktas darbas</h1>
      <JobDoneFilter />
      <JobDoneTable />
    </section>
  );
};

export default JobDone;
