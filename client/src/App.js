import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
function App() {

const [movieName, setMovieName]= useState('');
const [review, setReview]= useState('');
const [movieReviewList, setMovieList]=useState([]);
const [newreview,setNewReview]=useState('');


useEffect(() => {
  Axios.get('http://localhost:3001/api/get').then((response) => {
    setMovieList(response.data);
  });
},[])

const submitReview=()=>{
  Axios.post('http://localhost:3001/api/insert', {
  movieName: movieName,
  movieReview: review
})
  setMovieList([...movieReviewList,
    {movieName: movieName, movieReview: review}]);
};

const deleteReview=(movieName)=>{
  Axios.delete(`http://localhost:3001/api/delete/${movieName}`)
}

const updateReview=(movieName)=>{
  Axios.put("http://localhost:3001/api/update/", {
    movieName:movieName ,
    movieReview: newreview
  });
  setNewReview('');
}

  return (
    <div className="App">
      <h1>Register Application</h1>
      <div className="form">
        <label>Movie Name:</label>
      <input type="text" name="moviename" onChange={(e)=>{
  setMovieName(e.target.value)
    }} />
      <label>Review:</label>
      <input type="text" name="review" onChange={(e)=>{
  setReview(e.target.value)
}} /> 

      <button onClick={submitReview}>Submit</button>
     
     
      {movieReviewList.map((val)=>{
       return <div className="card">
         <h1> MovieName: {val.movieName} </h1>
        <p>{val.movieReview}</p>
        <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
        <input type='text' id='updateInput' onChange={(e)=> {
          setNewReview(e.target.value)}}/>
        <button onClick={()=>{updateReview(val.movieName)}}>Update</button>
        </div>
  
      })}


      </div>
    </div>
  );
}

export default App;
