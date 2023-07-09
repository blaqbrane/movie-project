import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { Stack, useRouter } from "expo-router";
import HeaderBtn from "../components/HeaderBtn";
import icons from "../constants/icons";
import {
  Bars3CenterLeftIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovie from "../components/TrendingMovie";
import { StatusBar } from "expo-status-bar";
import UpcomingMovie from "../components/UpcomingMovie";
import TopMovie from "../components/TopMovie";
import { useState, useEffect } from "react";
import UseFetch, { FetchTrending } from "../useFetch/FetchData";
import { API_KEY } from "../constants";
const baseUrl = 'https://api.themoviedb.org/3'
const trending = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`

export default function Page() {
  const router = useRouter();
  const{ data, isLoading, error} = UseFetch(trending)
  
  // const trendingData = async() => {
  //   const data = await FetchTrending();
  //   cons
  // }
  return (
    <SafeAreaView style={tw`flex-1 bg-[#333333] text-white`}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerLeft: () => (
            <HeaderBtn
              Iconurl={
                <Bars3CenterLeftIcon style={{ color: "white" }} size={32} />
              }
            />
          ),
          headerRight: () => (
            <HeaderBtn
              Iconurl={<MagnifyingGlassIcon style={{ color: "white" }} />}
              size={32}
              handlePress={() => router.push(`/search/1`)}
            />
          ),
          headerTitleAlign: "center",
          headerTitle: "Movies",
          headerStyle: { backgroundColor: "#333333" },
          headerTitleStyle: { color: "red" },
        }}
      />
      {isLoading ? (
       <View style={tw`flex-1 justify-center`}>
         <ActivityIndicator size='large' color={'coral'}/>
       </View>
      ) : (
        <ScrollView style={tw`mt-10 px-6`}>
          
          <View>
            
            <TrendingMovie data={ data && data?.results}/>
            <UpcomingMovie />
            <TopMovie />
          </View>
        </ScrollView>
      )}

      <StatusBar color="blue" />
    </SafeAreaView>
  );
}
