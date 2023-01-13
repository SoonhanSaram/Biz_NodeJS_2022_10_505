var DataTypes = require("sequelize").DataTypes;
var _tbl_puzzle = require("./tbl_puzzle");

function initModels(sequelize) {
  var tbl_puzzle = _tbl_puzzle(sequelize, DataTypes);


  return {
    tbl_puzzle,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
