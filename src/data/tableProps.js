export const TableProps = [
  {
    property: "data",
    description: "Görüntülenecek veri kaydı dizisi",
    type: "object [ ]",
    default: "-",
  },
  {
    property: "columns",
    description: "Tablonun sütunları",
    type: "columsType",
    default: "-",
  },
  {
    property: "align",
    description: "Bu sütunun hangi yöne hizalanacağını belirtin",
    type: "left, right, center",
    default: "left",
  },

  {
    property: "sıraNo",
    description: "Tabloda sıra numarası olup olmayacağını belirtin",
    type: "boolean",
    default: "false",
  },
  {
    property: "searchInput",
    description: "Search inputun olup olmayacağını belirtin",
    type: "boolean",
    default: "false",
  },
];

export const columnsTableProps = [
  {
    title: "property",
    dataIndex: "property",
  },
  {
    title: "description",
    dataIndex: "description",
  },
  {
    title: "type",
    dataIndex: "type",
  },
  {
    title: "default",
    dataIndex: "default",
  },
];
