import {
  View,
  Text,
  Pressable,
  Linking,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { VoiceInput } from "../components/voiceInput";

import "../../global.css";

export default function Page() {
  const [response, setResponse] = useState("");
  const [inputText, setInputText] = useState("");

  const handleTextReceived = async (text: string): Promise<void> => {
    setResponse(text);
    console.log("Text received:", response);
  };

  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  const handleSubmit = () => {
    console.log("User input:", inputText);
  };

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
        <VoiceInput onTextReceived={handleTextReceived} />
      </View>

      {/* TextInput instead */}
      <View>
        <Text>What's happening:</Text>
        <TextInput
          placeholder="Enter text"
          value={response}
          onChangeText={handleTextChange}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}
