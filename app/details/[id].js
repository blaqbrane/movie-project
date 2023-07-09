import React, { useState } from 'react'
import { SafeAreaView,View,Text,ScrollResponderMixin,Image,Dimensions,FlatList , ActivityIndicator} from 'react-native'
import { useSearchParams } from 'expo-router'
import {Stack, useRouter} from 'expo-router'
import HeaderBtn from '../../components/HeaderBtn'
import { ArrowLeftOnRectangleIcon , HeartIcon} from 'react-native-heroicons/outline'
import tw from 'twrnc'
import { ScrollView } from 'react-native-gesture-handler'
import icons from '../../constants/icons'
import { data } from '../../components/UpcomingMovie'
// import LinearGradient from 'react-native-linear-gradient'
import { LinearGradient } from 'expo-linear-gradient';
import TopCast from '../../components/cards/TopCast'
import TopCard from '../../components/cards/TopCard'

const title = 'Game of thrones bbdhbhbdbhhbd hbhbhdb hbhbd'
import { API_KEY } from '../../constants'
import UseFetch from '../../useFetch/FetchData';
import FetchCast from '../../useFetch/FetchCast'
import FetchSimilar from '../../useFetch/FetchSimilar'
import { checkImageURL } from '../../utils'

var{width, height} = Dimensions.get('window');
 const New = icons.HeartIcon
const VideoDetails = () => {
  const[isLike, setIsLike] = useState(false)
  const router = useRouter()
  const params = useSearchParams()
  const baseUrl = 'https://api.themoviedb.org/3'
  const details = `${baseUrl}/movie/${params.id}?api_key=${API_KEY}`
  const casts = `${baseUrl}/movie/${params.id}/credits?api_key=${API_KEY}`
  const similar = `${baseUrl}/movie/${params.id}/similar?api_key=${API_KEY}`
  const{data,isLoading,error} = UseFetch(details)
  const{castData, isCastLoading} = FetchCast(casts)
  const{similarData} = FetchSimilar(similar)
  const imgs = `https://image.tmdb.org/t/p/w500${data?.backdrop_path}`

  // 'https://api.themoviedb.org/3/movie/movie_id?language=en-US'
  // 'https://api.themoviedb.org/3/movie/movie_id/similar?language=en-US&page=1'


  const handleClick = (item) => {
    router.push(`/cast-profile/${item}`)
  }
  const handlePress =(item) =>{
    router.push(`/details/${item}`)
  }
  return (
    <SafeAreaView style={tw`flex-1 bg-[#333333] text-white`}>
      <Stack.Screen
      options={{
        headerBackVisible:false,
        headerLeft:() => (<HeaderBtn Iconurl={<ArrowLeftOnRectangleIcon style={{ color:'yellow'}} size={32}/>} handlePress={() => router.back()}/>),
        headerRight:() => (<HeaderBtn Iconurl={isLike ?  <New style={{ color:'red'}} size={32}/>   :<HeartIcon style={{ color:'red'}} size={32}/>} handlePress={() => setIsLike(!isLike)}/>  ),
        headerTitleAlign:'center',
        headerStyle:{backgroundColor : '#333333'},
        headerTitle:'',
        headerShadowVisible:false,
      }}
      />
       {/* {
       isLoading ? (
        <View style={tw`flex-1 justify-center`}>
          <ActivityIndicator size='large' color={'coral'}/>
        </View>
       ):(
        
       )
     } */}
      {
       isLoading ? (
        <View style={tw`flex-1 justify-center`}>
          <ActivityIndicator size='large' color={'coral'}/>
        </View>
       ):(
        
        <ScrollView style={tw` `}>
    
        
        <View style={tw`relative`}>
          
          <Image
         source={{uri: checkImageURL(imgs) ? imgs : 'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'}}
          resizeMode='cover'
          style={{width, height: height * 0.55}}
          />
          {/* <View style={tw`absolute top-0 left-0 w-full bg-[#333333] h-full`}/> */}
          <LinearGradient
          colors={['transparent', 'rgba(51,51,51,0)', 'rgba(51,51,51, 1)']}
          style={{width, height: height * 0.40 , position:'absolute', bottom:0}}
          start={{x:0.5,y:0}}
          end={{x:0.5,y:1}}
          
          />
  
     
            <View style={tw`absolute z-10 bottom-0 text-center w-full justify-center items-center text-3xl text-white`}>
            <Text style={tw` text-3xl text-white`}>{data?.original_title}</Text>
            <Text style={tw` text-sm text-white`}>Released-{data?.release_date}</Text>
            <Text style={tw` text-sm text-white gap-x-3 m-3`}>{data?.genres?.map((item) => (<Text style={tw`m-3`} key={item.id}>{item.name}. </Text>))} </Text>
            </View>
        </View>
        <View style={tw`px-2 mt-4 mb-6`}>
          <Text style={tw`text-white`}>{data?.overview}</Text>
        </View>
        <View  style={tw`px-2 mb-1`}>
          <Text style={tw`text-white font-bold text-xl mb-4`}>Top Cast</Text>
                  {
              isCastLoading ? (
                <View style={tw`flex-1 justify-center`}>
                  <ActivityIndicator size='large' color={'coral'}/>
                </View>
              ): castData?.cast?.length < 1 ? (<Text style={tw`text-center text-neutral-400`}>No Cast!!!</Text>) :(
                <View style={tw`flex flex-row mb-2 gap-x-6`}>
                <FlatList
                data={castData?.cast}
                renderItem={({item}) => (
                  <TopCast item={item} key={item} handleClick={() => router.push(`/cast-profile/${item.id}`)}/>
                )}
                horizontal
                contentContainerStyle={{columnGap:20}}
                keyExtractor={item => item?.id}
                />
              </View>
              )
            }
          
        </View>
        <View style={tw`px-2 `}>
          <Text style={tw`mb-2 text-white font-bold text-xl`}>Similar Movies</Text>
          <FlatList
            data={similarData?.results}
            renderItem={({item}) => (
              <TopCard icons={item} title={title}  key={item?.id} handlePress={handlePress}/>
            )}
            horizontal
            contentContainerStyle={{columnGap:20}}
            keyExtractor={item => item?.id}
            />
  
        </View>
        </ScrollView>
       )
     }
     

    </SafeAreaView>
  )
}

export default VideoDetails;