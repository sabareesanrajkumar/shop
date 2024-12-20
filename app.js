const path = require("path");
const sequelize = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

sequelize
  .sync()
  .then((result) => {
    return User.findById(1);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "admin", email: "sabareesanrajkumar05@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    app.listen(3000);
  });
