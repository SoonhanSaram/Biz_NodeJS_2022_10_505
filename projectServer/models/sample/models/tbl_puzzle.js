import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_puzzle",
    {
      P_num: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      puzzle_name: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      play_time: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_puzzle",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "P_num" }],
        },
      ],
    }
  );
};
