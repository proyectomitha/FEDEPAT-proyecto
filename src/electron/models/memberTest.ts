import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export class MemberTestHability extends Model {}
export class MemberSerieReaction extends Model {}
export class MemberSerieResistance extends Model {}

MemberTestHability.init(
  {
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "memberTestHability",
    timestamps: true,
    underscored: true,
  }
);

MemberSerieReaction.init(
  {
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "memberSerieReaction",
    timestamps: true,
    underscored: true,
  }
);

MemberSerieResistance.init(
  {
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "memberSerieResistance",
    timestamps: true,
    underscored: true,
  }
);
