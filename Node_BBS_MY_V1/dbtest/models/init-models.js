import DataTypes  from ("sequelize").DataTypes;
import _tbl_bbs  from "./tbl_bbs.js";
import _tbl_files  from "./tbl_files.js";
import _tbl_student  from "./tbl_student.js";

function initModels(sequelize) {
  var tbl_bbs = _tbl_bbs(sequelize, DataTypes);
  var tbl_files = _tbl_files(sequelize, DataTypes);
  var tbl_student = _tbl_student(sequelize, DataTypes);

  tbl_files.belongsTo(tbl_bbs, { as: "f_bseq_tbl_bb", foreignKey: "f_bseq"});
  tbl_bbs.hasMany(tbl_files, { as: "tbl_files", foreignKey: "f_bseq"});

  return {
    tbl_bbs,
    tbl_files,
    tbl_student,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
