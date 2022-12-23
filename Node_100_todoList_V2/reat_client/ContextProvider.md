# ContextProvider

- props Drilling 문제를 극복하기 위한 React의 도구
- 기존의 Redux, mobx 를 사용하던 것을 state, setState() 함수만을 위한
  도구
- 일부에선 ContextProvider를 사용하므로 성능상 이슈가 있다고 하지만
  크게 문제 없음
- React가 버전업 되어 문제들이 해결되어 실무에서 사용해도 문제 없음

## ContextProvider 만들기

- `createContextProvider()` 함수를 사용해 Context 만들기
- 생성된 Context의 Provider 속성인 `Context.Provider`를 사용해
  확장 Component 만들기
- useContext() hook을 재정의하여 store로부터 데이터를 공급받는데
  사용하는 함수를 만듦
