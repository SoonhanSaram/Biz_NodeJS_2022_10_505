const TD_select_ALL = ` select * from tbl_todayv3 order by t_date desc, t_time desc`;

const TD_Find_BY_ID = ` select * from tbl_todayv3 where t_seq = ?`;

const TD_Insert = `insert into tbl_todayv3(t_date, t_time, t_content, t_qty, t_cal) values (?,?,?,?,?)`;

const TD_Update = `update tbl_todayv3 set t_date = ?, t_time = ?, t_content = ?, t_qty = ?, t_cal = ? where t_seq = ?`;

const TD_Delete = `delete from tbl_todayv3 where t_seq = ?`;

//  날짜 범위별 리스트
const TD_date_list = `select * from tbl_todayv3 where t_date between ? and ? order by t_date desc, t_time desc`;

// 칼로리양 별 리스트
const TD_cal_list = `select * from tbl_todayv3 order by t_cal desc`;

// 섭취칼로리양 별 리스트

const TD_calsum_list = `select *, t_qty * t_cal as t_total from tbl_todayv3  order by (t_qty * t_cal) desc`;

const TD_Insert_OR_Update = `insert into tbl_todayv3(t_seq, t_date, t_time, t_content, t_qty, t_cal) values (?,?,?,?,?,?)
ON DUPLICATE KEY UPDATE t_seq = ?, t_date = ?, t_time = ?, t_content = ?, t_qty = ?, t_cal = ?`;
export {
  TD_select_ALL,
  TD_Find_BY_ID,
  TD_Insert,
  TD_Update,
  TD_Delete,
  TD_date_list,
  TD_cal_list,
  TD_calsum_list,
  TD_Insert_OR_Update,
};
