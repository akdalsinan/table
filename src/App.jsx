import React from "react";

import STable from "./STable";
// import STable from "tablesssss/src/STable";

import { useSelector } from "react-redux";

import { TableProps, columnsTableProps } from "./data/tableProps";
import { users } from "./data/users";

function App() {
  const selectionCheckBoxes = useSelector((state) => state.selectionRow.value);
  console.log("selectionCheckBoxes", selectionCheckBoxes);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "tags",
      dataIndex: "tags",
      key: "tags",
      render: () => <div style={{ backgroundColor: "red" }}>sadsa</div>,
    },
    {
      title: "action",
      dataIndex: "action",
      render: (cellData, column) => (
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => console.log("cellData", cellData)}
        >
          {column.title}
        </button>
      ),
    },
  ];

  return (
    <>
      <STable
        data={users}
        columns={columns}
        // align="center"
        // sıraNo={true}
        // search={true}
        // checkbox={true}
        // heightPx={500}
        // widthPx={1500}
      />
    </>
  );
}

export default App;
