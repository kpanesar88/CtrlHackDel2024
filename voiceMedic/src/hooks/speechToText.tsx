import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";

export function SpeechToText() {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  if (recognizing === true) {
    console.log(recognizing);
  }

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error messsage:", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
      contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
    });
  };

  return (
    <View style={styles.pushToTalkContainer}>
      {!recognizing ? (
        <Pressable onPress={handleStart} style={styles.pushToTalkButton}>
          <Image
            source={require("../../assets/microphone-black-shape.png")} // Relative path from your src directory
            style={styles.micImage}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={ExpoSpeechRecognitionModule.stop}
          style={styles.pushToTalkButton}>
          <Image
            source={require("../../assets/microphone-black-shape.png")} // Relative path from your src directory
            style={styles.micImage}
          />
        </Pressable>
      )}

      <ScrollView>
        <Text>{transcript}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pushToTalkContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  pushToTalkButton: {
    backgroundColor: "#0f7af5",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: 100,
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  micImage: {
    width: 50,
    height: 50,
  },
});
