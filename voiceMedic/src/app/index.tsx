import { View, Text, Pressable, Linking } from "react-native";
import React from "react";
import { VoiceInput } from "../components/voiceInput";

import "../../global.css";

export default function Page() {
  return (
    <View>
      {/* 911 button */}
      <View className="bg-red-500 text-white font-bold  rounded-full mx-auto my-10 p-6">
        <Pressable onPress={() => Linking.openURL("tel:911")}>
          <Text className="text-center font-bold text-lg">9-1-1</Text>
        </Pressable>
      </View>

      {/* Button to talk into the app */}
      <View>
        <Text>Going to Voice INput or smtg</Text>
      </View>
    </View>
  );
}
