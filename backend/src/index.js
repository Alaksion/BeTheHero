const express = require('express');
const app = express();
const router = require("./routes")
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(router)






app.listen(8081, ()=>{console.log('Servidor Rodando na porta 8081')});
