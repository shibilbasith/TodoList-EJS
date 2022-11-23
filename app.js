//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const date = require(__dirname + "/date.js");

const app = express(); //calling express and assign to app

// let items = ['Welcome to your todolist','Hit the + button to add a new item','<- Hit this to delete an item'];
// let workItems = [];

app.set('view engine', 'ejs');//to use ejs on express

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

//connect mongoDb local database
// mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

//using mongoDb Atlas server
mongoose.connect("mongodb+srv://shibil:shibil123@cluster0.u5aebd5.mongodb.net/todolistDB", { useNewUrlParser: true });

//adding mongoose schema
const itemsSchema = {
  name: String
};

//adding mongoose model
const item = mongoose.model("item", itemsSchema);

//mongoose Document
const item1 = new item({
  name: "Welcome to your todolist!"
});

const item2 = new item({
  name: "Hit the + button to add a new item"
});

const item3 = new item({
  name: "<- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];



app.get("/", function (req, res) {

  item.find({}, function (err, foundItems) {

    if (foundItems.length === 0) {
      //inserting data into database collection
      item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfullty saved default items to database");
        }

      });
      res.redirect("/");
    } else {
    res.render("list", { listTitle: day, newListItems: foundItems });
    }
  });

  let day = date.getDay();
  //assign day from js to list.ejs variable KindOfDay

});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const items = new item({
    name: itemName
  });

  items.save();

  res.redirect("/");


});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;

  item.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    }
  })

})

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "work List", newListItems: workItems });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work")
});

app.listen(8000, function () {
  console.log("server started on port 8000");
});

















// var currentDay = today.getDay();
// var day = "";
//
// switch (currentDay) {
//   case 0:
//     day = "sunday";
//     break;
//     case 1:
//       day = "monday";
//       break;
//       case 2:
//         day = "tuesday";
//         break;
//         case 3:
//           day = "wednesday";
//           break;
//           case 4:
//             day = "Thursday";
//             break;
//             case 5:
//               day = "Friday";
//               break;
//               case 6:
//                 day = "Saturday";
//                 break;
//
//   default:
//     console.log("Error: current day is equal to:" + currentDay);
// }
