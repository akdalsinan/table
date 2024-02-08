import React from "react";

import STable from "./STable";

import { users } from "./data/users";
import { TableProps, columnsTableProps } from "./data/tableProps";
import { books } from "./data/books";

function App() {
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
        <button style={{ backgroundColor: "red" }}>tıkla</button>
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
        data={books}
        columns={columnBooks}
        // search={true}
        // sıraNo={true}
        // align="center"
      />
    </>
  );
}

export default App;
