import React from "react";

import STable from "./STable";
// import STable from "tablesssss/src/STable";

import { useSelector } from "react-redux";

import { TableProps, columnsTableProps } from "./data/tableProps";

function App() {
  const selectionCheckBoxes = useSelector((state) => state.selectionRow.value);
  console.log("selectionCheckBoxes", selectionCheckBoxes);

  return (
    <>
      <STable
        data={TableProps}
        columns={columnsTableProps}
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
