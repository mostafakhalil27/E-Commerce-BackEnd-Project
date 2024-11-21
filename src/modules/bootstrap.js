import authRouter from "./user/user.router.js";
import categoryRouter from "./category/category.router.js";
import subCategoryRouter from "./subCategory/subCategory.router.js";
import brandRouter from "./brand/brand.router.js";
import productsRouter from "./product/product.router.js";
import couponRouter from "./coupon/coupon.router.js";
import cartsRouter from "./carts/carts.router.js";
import orderRouter from "./order/order.router.js";
import connection from "../../DB/connection.js";


function bootsrtap (express, app) {
      app.use(express.json());
      //routes
      //user
      app.use("/auth", authRouter);
      //category
      app.use("/category", categoryRouter);
      //subCategory
      app.use("/subCategory", subCategoryRouter);
      //brand
      app.use("/brand",brandRouter);
      //product
      app.use("/products",productsRouter);
      //coupon
      app.use("/coupon",couponRouter);
      //carts
      app.use("/carts",cartsRouter);
      //order
      app.use("/order",orderRouter);
      
      //CORS
      const whitelist= ["http://127.0.0.1:5500"];
      app.use((req, res, next)=>{
          //activate account api
          if(req.originlUrl.includes("/auth/confirmEmail")){
              res.setHeader("Access-Control-Allow-Origin","*");
              res.setHeader("Access-Control-Allow-Methods","GET");
              return next();
          };
          if(!whitelist.includes(req.header("origin"))){
              return next(new Error("Blocked By CROS"));
          };
          res.setHeader("Access-Control-Allow-Origin","*");
          res.setHeader("Access-Control-Allow-Headers","*");
          res.setHeader("Access-Control-Allow-Methods","*");
          res.setHeader("Access-Control-Allow-Private-Network",true);
          return next();
      })
      //not found router
      app.all("*", (req, res, next)=>{
          return next(new Error("page not found", {cause: 404}))
      });
      //global erroe handeler
      app.use((error, req, res, next)=>{
          res.status(error.cause || 500).json({success: false, message: error.message, stack: error.stack})
      })
      connection();
};

export default bootsrtap;