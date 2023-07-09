import { API_KEY } from "../constants";
import axios from "axios";
import { useState , useEffect} from "react";

const baseUrl = 'https://api.themoviedb.org/3'

const UseFetch = (endpoint, params) => {
  const[data, setData] = useState([])
  const[isLoading, setIsLoading] = useState(false)
  const[error, setError] = useState(null)

  const options = {
    method: 'GET',
    url:endpoint,
    params: params ? params:{},
   
  };
  
  const fetchData = async() => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
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

  return { data,setIsLoading, isLoading, error};
}
export default UseFetch;

