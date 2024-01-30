import React from "react";

import Tablo from "./Tablo";

function App() {
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "nice",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "loser",
    },
    {
      key: "3",
      name: "Joe Black",
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
    },
    {
      title: "action",
      dataIndex: "action",
      // render: () => "<button onClick={console.log(record)}>tıklaaa</button>",
    },
  ];

  return (
    <>
      <Tablo
        data={data}
        columns={columns}
        align="left"
        sıraNo={true}
        renderCell={(cellData, rowData, column) => {
          if (column.dataIndex === "action") {
            return <button onClick={() => console.log(rowData)}>tıkla</button>;
          } else {
            return cellData;
          }
        }}
      />
    </>
  );
}

export default App;
