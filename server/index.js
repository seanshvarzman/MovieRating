//Where the server will run with express
//creating express server

const express = require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app = express()
const mysql = require('mysql')

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sean0342591', //Importent to pay attention to that!!!
    database:  'cruddatabase'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req,res)=>{
    const sqlSelect="SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err,result)=>{
       res.send(result);
    })
})

 app.post('/api/insert', (req,res)=>{

    const movieName=req.body.movieName;
    const movieReview=req.body.movieReview;
   const sqlinsert="INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)"
    db.query(sqlinsert,[movieName,movieReview], (err,res)=>{
       console.log(err);
    })
 })

 app.delete('/api/delete/:movieName', (req,res)=>{
     const name=req.params.movieName;
     const sqlDelete="DELETE FROM movie_reviews WHERE movieName = ?";
     db.query(sqlDelete,name, (err,res)=>{
      if(err) console.log(err);
     })
 })
 

 app.put('/api/update', (req,res)=>{
    const name=req.body.movieName;
    const review=req.body.movieReview;
    const sqlUpdate=" UPDATE movie_reviews SET movieReview = ? WHERE movieName= ?";
    db.query(sqlUpdate,[review,name], (err,res)=>{
     if(err) console.log(err);
    })
})

app.listen(3001, () => {
    console.log('running on port 3001');
});
