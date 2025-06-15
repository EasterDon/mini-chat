import multer from "multer";
export const storage = multer.diskStorage({
    destination: () => { }
});
