import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_customer",
    {
      // c_num: {
      //   type: Sequelize.DataTypes.BIGINT,
      //   allowNull: false,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      c_id: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      c_name: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
      },
      c_tel: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
      },
      // c_date: {
      //   type: Sequelize.DataTypes.STRING(14),
      //   allowNull: false,
      // },
      c_manager: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      // c_manager_tel: {
      //   type: Sequelize.DataTypes.STRING(15),
      //   allowNull: true,
      // },
      // c_itemname: {
      //   type: Sequelize.DataTypes.STRING(125),
      //   allowNull: true,
      // },
      // c_value: {
      //   type: Sequelize.DataTypes.INTEGER,
      //   allowNull: true,
      // },
      // c_qty: {
      //   type: Sequelize.DataTypes.INTEGER,
      //   allowNull: true,
      // },
      // c_money: {
      //   type: Sequelize.DataTypes.INTEGER,
      //   allowNull: true,
      // },
      c_addr: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_customer",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "c_num" }],
        },
      ],
    }
  );
};
