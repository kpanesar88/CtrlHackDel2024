import React from "react";
import { View, Text, Button } from "react-native";
import * as Speech from "expo-speech";

const TextToSpeech = () => {
  const sampleText =
    "Welcome to Voice Medic! I can help you with medical emergencies.";

  // Function to trigger text-to-speech with different voice settings
  const speak = () => {
    // Example of changing speech properties
    Speech.speak(sampleText, {
      language: "en", // You can change to 'en-US', 'en-GB', etc.
      pitch: 1.5, // Change the pitch, range 0 to 2
      rate: 1, // Change the rate of speech, range 0 to 1 (normal is around 0.5-1)
      // You can also try setting specific voice here, but it will be based on system available voices.
      voice: "en-US", // This is to use a default system voice, you can change language or specific voice if available
    });
  };

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
      {/* Display the sample text /}
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{sampleText}</Text>

      {/ Button to trigger speech */}
      <Button title="Play Speech" onPress={speak} />
    </View>
  );
};

export default TextToSpeech;
