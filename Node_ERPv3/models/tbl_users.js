import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_users",
    {
      Username: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      Password: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      Realname: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      Usertel: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
      },
      Nickname: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      User_role: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 9,
      },
    },
    {
      sequelize,
      tableName: "tbl_users",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "Username" }],
        },
      ],
    }
  );
};
