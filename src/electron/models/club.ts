import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export class Club extends Model {}

Club.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direction: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Clubs",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
/*
Club.addHook("beforeDestroy", async (club, options) => {
  await Member.destroy({
    //@ts-ignore
    where: { clubId: club.id },
    transaction: options.transaction,
  });
});
*/
