import React, { useState } from "react";
import PropTypes from "prop-types";

import "./style.scss";

function Index({ data, columns, align, sıraNo, search }) {
  // props'larının türlerini belirtiyoruz
  Index.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    align: PropTypes.oneOf(["left", "center", "right"]).isRequired, //
    sıraNo: PropTypes.bool.isRequired,
    search: PropTypes.bool.isRequired,
  };
  // columns.map((item) => {
  // const [item.dataIndex, setitem.dataIndex] = useState(second)}
  // );

  const [searchValue, setSearchValue] = useState("");

  const highlightSearchText = (text, keyword) => {
    if (typeof text !== "string") {
      return text; // Eğer text bir metin değilse, doğrudan text değerini geri döndür
    }
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(
      regex,
      '<span style="background-color: yellow; color:black" >$1</span>'
    );
  };

  // columns.map((item) => console.log("itemsss", item));

  const searchFunc = (value) => {
    const valueCaseSensitive = value.toLocaleLowerCase();

    return data.filter((item) => {
      return columns.some((column) => {
        const columnValue = item[column.dataIndex];
        if (column.dataIndex) {
          if (typeof columnValue === "string") {
            return columnValue.toLocaleLowerCase().includes(valueCaseSensitive);
          } else {
            // Değer bir string değilse, doğrudan değeri döndürün veya dönüşüm işlemleri yapın
            return columnValue
              .toString()
              .toLowerCase()
              .includes(valueCaseSensitive);
          }
        }

        // (
        //   column.dataIndex &&
        //   item[column.dataIndex]
        //     .toLocaleLowerCase()
        //     .includes(valueCaseSensitive)
        // );
        // console.log("column", item[column.dataIndex]);
      });
    });
  };
  const datam = searchFunc(searchValue);
  console.log("datam", datam);

  return (
    <div>
      <table style={{ width: "1000px" }}>
        {/* thead */}
        <thead
          style={{
            width: "100px",
            backgroundColor: "gray",
          }}
        >
          {/* search prop */}
          {search && (
            <input
              placeholder="search"
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
            />
          )}

          <tr>
            {/* sıraNo prop */}
            {sıraNo && <th className="sıraNoHeader">sıra no</th>}
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>

        {/* tbody */}
        <tbody>
          {datam.map((dataItem, index) => (
            <tr key={dataItem.key} style={{ textAlign: align }}>
              {sıraNo && <td key={dataItem.key}>{index + 1}</td>}
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render === undefined ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchText(
                          dataItem[column.dataIndex],
                          searchValue
                        ),
                      }}
                    />
                  ) : (
                    column.render(dataItem[column.dataIndex], dataItem)
                  )}
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
