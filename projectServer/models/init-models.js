import _tbl_puzzle from "./tbl_puzzle.js";
const initModels = (sequelize) => {
  const tbl_puzzle = _tbl_puzzle(sequelize);

  return {
    tbl_puzzle,
  };
};

export default initModels;
