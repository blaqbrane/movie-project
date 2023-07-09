import { API_KEY } from "../constants";
import axios from "axios";
import { useState , useEffect} from "react";


const baseUrl = 'https://api.themoviedb.org/3'
const trending = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`
const upcoming = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`
const toprated = `${baseUrl}/movie/top_rated?api_key=${API_KEY}`


const FetchCast = (endpoint, params) => {
  const[castData, setCastData] = useState([])
  const[isCastLoading, setIsCastLoading] = useState(false)
  const[error, setError] = useState(null)

  const options = {
    method: 'GET',
    url:endpoint,
    params: params? params:{},
   
  };
  
  const fetchData = async() => {
    setIsCastLoading(true);
    try {
      const response = await axios.request(options);
      setCastData(response.data);
    } catch (error) {
      setError(error);
      alert('There is an error')
      console.log(error)
    }finally{
      setIsCastLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  // const refetch =() => {
  //   setIsLoading(true)
  //   fetchData()
  // }
  return { castData, isCastLoading, error};
}
export default FetchCast;

// const FetchData = async(endpoint,params)  => {
//   const options ={
//     method:'Get',
//     url:endpoint,
//     params: params? params:{}
//   }
//   try{
//     const response = await axios.request(options)
//     return response.data;
//   }catch{
//     console.log('error: ' ,error)
//     return{}
//   }
// }

// export const FetchTrending = () =>{
//   return FetchData(trending)
// } 

// export const FetchUpcoming = () =>{
//   return FetchData(upcoming)
// } 
// export const FetchToprated = () =>{
//   return FetchData(toprated)
// } 