//  file upload를 쉽게 할 수 있도록 도와주는 middle ware선언
import multer from "multer";
import fs from "fs";
import path from "path";
// uuid의 최신 버전을 사용하기위한 import
import { v4 } from "uuid";

// 파일을 저장할 폴더 지정
// 이 폴더는 public static 방식으로 접근할 수 있어야 함
const upload_dir = path.join("public/uploads");

// 파일 업로드 설정
// filename : 파일을 저장하기 전에 전처리 (pre Processing)하는 함수 선언
//              원래 파일이름을 해킹방지하기 위해 다른 이름으로 변형
// destination : 최종 파일을 저장할 때 사용하는 함수 선언

const storageOption = {
  filename: (req, file, cb) => {
    const uuidPrefix = v4(); // uuid 문자열 생성

    // uuid-원래파일이름으로 변경
    const newfileName = Buffer.from(
      `${uuidPrefix}-${file.originalname}`,
      "latin1"
    ).toString("UTF8");

    const uploadFilename = newfileName.substring(newfileName.length - 255);
    // 새로 변경된 파일이름을 multer에 전달
    cb(null, uploadFilename);
  },
  destination: (req, file, cb) => {
    // 폴더가 없으면
    if (!fs.existsSync(upload_dir)) {
      /**
       * 만약 public/upload/images라는 폴더를 생성하려고 할 때
       * public/upload 폴더가 있으면 문제없이 images 폴더가 생성
       * 하지만 public폴더만 있고 upload폴더가 없거나
       * 또는 public폴더가 없을 경우, 폴더 생성에서 오류가 발생
       *
       * 이 때 recursive 속성을 true로 설정하면 모든 경로에 대해
       * 검사한 후 폴더가 없으면 순차적으로 모두 생성
       * nodejs 10.x 이상에서 사용
       */
      fs.mkdirSync(upload_dir, { recursive: true });
    }
    cb(null, upload_dir);
  },
};

const storage = multer.diskStorage(storageOption);
export default multer({ storage });
