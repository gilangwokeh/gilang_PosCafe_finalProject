import sequelize from "../koneksi";
import { DataTypes } from "sequelize";

const orders = sequelize.define('orders',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    tiket_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    response_midtrans: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  },
  {
    timestamp: true,
    freezeTableName: true
  }
)

export default orders