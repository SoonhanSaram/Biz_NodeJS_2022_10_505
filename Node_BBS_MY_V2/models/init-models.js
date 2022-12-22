import _tbl_bbs from "./tbl_bbs.js";
import _tbl_files from "./tbl_files.js";

function initModels(sequelize) {
  var tbl_bbs = _tbl_bbs(sequelize);
  var tbl_files = _tbl_files(sequelize);

  // fk 만드는 법
  /**
   * bbs:files = 1:N의 관계 설정
   * asoociation
   */
  tbl_files.belongsTo(tbl_bbs, { as: "fk_bbs", foreignKey: "f_bseq" });
  tbl_bbs.hasMany(tbl_files, { as: "m_files", foreignKey: "f_bseq" });

  return {
    tbl_bbs,
    tbl_files,
  };
}
export default initModels;
