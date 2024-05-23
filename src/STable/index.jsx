import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";

import "./style.scss";

import { rowSelection } from "../stores/checkRowData";
// import { useDispatch } from "react-redux";
import { useDispatch } from "react-redux";
function Index({
  data,
  columns,
  align,
  sıraNo,
  search,
  checkbox,
  heightPx,
  widthPx,
}) {
  // // props'larının türlerini belirtiyoruz
  // Index.propTypes = {
  //   data: PropTypes.array.isRequired,
  //   columns: PropTypes.array.isRequired,
  //   align: PropTypes.oneOf(["left", "center", "right"]).isRequired,
  //   sıraNo: PropTypes.bool.isRequired,
  //   search: PropTypes.bool.isRequired,
  //   checkbox: PropTypes.bool.isRequired,
  //   heightPx: PropTypes.number.isRequired,
  //   widthPx: PropTypes.number.isRequired,
  // };
  // // Propsların default değerleri
  // Index.defaultProps = {
  //   align: "left",
  //   sıraNo: false,
  //   search: false,
  //   checkbox: false,
  //   heightPx: 500,
  //   widthPx: 1000,
  // };
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  // Aranan kelimeyi highlight olarak gösterme fonksiyonu
  const highlightSearchText = (text, keyword) => {
    if (typeof text !== "string") {
      return text;
    }
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(
      regex,
      '<span style="background-color: yellow; color:black" >$1</span>'
    );
  };

  // Genel keleime arama fonksiyonu
  const searchFunc = (value) => {
    const valueCaseSensitive = value.toLocaleLowerCase();

    return data.filter((item) => {
      return columns.some((column) => {
        const columnValue = item[column.dataIndex];

        if (columnValue) {
          if (typeof columnValue === "string") {
            return columnValue.toLocaleLowerCase().includes(valueCaseSensitive);
          } else {
            // Değer bir string değilse, doğrudan değeri döndür veya dönüşüm işlemleri yap
            return columnValue
              .toString()
              .toLowerCase()
              .includes(valueCaseSensitive);
          }
        }
      });
    });
  };
  const datam = searchFunc(searchValue);

  // Satırı checkbox ile seçme fonksiyonu
  const handleCheckboxChange = (dataItem, e) => {
    if (e) {
      setSelectedCheckboxes([...selectedCheckboxes, dataItem]);
    } else {
      // Eğer checkbox işaretli değilse, seçili checkbox değerlerinden kaldır
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== dataItem)
      );
    }
  };

  dispatch(rowSelection({ selectedCheckboxes }));

  return (
    <div
      className="tableDiv"
      style={{
        height: heightPx ? heightPx : "500px",
        width: widthPx ? widthPx : "1000px",
      }}
    >
      <table>
        {/* thead */}
        <thead style={{ backgroundColor: "gray" }}>
          {search && (
            <input
              placeholder="search"
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
            />
          )}
          <tr>
            {sıraNo && <th className="sıraNoHeader">sıra no</th>}
            {checkbox && <th className="sıraNoHeader">check</th>}
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>

        {/* tbody */}
        <tbody style={{ border: "1px solid red" }}>
          {datam.map((dataItem, index) => (
            <tr key={dataItem.key} style={{ textAlign: align }}>
              {sıraNo && <td key={dataItem.key}>{index + 1}</td>}
              {checkbox && (
                <td key={dataItem.key}>
                  <input
                    type="checkbox"
                    id="dataItem.key"
                    name="vehicle3"
                    value={dataItem.title}
                    onChange={(e) =>
                      handleCheckboxChange(dataItem, e.target.checked)
                    }
                  />
                </td>
              )}
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
