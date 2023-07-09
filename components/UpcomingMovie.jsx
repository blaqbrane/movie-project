import { View,Text,FlatList } from "react-native";
import tw from 'twrnc'
import UpcomingCard from "./cards/UpcomingCard";
import { useRouter } from "expo-router";
import icons from "../constants/icons";
import UseFetch from "../useFetch/FetchData";
import { API_KEY } from "../constants";
const baseUrl = 'https://api.themoviedb.org/3'
const upcoming = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`


const UpcomingMovie =() => {
  const{data,isLoading, error} =UseFetch(upcoming)
  const router = useRouter();

  const handlePress = (item) => {
    router.push(`/details/${item}`)
  }
  return (
    <View>
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`text-white`}>Upcoming</Text>
        <Text style={tw`text-yellow-300`}>See All</Text>
      </View>
      <FlatList
      data={data.results}
      renderItem={({item}) => (<UpcomingCard item={item} key={item?.id} handlePress={handlePress}/>)}
      horizontal
      contentContainerStyle={{columnGap: 20}}
      keyExtractor={item => item?.id}
      />
    </View>
  )
}
export default UpcomingMovie;