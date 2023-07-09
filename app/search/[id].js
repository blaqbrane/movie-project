import { View ,Text, Dimensions, SafeAreaView,ScrollView,Image, ActivityIndicator} from 'react-native';
import { useState,useEffect } from 'react';
import { useRouter,Stack } from 'expo-router';
import HeaderBtn from '../../components/HeaderBtn';
import tw from 'twrnc'
import {
  ArrowLeftOnRectangleIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import SearchBtn from '../../components/SearchBtn';
import icons from '../../constants/icons';
import TopCard from '../../components/cards/TopCard';
import UseFetch from '../../useFetch/FetchData';
import { API_KEY } from '../../constants';
import FetchSearch from '../../useFetch/FetchSearch';



const{height,width} = Dimensions.get('window')


// https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1'
const SearchedMovies = ( ) =>{

  const[searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const baseUrl = 'https://api.themoviedb.org/3'
  const movie_search = `${baseUrl}/search/movie?api_key=${API_KEY}`
  const{data,isLoading,refetch,error} = FetchSearch(movie_search,{query: searchTerm, include_adult: 'false', language: 'en-US', page: '1'})

  return(
   <SafeAreaView style={tw`bg-[#333333] flex-1 px-6`}>
    <Stack.Screen
    options={{
      headerBackVisible:false,
      headerShadowVisible:false,
      headerLeft:() => (<HeaderBtn Iconurl={
        <ArrowLeftOnRectangleIcon
          style={{ color: "yellow" }}
          size={32}
        />
      }
      handlePress={() => router.back()}/>),
      headerTitle:'',
      headerRight:() => (<SearchBtn refetch={refetch} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>),
      headerStyle:{backgroundColor : '#333333'}
    }}
    />
     <ScrollView >
     <Text style={tw`text-white text-center mt-4 text-xl`}>Search Result({data && data?.results?.length}) for {searchTerm} </Text>
     {
      isLoading ? (
        <View style={tw`flex flex-col min-h-100 items-center justify-center`}>
         <ActivityIndicator size='large' color={'coral'}/>
       </View>
      ):(
        
          data && data?.length < 1 ? (
            <View style={tw`mt-20`}>
            <Image
            source={icons?.bubs}
            style={{width : width* 1 , height: height * 0.5}}
            />
          </View>
          ):(
            <View style={tw`flex flex-wrap flex-row gap-x-6`}>
        
          {
            data?.results.map((item) => (
              <TopCard icons={item} key={item.id} title={item.title} handlePress={() => router.push(`/details/${item?.id}`)}/>
            ))
          }
        </View>
          )
        
      )
     }
      
     </ScrollView>
   </SafeAreaView>
  )
}
export default SearchedMovies;