const express = require("express");
const mongoose = require("mongoose");
const Staff = require("./models/staff");

const app = express();
// const router = express.Router();
// app.listen(3000);
mongoose
  .connect("mongodb://localhost:27017/staff", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000);
    console.log("Sucesso, conectado ao MongoDB");
  })
  .catch((err) => console.log(err));

// Registrar a view engine como sendo ejs
app.set("view engine", "ejs");

// middleware e arquivos estáticos (imagens, folha de estilo ...)
app.use(express.static("public")); //CSS dentro da pasta public
app.use(express.urlencoded({ extended: true })); //Necessário para enviar dados inseridos no form para o banco. Pega os dados url encodados que vem do form e trata para um objeto que podemos usar no objeto request

app.get("/", (req, res) => {
  Staff.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { funcionarios: result });
    })
    .catch((err) => console.log(err));
});

app.post("/", (req, res) => {
  const funcionario = new Staff(req.body);
  console.log(req.body);
  funcionario
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/cadastrar", (req, res) => {
  res.render("addEmployee");
});
// app.get('/', (req, res) => {
//     Staff.find()
//         .then(result => res.send(result))
//         .catch((err) => console.log(err))
// })
