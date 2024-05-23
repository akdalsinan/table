/* eslint-disable react/prop-types */
import React from "react";

const PrintTable = ({ data, column }) => {
  const printRef = useRef(null);
  // Her sayfada 5 satır olacak şekilde kitapları parçalara ayır
  const chunkedBooks = [];
  const chunkSize = 6;
  for (let i = 0; i < data.length; i += chunkSize) {
    // eslint-disable-next-line react/prop-types
    chunkedBooks.push(data.slice(i, i + chunkSize));
  }
  return (
    <div>
      {chunkedBooks.map((chunk, index) => (
        <div key={index}>
          <table
            style={{
              pageBreakInside: "avoid",
              borderCollapse: "collapse",
              border: "1px solid black",
              marginBottom: "20px",
            }}
          >
            {/* thead */}
            <thead>
              <tr>
                {column.map((column) => (
                  <th
                    key={column.key}
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            {/* tbody */}
            <tbody>
              {chunk.map((dataItem, dataIndex) => (
                <tr key={dataItem.key}>
                  {column.map((column) => (
                    <td
                      key={column.key}
                      style={{ border: "1px solid black", padding: "8px" }}
                    >
                      {column.render === undefined
                        ? dataItem[column.dataIndex]
                        : column.render(dataItem[column.dataIndex], dataItem)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PrintTable;
