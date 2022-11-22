import multer from "multer";
// 폴더(디렉토리), 파일 관련된 기능을 수행하는 NodeJS 기본기능
import fs from "fs";
import path from "path";

const upload_dir = path.join("public/uploads");

const storageOption = {
  // 실제 파일을 서버의 upload.dir 폴더에 저장하는 함수
  destination: (req, file, fileup) => {
    // upload.dir경로가 없다면 만들기
    if (!fs.existsSync(upload_dir)) {
      fs.mkdirSync(upload_dir);
    }
    // 실질적으로 파일 업로드를 담당하는 multer 내부의
    // 함수 호출
    fileup(null, upload_dir);
  },
  // 파일을 업로드하기 전에 선행으로 필요한 일을 처리하는 함수
  filename: (req, file, callback) => {
    const originalname = file.originalname;
    const filePrefix = `${Date.now()} - ${Math.round(Math.random() * 1e9)}`;
    const uploadFilename = `${filePrefix}-${originalname}`;
    callback(null, uploadFilename);
  },
};
const storage = multer.diskStorage(storageOption);
const upload = multer({ storage });

export default upload;
