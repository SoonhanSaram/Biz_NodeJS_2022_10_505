import BBsList from "./BBsList";
import "../css/BBs.css";
import PageNavi from "./PageNavi";
export const loader = async ({ params }) => {
  const pageNum = params?.pageNum || 1;
  const listLimit = params?.listLimit || 10;
  const pageNavCount = params?.pageNavCount || 10;
  const res = await fetch(
    `/api?pageNum=${pageNum}&listLimit=${listLimit}&pageNavCount=${pageNavCount}/`
  );
  const { bbsList, pagiNation } = await res.json();
  return { bbsList, pagiNation };
};
const BBsMain = () => {
  return (
    <>
      <BBsList />
      <PageNavi />
    </>
  );
};

export default BBsMain;
