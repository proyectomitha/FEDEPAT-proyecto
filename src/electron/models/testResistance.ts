import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export class TestResistance extends Model {}
export class SerieResistance extends Model {}

TestResistance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    numberTests: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 1,
    },
    numberSeries: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 1,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "time",
    },
  },
  {
    sequelize,
    tableName: "testResistances",
    timestamps: true,
    underscored: true,
  }
);

SerieResistance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    number: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    order: {
      type: DataTypes.NUMBER,
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
    tableName: "serieResistance",
    timestamps: true,
    underscored: true,
  }
);
