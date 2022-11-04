/**
 * table에 click event가 발생하면
 * 실제 선택된 td(target) 정보를 가져와서
 * td에 설정된 dataset.st_num로부터 학번을 get
 * 학번을 가지고 서버에 detail 요청하는 코드
 *
 * 문제점 : 학생정보의 td가 여러개가 있어 어떤 td를 클릭해도
 * 같은 코드가 실행되도록하려면 모든 td에 dataset을 설정해야한다
 * 즉, 같은 코드가 중복된다.
 */
const tdClickHnadlerV1 = (tag) => {
  const target = tag.target;
  if (target.tagName === "TD") {
    // tag 의 data-st_num로 설정된 항목의 값을 가져오는 코드
    const st_num = target.dataset.st_num;

    //   alert(`클릭된 TD, ${st_num}`);
    document.location.href = `/student/detail/${st_num}`;
  }
};

const tdClickHnadlerV2 = (tag) => {
  const target = tag.target; // TD요소 get
  //선택된 td를 감싸고있는 tr tag요소를 다시 get
  const parentTR = target.closest("TR");
  //   tr에 설정된 data-st_num 값 get
  const st_num = parentTR.dataset.st_num;
  //   alert(st_num);
  document.location.href = `/student/${st_num}/detail`;
};
document.addEventListener("DOMContentLoaded", () => {
  const stTable = document.querySelector("table.student.list");

  /**
   * 이벤트 버블링을 이용한 event handling의 간소화
   * 학생정보 List중에서 한 학생의 row를 클릭했을 때
   * 반응하는 event를 만들고자한다.
   * 이 때 각 row들에게 event를 부여하면 과도한 event설정이 필요
   * row들을 감싸고 있는 한개의 box를 지정하여
   * 그 box에 event핸들링을 설정하고
   * event 버블링을 활용하여 어떤 row가 클릭됐는지를 알아내어 연산수행   *
   */
  stTable?.addEventListener("click", tdClickHnadlerV2);
});
