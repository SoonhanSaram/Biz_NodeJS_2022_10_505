# JS의 모듈

- JS 코드를 다른 파일에 모아서 분리하고 사용 시 import 해 사용할 수 있도록 하는 기능

## 모듈 코드

- 모듈코드는 변수, 함수, 클래스 등을 한 개의 파일로 작성한 후
  다른 모듈에서 import 하고 사용할 수 있도록 만드는 코드
- 모듈에서는 생성한 변수, 함수, 클래스 등을 export 를 해줘야 한다.
- 모든 모듈에는 `export default` 항목이 있어야 한다.
- 변수, 함수, 클래스를 객체로 묶어 `export` 할 수 있다
- 최근 작성되는 모듈에는 `export default` 와 개별 변수, 함수, 클래스를 객체로
  묶어 `export` 하는 코드를 같이 사용

## export 변수 함수 선언

- 변수와 함수를 선언하면서 개별적인 이름으로 export 하기
- import 하는 곳에서는 이 코드를 정해진 이름으로 구조분해 해 import

### export 하기

```js
export const 변수 = 값;
export const 함수 = () => {};
```

### 한번에 Import 하기

- 반드시 export 한 이름으로 `import` 해야 함
- 필요한 변수, 함수만 개별적으로 `import` 할 수 있다

```js
import { 변수, 함수 } from "모듈.js";
```

## export default 하기

- 모듈에서 선언한 변수, 함수, 객체를 모아 export 하기

### 모아서 한번에 export 하기

```js
export default { 변수1, 변수2, 함수1, 함수2 };
```

- 한번에 import 해 사용

```js
import name from "모듈.js";
```

- `import` 한 모듈의 변수, 함수 `구조분해` 하기
- 필요에 따라 사용할 변수, 함수 등만 `구조분해` 하기

```js
const { 변수1, 변수2, 함수1, 함수2 } = name;
```
