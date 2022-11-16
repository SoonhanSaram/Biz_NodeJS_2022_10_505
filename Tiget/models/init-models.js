var DataTypes = require("sequelize").DataTypes;
var _tbl_buyer = require("./tbl_buyer");
var _tbl_iolist = require("./tbl_iolist");
var _tbl_product = require("./tbl_product");
var _tbl_student = require("./tbl_student");
var _tbl_users = require("./tbl_users");

function initModels(sequelize) {
  var tbl_buyer = _tbl_buyer(sequelize, DataTypes);
  var tbl_iolist = _tbl_iolist(sequelize, DataTypes);
  var tbl_product = _tbl_product(sequelize, DataTypes);
  var tbl_student = _tbl_student(sequelize, DataTypes);
  var tbl_users = _tbl_users(sequelize, DataTypes);


  return {
    tbl_buyer,
    tbl_iolist,
    tbl_product,
    tbl_student,
    tbl_users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
