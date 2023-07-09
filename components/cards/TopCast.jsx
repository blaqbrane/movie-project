import {View,Text, Image, TouchableOpacity, Dimensions} from 'react-native'
import tw from 'twrnc'
import { checkImageURL } from '../../utils';

const TopCast =({item, handleClick}) =>{

 
 
  var{width, height} = Dimensions.get('window');
  const imgs =`https://image.tmdb.org/t/p/w500${item?.profile_path}`
  return(
    <TouchableOpacity style={tw`flex flex-col items-center`} onPress={handleClick}>

      <View style={{width: width * 0.2, height:height * 0.2 , flexDirection:'column', alignItems:'center'}}>
      <Image
      source={{uri: checkImageURL(imgs) ? imgs :'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' }}
      resizeMode='cover'
      style={tw`w-20 h-20 rounded-full `}
      />
      <Text style={tw`text-white`} numberOfLines={1}>{item?.name}</Text>
      <Text style={tw`text-white text-[10px]`} numberOfLines={1}>{item?.original_name}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default TopCast;