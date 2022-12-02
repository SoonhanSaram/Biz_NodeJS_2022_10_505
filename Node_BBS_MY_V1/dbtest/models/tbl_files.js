import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_files",
    {
      f_seq: {
        autoIncrement: true,
        type: sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      f_bseq: {
        type: sequelize.DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "tbl_bbs",
          key: "b_seq",
        },
      },
      f_date: {
        type: sequelize.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal(
          "date_format(now(),_utf8mb4\\'%Y-%M-%D\\')"
        ),
      },
      f_time: {
        type: sequelize.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal(
          "date_format(now(),_utf8mb4\\'%H:%i:%S\\')"
        ),
      },
      f_original_name: {
        type: sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      f_save_name: {
        type: sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      f_ext: {
        type: sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_files",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "f_seq" }],
        },
        {
          name: "f_bbs",
          using: "BTREE",
          fields: [{ name: "f_bseq" }],
        },
      ],
    }
  );
};
