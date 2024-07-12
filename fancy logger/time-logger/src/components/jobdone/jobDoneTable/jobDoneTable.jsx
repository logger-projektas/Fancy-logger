const JobDoneTable = () => {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Projektas</th>
            <th scope="col">Darbo tipas</th>
            <th scope="col" colSpan="2">
              Veiksmai
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row">2024-07-12</td>
            <td>Time Logger</td>
            <td>Programavimas</td>
            <td>
              <a href="">
                <i className="bi bi-pencil"></i>
              </a>
            </td>
            <td>
              <a href="">
                <i className="bi bi-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JobDoneTable;
