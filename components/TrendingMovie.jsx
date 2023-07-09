import { View,Text,FlatList,Dimensions} from "react-native";
import Carousel from 'react-native-snap-carousel'
import tw from 'twrnc'
import TrendingCard from "./cards/TrendingCard";
import { useRouter } from "expo-router";
import icons from "../constants/icons";

var{width, height} = Dimensions.get('window');
const TrendingMovie =({data}) => {
  const router = useRouter()

  const handlePress = (item) => {
    router.push(`/details/${item}`)
  }
  return (
    <View>
      <Text style={tw`text-white`}>Trending</Text>
      <Carousel
      data={data && data}
      renderItem={({item} ) => <TrendingCard item={item} handlePress={handlePress}/>}
      firstItem={1}
      inactiveSlideOpacity={0.60}
      sliderWidth={width}
      itemWidth={width * 0.62}
      slideStyle={{display:'flex', alignItems:'center'}}
      />
    </View>
  )
}
export default TrendingMovie;