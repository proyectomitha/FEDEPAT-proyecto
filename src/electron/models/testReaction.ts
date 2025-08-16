import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export class TestReaction extends Model {}
export class SerieReaction extends Model {}

TestReaction.init(
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
    divisor: {
      type: DataTypes.NUMBER,
      allowNull: false,
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
    tableName: "testReactions",
    timestamps: true,
    underscored: true,
  }
);

SerieReaction.init(
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
    tableName: "serieReaction",
    timestamps: true,
    underscored: true,
  }
);
