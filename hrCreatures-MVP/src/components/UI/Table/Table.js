import classes from "./style.module.css";

const Table = (props) => {
  const rows = props?.data?.map((dataObject, index) => ({
    ...dataObject,
    sno: index,
  }));

  return (
    <table className={`${classes.table} ${props.className}`}>
      <thead>
        <tr>
          {props.columns.map((titleData) => (
            <th colSpan={titleData.colSpan} key={titleData.key}>
              {titleData.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row) => (
          <tr
            key={row.sno}
            style={
              row.shortAttendance && {
                background: row.shortAttendance,
                color: "white",
              }
            }
          >
            {props?.columns.map((col) => (
              <td key={col.key} colSpan={col.colSpan} style={col.style}>
                {row[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
