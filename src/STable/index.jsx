import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";

import "./style.scss";

import { rowSelection } from "../stores/checkRowData";
// import { useDispatch } from "react-redux";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";

import excelDowlandPng from "../../public/excelDowland1.png";
import { AiOutlineAppstore } from "react-icons/ai";

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
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [popoverClick, setPopoverClick] = useState(false);

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

  const handleExcel = () => {
    // Veri indislerini çıkartma
    const dataIndexes = columns.map((col) => col.dataIndex);

    // JSON verilerini bir Excel çalışma sayfasına dönüştür
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: dataIndexes,
    });

    // Sütun başlıklarını Excel'e uygun şekilde ayarla
    if (worksheet["!ref"]) {
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_col(C) + "1"; // Sütun harfi + 1 (ilk satır)
        if (!worksheet[address]) continue; // Bu adres boşsa, döngüde bir sonraki adıma geç
        // Her sütun için title varsa kullan, yoksa dataIndex kullan
        worksheet[address].v =
          columns[C] && (columns[C].title || columns[C].dataIndex);
      }
    }

    // Çalışma sayfasını bir çalışma kitabına ekleyin
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Dosyayı indir
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const handlePopover = () => {
    setPopoverClick(!popoverClick);
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
      <div>
        <button onClick={handlePopover}>
          <AiOutlineAppstore size="20px" />{" "}
        </button>
        {popoverClick && (
          <div>
            {" "}
            {search && (
              <input
                placeholder="search"
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                style={{ height: "30px" }}
              />
            )}
            <img
              onClick={handleExcel}
              src={excelDowlandPng}
              className="excelPng"
            />
          </div>
        )}
      </div>

      <table>
        {/* thead */}
        <thead style={{ backgroundColor: "gray" }}>
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
