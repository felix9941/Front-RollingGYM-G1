import React from "react";
import PropTypes from "prop-types";
import styles from "../css/Tablas.module.css";

const DynamicTable = ({
  columns,
  data,
  onToggle,
  onDelete,
  onAccion,
  onEdit,
}) => {
  const renderCellContent = (column, item) => {
    const value = item[column.key];

    switch (column.type) {
      case "image":
        return (
          <img src={value} alt={column.header} style={{ height: "50px" }} />
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={() => onToggle(item)}
          />
        );
      case "delete":
        return (
          <button className={styles.buttonTable} onClick={() => onDelete(item)}>
            Eliminar
          </button>
        );
      case "accion":
        return (
          <button className={styles.buttonTable} onClick={() => onAccion(item)}>
            {`${column.key}`}
          </button>
        );
      case "edit":
        return (
          <button className={styles.buttonTable} onClick={() => onEdit(item)}>
            Editar
          </button>
        );
      default:
        if (Array.isArray(value)) {
          return value.join(", ");
        }
        return value;
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableC}>
        <thead>
          <tr className={styles.trHeadC}>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={styles.trC}>
              {columns.map((column) => (
                <td key={column.key} className={styles.tdC}>
                  {renderCellContent(column, item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DynamicTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
  onAccion: PropTypes.func,
  onEdit: PropTypes.func,
};

export default DynamicTable;
