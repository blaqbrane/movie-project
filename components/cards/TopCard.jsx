import { View,Text,FlatList, Dimensions,Image ,TouchableOpacity} from "react-native";
import tw from 'twrnc'
import { checkImageURL } from "../../utils";
import icons from "../../constants/icons";



var{width, height} = Dimensions.get('window');


const TopCard =({handlePress, icons, title}) => {
  const imgs = `https://image.tmdb.org/t/p/w500${icons?.poster_path}`
   
  return (
   <TouchableOpacity style={tw`mb-1 mt-3 `} onPress={() => handlePress(icons?.id)}>
        <View style={{width: width * 0.4}}>
      <Image
      source={{uri: checkImageURL(imgs) ? imgs : 'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' }}
      style={{width: width * 0.4, height: height * 0.3 , borderRadius:20}}
     
      />
      <View>
      <Text style={tw`text-white text-center`} numberOfLines={1}> {icons.title} </Text>
      </View>
     </View>

   </TouchableOpacity>
  )
}
export default TopCard;