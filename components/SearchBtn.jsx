import { View,Text,TouchableOpacity,Image ,TextInput, Dimensions} from "react-native";
import tw from 'twrnc';
import {Bars3CenterLeftIcon,Bars3Icon,MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useCallback } from "react";

const{height,width} = Dimensions.get('window')
const SearchBtn =({setSearchTerm,searchTerm, refetch}) => {

  const handleSearchTerm = (val) => {
   
    if(val && val.length > 2){
      setSearchTerm(val)
    refetch()
    }
    
  }

  // const handleDebounce = useCallback(debounce(handleSearchTerm, 400), [])
  return (
    <TouchableOpacity  style={tw` w-${width *0.2}`}>
      <View style={tw`text-white w-full flex-row border border-neutral-600 p-1 rounded-[10px]`}>
          <TextInput
          style={tw`flex-1 w-full rounded text-white`}
          // onChangeText={(val) => setSearchTerm(val)}
          onChangeText={handleSearchTerm}
          
          />
          <TouchableOpacity >
              <MagnifyingGlassIcon size={32} style={tw`text-neutral-600`}/>
          </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}
export default SearchBtn;