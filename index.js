import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {Productos}  from './utils/productos'

const http = express();

http.use(express.static('./public'))
http.use(express.json());
http.set('views','./pug')
http.set('view engine','pug')



http.get('/pug',(req,res)=>{
    res.render('index.pug',{})
})
http.get('/pug/productos/vista',async (req,res)=>{
    let productos = Productos.getItems();
    res.render('productos.pug',{productos})
})

http.set('views','./ejs')
http.set('view engine','ejs')

http.get('/ejs',(req,res)=>{
    res.render('index.ejs',{})
})
http.get('/ejs/productos/vista',async (req,res)=>{
    let productos = Productos.getItems();
    res.render('productos.ejs',{productos})
})



const PORT = process.env.PORT||8080;

const server = http.listen(PORT,()=>{
    console.log(`Aplicacion en puerto ${PORT}`);
})

import {productos} from './routes'

http.use('/api/productos',productos)