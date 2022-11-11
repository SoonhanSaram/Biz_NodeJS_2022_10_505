import _tbl_customer from "./sample_model.js";
const initModels = (sequelize) => {
  const tbl_customer = _tbl_customer(sequelize);

  return {
    tbl_customer,
  };
};

export default initModels;
