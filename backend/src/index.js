import {app} from './app.js'
import dotenv from "dotenv";
import connectDB from './db/index.js'
dotenv.config({
  path: "./.env",
});

const PORT=process.env.PORT ||3000;

connectDB()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

})
.catch((err)=>{
  console.log("Error from Database connection : ", err);
})





 