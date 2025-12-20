import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export class Member extends Model {}

Member.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    clubId: {
      type: DataTypes.UUID,
      allowNull: true, // importante para paranoid
      field: "club_id",
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Members",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
