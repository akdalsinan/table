import React from "react";

import STable from "./STable";
import { useSelector } from "react-redux";

import { users } from "./data/users";
import { TableProps, columnsTableProps } from "./data/tableProps";
import { books } from "./data/books";

function App() {
  const selectionCheckBoxes = useSelector((state) => state.selectionRow.value);
  console.log("selectionCheckBoxes", selectionCheckBoxes);

  const columnBooks = [
    { title: "kitap ismi", dataIndex: "kitap_ismi" },
    { title: "özet", dataIndex: "ozet" },
    {
      title: "anahtar kelimeler",
      dataIndex: "anahtar_kelimeler",
      render: (row) => {
        if (row.length > 50) {
          return row;
        }
      },
    },
    {
      title: "action",
      render: (row, column) => (
        <button
          onClick={() => {
            console.log("row", column);
          }}
        >
          tıkla
        </button>
      ),
    },
  ];

  const columnsUsers = [
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
      render: (cellData, column) => (
        <div style={{ backgroundColor: "red" }}>sadsa</div>
      ),
    },
    {
      title: "action",
      dataIndex: "action",
      render: (cellData, column) => (
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => console.log("cellData", cellData)}
        >
          {/* {column.title} */}
        </button>
      ),
    },
  ];

  return (
    <>
      <STable
        data={TableProps}
        columns={columnsTableProps}
        // align="center"
        sıraNo={true}
        // search={true}
        checkbox={true}
        // heightPx={500}
        // widthPx={1500}
      />
    </>
  );
}

export default App;
