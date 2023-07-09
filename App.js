import { StyleSheet, Text, View,SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black" >
      <View >
        <Text >Hello World</Text>
        <Text>This is the first page of your app.</Text>
      </View>
    </SafeAreaView>
  );
}
