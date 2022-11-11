import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_todayV7",
    {
      t_seq: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      t_date: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      t_time: {
        type: Sequelize.DataTypes.STRING(14),
        allowNull: false,
      },
      t_content: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      t_qty: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      t_cal: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      // tableName을 생략하면
      // Create Table 명령이 실행될 때 table이름이 복수로 실행됨
      tableName: "tbl_todayV7",

      // createAT, UpdateAT 칼럼을 생성(true, 기본값), 안하면(false)
      // timestamps: false,

      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "st_num" }],
        },
      ],
    }
  );
};
