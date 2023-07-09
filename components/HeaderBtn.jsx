import { View,Text,TouchableOpacity,Image } from "react-native";
import tw from 'twrnc'

const HeaderBtn =({Iconurl, handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={tw`text-white`}>
      {Iconurl}
      </View>
    </TouchableOpacity>
  )
}
export default HeaderBtn;