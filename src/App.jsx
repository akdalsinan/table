import React from "react";

import Tablo from "./Tablo";

function App() {
  const data = [
    {
      key: "1",
      name: "John Brownsdfs",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "nice",
    },
    {
      key: "2",
      name: "Jim Greesfddsfn",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "loser",
    },
    {
      key: "3",
      name: "Joe Bldsfdsack",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: "cool",
    },
  ];

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
          {column.title}
        </button>
      ),
    },
  ];

  return (
    <>
      <Tablo data={data} columns={columns} />
    </>
  );
}

export default App;
