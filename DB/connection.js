import mongoose from "mongoose";

const connection = async () => {
  return await mongoose.connect(process.env.CONNECTION_URL)
  .then((result) => {
    console.log("Connected To DB");
  })
  .catch((error) => {
    console.log("Fail To Connect To DB", error);
  });
};

export default connection; 