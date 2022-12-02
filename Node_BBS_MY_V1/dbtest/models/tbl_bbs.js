import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_bbs",
    {
      b_seq: {
        autoIncrement: true,
        type: sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      b_date: {
        type: sequelize.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal(
          "date_format(now(),_utf8mb4\\'%Y-%M-%D\\')"
        ),
      },
      b_time: {
        type: sequelize.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal(
          "date_format(now(),_utf8mb4\\'%H:%i:%S\\')"
        ),
      },
      b_writer: {
        type: sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      b_subject: {
        type: sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      b_content: {
        type: sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      b_count: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      b_update: {
        type: sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "tbl_bbs",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "b_seq" }],
        },
      ],
    }
  );
};
