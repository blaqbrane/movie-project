// 'https://api.themoviedb.org/3/movie/movie_id/similar?language=en-US&page=1'



import { API_KEY } from "../constants";
import axios from "axios";
import { useState , useEffect} from "react";


const baseUrl = 'https://api.themoviedb.org/3'
const trending = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`
const upcoming = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`
const toprated = `${baseUrl}/movie/top_rated?api_key=${API_KEY}`


const FetchSimilar = (endpoint, params) => {
  const[similarData, setSimilarData] = useState([])
  const[isLoading, setIsLoading] = useState(false)
  const[error, setError] = useState(null)

  const options = {
    method: 'GET',
    url:endpoint,
    params: params? params:{},
   
  };
  
  const fetchData = async() => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setSimilarData(response.data);
    } catch (error) {
      setError(error);
      alert('There is an error')
      console.log(error)
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  // const refetch =() => {
  //   setIsLoading(true)
  //   fetchData()
  // }
  return { similarData, isLoading, error};
}
export default FetchSimilar;