import { View,Text,FlatList } from "react-native";
import tw from 'twrnc'
import UpcomingCard from "./cards/UpcomingCard";
import { useRouter } from "expo-router";
import TopCard from "./cards/TopCard";
import icons from "../constants/icons";
import UseFetch from "../useFetch/FetchData";
import { API_KEY } from "../constants";
const baseUrl = 'https://api.themoviedb.org/3'
const toprated = `${baseUrl}/movie/top_rated?api_key=${API_KEY}`

// const data = [1,2,3,4,5]
// const title = 'Game of thrones bbdhbhbdbhhbd hbhbhdb hbhbd'

const TopMovie =() => {
  const{data,isLoading, error} = UseFetch(toprated)
  const router = useRouter();
 

  const handlePress = (item) => {
    router.push(`/details/${item}`)
  }
  return (
    <View>
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`text-white`}>Top Rated</Text>
        <Text style={tw`text-yellow-300`}>See All</Text>
      </View>
      <FlatList
      data={data?.results}
      renderItem={({item}) => (<TopCard icons={item} key={item?.id} handlePress={handlePress}/>)}
      horizontal
      contentContainerStyle={{columnGap: 20}}
      keyExtractor={item => item?.id}
      // keyExtractor={item}
      />
    </View>
  )
}
export default TopMovie;