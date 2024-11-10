import {
  View,
  Text,
  Pressable,
  Linking,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Speech from "expo-speech";
import { SpeechToText } from "../components/speechToText";
const { getAnswerFromGPT } = require('../api/aiHandler');  // Import the function from aiHandler.js

//import { SpeechToText } from "../components/voiceInput";  // Assuming the SpeechToText component exists

export default function Page() {
  const [response, setResponse] = useState("");
  const [inputText, setInputText] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Handle text received from speech-to-text
  const handleTextReceived = async (text: string): Promise<void> => {
    setResponse(text);
    const result = await getAnswerFromGPT(text);
    setResponse(result);
    console.log("Text received: ", text);
  };

  // Handle change in input text
  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("User input:", inputText);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Handle speech output
  const handlePlaySpeech = () => {
    if (inputText.trim() !== "") {
      Speech.speak(inputText, {
        language: "en",
        pitch: 1,
        rate: 1,
      });
    } else {
      Speech.speak("No text entered. Please type something first.", {
        language: "en",
        pitch: 1,
        rate: 1,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Project Name with Emoji */}
      <View style={styles.headerContainer}>
        <Text style={styles.projectName}>
          <Text style={styles.emoji}>☊</Text> VoiceMedic
        </Text>

        {/* 911 Button */}
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => Linking.openURL("tel:911")}
            style={styles.button}>
            <Text style={styles.buttonText}>911</Text>
          </Pressable>
        </View>
      </View>

      {/* Push to Talk */}
      <SpeechToText onTextReceived={handleTextReceived} />
      {/* <View style={styles.pushToTalkContainer}>
    <Pressable
            onPress={() => Linking.openURL("tel:911")}
            style={styles.pushToTalkButton}
          >
    <Image
              source={require('./microphone-black-shape.png')} // Relative path from your src directory
              style={styles.micImage}
            />
            </Pressable>
    </View> */}

      {/* Text Input Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>What's happening:</Text>
        <TextInput
          placeholder="Enter your message here..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={handleTextChange}
          style={styles.textInput}
        />

        {/* Submit Button */}
        <Pressable onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>

        {/* Play Speech Button */}
        <Pressable onPress={handlePlaySpeech} style={styles.playSpeechButton}>
          <Text style={styles.playSpeechButtonText}>Play Speech</Text>
        </Pressable>
      </View>

      {/*Dropdown Menu for other Hotlines*/}
      <Pressable onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text style={styles.toggleButtonText}>Non-Emergency Support Lines</Text>
      </Pressable>
      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          <Pressable
            style={styles.dropdownItem}
            onPress={() => Linking.openURL("tel:988")}>
            <Text style={styles.dropdownText}>Suicide Prevention</Text>
          </Pressable>
          <Pressable
            style={styles.dropdownItem}
            onPress={() => Linking.openURL("tel:18006624357")}>
            <Text style={styles.dropdownText}>Mental Health Support</Text>
          </Pressable>
          <Pressable
            style={styles.dropdownItem}
            onPress={() => Linking.openURL("tel:18002221222")}>
            <Text style={styles.dropdownText}>Poison Control</Text>
          </Pressable>
          <Pressable
            style={styles.dropdownItem}
            onPress={() => Linking.openURL("tel:18002738255")}>
            <Text style={styles.dropdownText}>Domestic Violence Hotline</Text>
          </Pressable>
        </View>
      )}

      {/* Troubleshoot Link */}
      <View style={styles.troubleshootLinkContainer}>
        <Pressable
          onPress={() => Linking.openURL("https://yourtroubleshootpage.com")}>
          <Text style={styles.troubleshootLink}>Troubleshoot?</Text>
        </Pressable>
      </View>

      {/* Copyright Section */}
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>
          © 2024 Voice Medic. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 30,
    justifyContent: "flex-start",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 0,
  },
  projectName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 50,
  },
  emoji: {
    fontSize: 30,
    marginRight: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginLeft: 50,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  inputContainer: {
    marginTop: 40,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#FFF",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  playSpeechButton: {
    backgroundColor: "#34D399",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  playSpeechButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
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
  dropdownContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: "white",
    fontSize: 16,
  },
  dropdownMenu: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  dropdownItem: {
    color: "white",
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "white",
  },
  dropdownButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  supportContainer: {
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
  },
  supportHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  supportButton: {
    backgroundColor: "#4B5563",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "flex-start",
    paddingLeft: 20,
    marginBottom: 5,
  },
  supportButtonText: {
    color: "white",
    fontSize: 16,
  },
  troubleshootLinkContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  troubleshootLink: {
    color: "#2563EB",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  copyrightContainer: {
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 20,
  },
  copyrightText: {
    color: "#888",
    fontSize: 14,
  },
});
