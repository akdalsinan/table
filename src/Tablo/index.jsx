import React from "react";
import PropTypes from "prop-types";

import "./style.css";

function Index({ data, columns, align, sıraNo }) {
  //eslint hatası almamak için props'larının zorunlu bir dizi olması gerektiğini belirtiyoruz
  Index.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    align: PropTypes.oneOf(["left", "center", "right"]).isRequired, //
    sıraNo: PropTypes.bool.isRequired,
  };

  return (
    <div>
      <table style={{ width: "1000px" }}>
        <thead>
          <tr style={{ width: "100px", backgroundColor: "red" }}>
            {sıraNo && <th key="sıraNoHeader"></th>}
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataItem, index) => (
            <tr key={dataItem.key} style={{ textAlign: align }}>
              {sıraNo && <td>{index + 1}</td>}
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render === undefined
                    ? dataItem[column.dataIndex]
                    : column.render(dataItem, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
