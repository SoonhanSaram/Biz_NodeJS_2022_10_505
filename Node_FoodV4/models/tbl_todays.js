import Sequelize from "sequelize";

/**
 * Model :
 * Sequelize를 통해서 DBMS와 연결, CRUD실행을 하기위해
 * tbl_todayv3 table 정보를 설정
 */
const todayTableConfig = {
  t_seq: {
    autoIncrement: true, // Auto_increment 설정
    allowNull: false, // false: Not Null. true Default Null
    primaryKey: true, //PK설정
    type: Sequelize.DataTypes.BIGINT, // MySQL BIGINT
  },
  t_date: {
    type: Sequelize.DataTypes.STRING(10), // VARCHAR(10)
    allowNull: false,
  },
  t_time: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING(14),
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
};
const tbl_define = (sequelize) => {
  // todayTableConfig 구조로 "tbl_todayv3"를 만들라
  return sequelize.define("tbl_todayv3", todayTableConfig, {
    tableName: "tbl_todayv3",
    timestamps: false,
  });
};

export default tbl_define;
