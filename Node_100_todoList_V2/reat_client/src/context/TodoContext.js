import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { InitData } from "../data/InitData";
import moment from "moment";

// TodoContext : store
const TodoContext = createContext();

// useTodoContext() : 공급자
const useTodoContext = () => {
  return useContext(TodoContext);
};

// store 관리자
const TodoContextProvider = ({ children }) => {
  const [todoContentList, setContentList] = useState([]);
  const [todoContent, setTodoContent] = useState(InitData());

  /**
   * 프로젝트가 서버로 데이터를 가져와서 최초 렌더링하기
   *
   * useEffect()
   * 사용자 정의 event 만들기
   * state 변수들이 변동되었을 때, 자동으로 실행되는 코드
   * todoContent state변수가 어디선가 값이 변경되면
   * 감지해 실행되는 코드
   * useEffect(() => console.log("시작하기"), [todoContent]);
   */

  /**
   * useEffect()를 빈 매개변수([])인 상태로
   * 작성하면 최초화면이 렌더링될 때 자동으로 실행
   * didMount 생명주기에 실행되는 event
   */

  /**
   * 서버로부터 데이터를 가져오는 callBack 함수
   * 원래는 useEffect() 에서 서버데이터를 fetch하면되나
   * 내부 엔진문제로인해 정상적으로 작동되지 않거나
   * 무한 반복 실행된다
   * fetch하는 callBack함수를 별도로 만들고
   * useEffect() 에서 callBack함수를 호출, 실행
   */
  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch("/todo");
      const result = await res.json();
      if (result.error) {
        alert(result.error);
        setContentList([]);
      }
      setContentList([...result]);
    } catch (error) {
      alert("서버 접속 오류");
      setContentList([]);
    }
  }, [setContentList]);

  useEffect(() => {
    (async () => {
      await fetchAll();
    })();
  }, [fetchAll]);

  const todoInsert = useCallback(
    async (t_content) => {
      let data = { ...InitData(), t_content };
      let url = "/todo/insert";
      let method = "POST";

      if (Number(todoContent.id) !== 0) {
        data = todoContent;
        url = "/todo/update";
        method = "PUT";
      }

      const fetchOption = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      try {
        const res = await fetch(url, fetchOption);
        const result = await res.json();

        if (result.error) {
          alert(result.error);
          return false;
        } else {
          setContentList([...result]);
        }
        setTodoContent({ ...InitData() });
      } catch (error) {
        console.log(error);
        alert("서버오류");
      }
    },
    [todoContent, setContentList, todoContentList]
  );

  const todoDelete = useCallback(async (id) => {
    try {
      const res = await fetch(`/todo/delete/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.error) {
        alert(result.error);
        return false;
      } else {
        setContentList([...result]);
      }
    } catch (err) {
      console.log(err);
      alert("전송오류");
    }
  }, []);
  const todoComplete = useCallback(
    async (uid) => {
      try {
        const res = await fetch(`/todo/complete/${uid}`, { method: "put" });
        const result = await res.json();
        if (result.error) {
          return alert("서버오류");
        }
        setContentList([...result]);
      } catch (error) {
        alert("서버 오류");
      }
    },
    [setContentList]
  );

  /*
  const todoComplete = useCallback((uid) => {
    const completeList = todoContentList.map((item) => {
      if (item.id === uid) {
        item.e_date = item.e_date ? "" : moment().format("YYYY[-]MM[-]DD");
        item.e_time = item.e_time ? "" : moment().format("HH:mm:dd");
      }
      return item;
    });
    setContentList(completeList);
  });
  */
  const todoEditor = (uid) => {
    const editorList = todoContentList.filter((item) => {
      return Number(item.id) === Number(uid);
    });
    setTodoContent({ ...editorList[0] });
    console.log(editorList[0]);
  };
  const props = {
    todoContent,
    setTodoContent,
    todoContentList,
    setContentList,
    todoInsert,
    todoComplete,
    todoDelete,
    todoEditor,
  };

  return <TodoContext.Provider value={props}>{children}</TodoContext.Provider>;
};
export { TodoContextProvider, useTodoContext };
