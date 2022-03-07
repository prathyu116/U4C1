const express = require("express");
const app = express();
app.use(logger);
app.get("/books", (req, res) => {
  res.send({  route: req.path });
});
app.get("/libraries",checkPermission("librarian"), (req, res) => {
  res.send({ route: req.path, permission: req.permission });
});
app.get("/authors", checkPermission("author"),(req, res) => {
  res.send({  route: req.path, permission: req.permission });
});

function checkPermission(role){
  return  function logger(req,res,next){
         if(role=='author'){
            req.permission = true;
             return next()
         }
         if(role=='librarian'){
            req.permission = true;
             return next()
         }
    }
}



function logger(req, res, next) {
  console.log(req.path);
  if (req.path === "/libraries") {
      req.route=req.path
  }
  if (req.path === "/authors") {
    req.route=req.path
  }
  if (req.path === "/books") {
    req.route=req.path
  }
  next();
}

app.listen(5000, () => {
  console.log("listening port 5000");
});
