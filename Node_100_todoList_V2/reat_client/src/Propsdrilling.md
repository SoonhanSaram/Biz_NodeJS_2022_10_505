# Props Drilling

- React에서 state 변수, setState() 함수를 정의하고 사용할 때, Component가 계층적으로
  구성된 경우 중간의 Component들은 실제 state변수나, setState() 함수를 사용할 필요가
  없음에도 하위 Component에게 전달하기위해 상위 컴포넌트에서 props로 받고
  다시 하위 Component에 전달하는 것
- TodoMain에서 정의된 state를 TodoItem에서 사용하고자 할 떄 중간 TodoList가 props로
  받아 전달하는 역할을 수행한 것이 Props Drilling
- Component 계층구조가 복잡하고 깊어지는 경우 drilling 현상은 심화되므로 프로젝트
  모듈관리가 어려워 짐

## Props Drilling을 해결 방법

- React에서 Redux, mobx와 같은 외부 3rd party 라이브러리 사용해 해결했으나
  Redux, mobx는 학습하기 어려움
- Redux, mobx는 단순히 Drilling을 해결하기위한 용도로는 과함
- React에서 ContextProvider 개념을 도입해서 Drilling을 해결

## ContextProvider

- state 변수와 setState() 함수를 보관하는 `store` 역할 수행
- state 변수와 setState() 함수를 한 곳에 저장, 필요한 곳에서 사용할 수 있도록
  하는 역할
