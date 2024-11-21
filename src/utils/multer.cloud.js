import multer, {diskStorage} from "multer";
export const fileValidation={images: ["image/png", "image/jpeg"], pdf: ["application/pdf"]};

export const fileUpload= (filterArray)=>{
    const filefilter=  (req, file, cb)=>{
        if(!filterArray.includes(file.mimetype)){
            return cb(new Error("invalid format"), false)
        }     
        return cb(null, true)
    };
    return multer({storage:diskStorage({}),filefilter});
};