// import Sequelize from "sequelize";
import today_model from "./tbl_todays.js";

// Sequelize를 사용하여 DB table을 관리하는 도구
const initModels = (sequelize) => {
  const tbl_today = today_model(sequelize);
  return { tbl_today };
};

export default initModels;
