const express= require('express');
const bodyParser= require('body-parser');
const mysql= require('mysql');
const handlebars= require('express-handlebars');
const app = express();

//Template engine 
app.engine("handlebars",handlebars({defaultLayout: 'main'}));
app.set('view engine','handlebars');


//Routs and template 
app.get("/:id?",(req,res)=>{
    //res.send("essa é mimha tela inicial!!")
    //res.sendFile(__dirname+"/test.html") reidenizando um arquivo html
   //console.log(req.params.id);pegando e passando parâmetros id?
    res.render('index',{id:req.params.id});//passando parametros para a pagina 


    
});

//Strart server 
app.listen(3000,(req,res)=>{
    console.log('Servidor Rodando');    
});
