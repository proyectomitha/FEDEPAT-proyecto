import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export class TestHability extends Model {}

TestHability.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "testHabilitys",
    timestamps: true,
    underscored: true,
  }
);
