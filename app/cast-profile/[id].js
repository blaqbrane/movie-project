import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import { useState } from "react";
// import { casts } from "../details/[id]";
import { useSearchParams, useRouter, Stack } from "expo-router";
import HeaderBtn from "../../components/HeaderBtn";
import icons from "../../constants/icons";
import tw from "twrnc";
import {
  ArrowLeftOnRectangleIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import TopMovie from "../../components/TopMovie";
import TopCard from "../../components/cards/TopCard";
var { width, height } = Dimensions.get("window");
const New = icons.HeartIcon;

 //person-credits 'https://api.themoviedb.org/3/person/person_id?language=en-US
// person-credits-movies 'https://api.themoviedb.org/3/person/person_id/movie_credits?language=en-US'

import { API_KEY } from "../../constants";
import UseFetch from "../../useFetch/FetchData";
import FetchSimilar from "../../useFetch/FetchSimilar";
import { checkImageURL } from "../../utils";


const CastProfile = () => {
  const [isLike, setIsLike] = useState(false);
  const [directedM, setDirectedM] = useState([1,2,3,4,5]);
  const params = useSearchParams();
  const router = useRouter();

  const baseUrl = 'https://api.themoviedb.org/3'
  const cast_detail = `${baseUrl}/person/${params.id}?api_key=${API_KEY}`
  const cast_movies = `${baseUrl}/person/${params.id}/movie_credits?api_key=${API_KEY}`
  const{data,isLoading,error} = UseFetch(cast_detail)
  const{similarData} = FetchSimilar(cast_movies)
  // const specific_cast = casts.find(
  //   (item) => item.id === parseInt(params.id, 10)
  // );
  console.log(similarData)
  const imgs = `https://image.tmdb.org/t/p/w500${data?.profile_path}`

  const handlePress =(item) =>{
    router.push(`/details/${item}`)
  }
  return (
    <SafeAreaView style={tw`flex-1 bg-[#333333]`}>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#333333" },
          headerLeft: () => (
            <HeaderBtn
              Iconurl={
                <ArrowLeftOnRectangleIcon
                  style={{ color: "yellow" }}
                  size={32}
                />
              }
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <HeaderBtn
              Iconurl={
                isLike ? (
                  <New style={{ color: "red" }} size={32} />
                ) : (
                  <HeartIcon style={{ color: "red" }} size={32} />
                )
              }
              handlePress={() => setIsLike(!isLike)}
            />
          ),
        }}
      />

      {
       isLoading ? (
        <View style={tw`flex-1 justify-center`}>
          <ActivityIndicator size='large' color={'coral'}/>
        </View>
       ):(
        
        <ScrollView style={tw`px-4`}>
        <View style={tw`flex flex-col justify-center items-center mt-6 ` }>
          <View style={styles.images_container}>
            <Image
             source={{uri: checkImageURL(imgs) ? imgs : 'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'}}
              resizeMode="cover"
              style={tw`rounded-full w-full h-full`}
            />
          </View>
          <Text style={tw`text-white text-2xl mt-3`}>
           {data?.name} 
          </Text>
          
          <Text style={tw`text-neutral-600 text-sm `}>
            Guaitama City,Guaitamata{params.id}
          </Text>
        </View>

        <View
          style={tw`flex flex-row bg-neutral-500 p-4 rounded-full justify-between mt-4`}
        >
          <View style={tw`border-r border-neutral-400 px-3`}>
            <Text style={tw`text-white`}>Gender</Text>
            <Text style={tw`text-neutral-700`}>{data?.gender === 1 ? 'Female' :'Male'}</Text>
          </View>
          <View style={tw`border-r  border-neutral-400 px-3`}>
            <Text style={tw`text-white`}>Birthday</Text>
            <Text style={tw`text-neutral-700`}>{data?.birthday}</Text>
          </View>
          <View style={tw`border-r  border-neutral-400 px-3`}>
            <Text style={tw`text-white`}>Known for</Text>
            <Text style={tw`text-neutral-700`}>{data?.known_for_department}</Text>
          </View>
          <View>
            <Text style={tw`text-white`}>Popularity</Text>
            <Text style={tw`text-neutral-700`}>{Math.ceil(data?.popularity)}%</Text>
          </View>
        </View>
        <View style={tw`mt-6`}>
          <Text style={tw`text-white text-[20px]`}>Biograph</Text>
          <Text style={tw`text-neutral-600`}>
          {data?.biography}
          </Text>
        </View>
        <View style={tw`mt-6`}>
        <Text style={tw`mb-2 text-white font-bold text-xl`}>Directed Movies</Text>
        <FlatList
          data={similarData?.cast}
          renderItem={({item}) => (
            <TopCard key={item.id} icons={item} handlePress={handlePress}/>
          )}
          horizontal
          contentContainerStyle={{columnGap:20}}
          keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>

       )
     }
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  images_container: {
    backgroundColor: "#333333",
    elevation: 10,
    borderRadius: 100,
    padding: 10,
    width: 200,
    height: 200,
    marginBottom: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowColor:'gray'
  },
});

export default CastProfile;
