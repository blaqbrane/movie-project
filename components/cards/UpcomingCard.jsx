import { View,Text,FlatList, Dimensions,Image ,TouchableOpacity} from "react-native";
import tw from 'twrnc'
import icons from "../../constants/icons";


var{width, height} = Dimensions.get('window');
const title = 'Game of thrones bbdhbhbdbhhbd hbhbhdb hbhbd'
const UpcomingCard =({handlePress, item}) => {
  return (
   <TouchableOpacity style={tw`mb-10 mt-6 `} onPress={() => handlePress(item?.id)}>
    <View style={{width: width * 0.4}}>
    <Image
       source={{uri:`https://image.tmdb.org/t/p/w500${item?.poster_path}`}}
      style={{width: width * 0.4, height: height * 0.3 , borderRadius:20}}
     
      />
   
      <View>
      <Text style={tw`text-white text-center`} numberOfLines={1}> {item?.title} </Text>
      </View>
    </View>

   </TouchableOpacity>
  )
}
export default UpcomingCard;