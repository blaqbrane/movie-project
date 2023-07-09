import { View,Text,FlatList, Dimensions,Image ,TouchableOpacity} from "react-native";
import tw from 'twrnc'
import icons from "../../constants/icons";

var{width, height} = Dimensions.get('window');
const TrendingCard =({handlePress, item}) => {
  return (
   <TouchableOpacity style={tw`mb-10 mt-6 `} onPress={() => handlePress(item?.id)}>
      <Image
      source={{uri:`https://image.tmdb.org/t/p/w500${item?.poster_path}`}}
      style={{width: width * 0.6, height: height * 0.4 , borderRadius:20}}
     
      />
      
        <Text style={tw`text-white text-center`} numberOfLines={1}>{item.title}</Text>
      

   </TouchableOpacity>
  )
}
export default TrendingCard;