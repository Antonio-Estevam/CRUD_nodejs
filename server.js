const express= require('express');
const bodyParser= require('body-parser');
const mysql= require('mysql');
const handlebars= require('express-handlebars');

const app = express();
    //configurando body parser
const urlencodeParser = bodyParser.urlencoded({extended: false});  
    //Conexão Mysql
const sql = mysql.createConnection({ 
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
   // database: 'crudejs'
});
    //liberando diretorio img para usar os arquivos  
app.use('/views/img',express.static('img'));
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
    //query mysql usar a tabela nodejs 
sql.query("use crudejs");

//Template engine 
app.engine("handlebars",handlebars({defaultLayout: 'main'}));
app.set('view engine','handlebars');

//Routs and template 
app.get("/",(req,res)=>{
    //res.send("essa é mimha tela inicial!!")
    //res.sendFile(__dirname+"/test.html") reidenizando um arquivo html
   //console.log(req.params.id);pegando e passando parâmetros id?
    res.render('index');//passando parametros para a pagina 
});

//rotas para icorporar arquivos do front end
/*app.get("/script",(req,res)=>{res.sendFile(__dirname+'/js/script.js');});
  app.get("/style",(req,res)=>{ res.sendFile(__dirname+'/css/style.css');});
  */

app.get("/inserir",(req,res)=>{ res.render("inserir");});

app.get("/select/:id?",(req,res)=>{ 
    if(!req.params.id){
        sql.query("select * from user order by id asc",function(err,results,fields){
            res.render('select',{data: results});
        });
    }else{
        sql.query("select * from user where id=? order by id asc",[req.params.id],function(err,results,fields){
            res.render('select',{data: results});
        });
    }
});
    //inserindo dados 
app.post("/controllerForm",urlencodeParser,(req,res)=>{ 
        //query
   sql.query("insert into user values (?,?,?)",[req.body.id,req.body.name,req.body.age]);   
   res.render("controllerForm",{name:req.body.name});
    
});
    //deletando dado
app.get("/deletar/:id",(req,res)=>{
     sql.query("delete from user where id=?",[req.params.id]);
    res.render('deletar');
});

app.get("/update/:id",(req,res)=>{
    sql.query("select * from user where id=?",[req.params.id],(err,results,fields)=>{
     res.render('update',{id: req.params.id,name: results[0].name,age:results[0].age});
    });

});

app.post("/controllerUpdate",urlencodeParser,(req,res)=>{
    sql.query("update user set name=?,age=? where id=?",[req.body.name,req.body.age,req.body.id]);
    res.render('controllerUpdate');
});



//Strart server 
app.listen(3000,(req,res)=>{
    console.log('Servidor Rodando');    
});