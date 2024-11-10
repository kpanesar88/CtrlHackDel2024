import { View, Text, Pressable, Linking, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as Speech from 'expo-speech';
import { SpeechToText } from "../components/voiceInput";  // Assuming the SpeechToText component exists

export default function Page() {
  const [response, setResponse] = useState("");
  const [inputText, setInputText] = useState("");

  // Handle text received from speech-to-text
  const handleTextReceived = async (text: string): Promise<void> => {
    setResponse(text);
    console.log("Text received:", response);
  };

  // Handle change in input text
  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("User input:", inputText);
  };

  // Handle speech output
  const handlePlaySpeech = () => {
    if (inputText.trim() !== "") {
      Speech.speak(inputText, {
        language: 'en',
        pitch: 1,
        rate: 1,
      });
    } else {
      Speech.speak('No text entered. Please type something first.', {
        language: 'en',
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
            style={styles.button}
          >
            <Text style={styles.buttonText}>9-1-1</Text>
          </Pressable>
        </View>
      </View>

      {/* Speech-to-Text Component */}
      <View>
        <SpeechToText onTextReceived={handleTextReceived} />
      </View>

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

      {/* Non-Emergency Support Lines */}
      <View style={styles.supportContainer}>
        <Text style={styles.supportHeader}>Non-Emergency Support Lines</Text>

        <Pressable
          onPress={() => Linking.openURL("tel:988")}
          style={styles.supportButton}
        >
          <Text style={styles.supportButtonText}>Suicide Prevention Line (988)</Text>
        </Pressable>

        <Pressable
          onPress={() => Linking.openURL("tel:18006624357")}
          style={styles.supportButton}
        >
          <Text style={styles.supportButtonText}>Mental Health Support (1-800-662-HELP)</Text>
        </Pressable>

        <Pressable
          onPress={() => Linking.openURL("tel:18002221222")}
          style={styles.supportButton}
        >
          <Text style={styles.supportButtonText}>Poison Control (1-800-222-1222)</Text>
        </Pressable>

        <Pressable
          onPress={() => Linking.openURL("tel:18002738255")}
          style={styles.supportButton}
        >
          <Text style={styles.supportButtonText}>Domestic Violence Hotline (1-800-799-SAFE)</Text>
        </Pressable>
      </View>

      {/* Troubleshoot Link */}
      <View style={styles.troubleshootLinkContainer}>
        <Pressable onPress={() => Linking.openURL("https://yourtroubleshootpage.com")}>
          <Text style={styles.troubleshootLink}>Troubleshoot?</Text>
        </Pressable>
      </View>

      {/* Copyright Section */}
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>© 2024 Voice Medic. All rights reserved.</Text>
      </View>
    </View>
  );
}


































































































const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  projectName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  emoji: {
    fontSize: 30,
    marginRight: 10,
  },
  buttonContainer: {},
  button: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  inputContainer: {
    marginTop: 40,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  playSpeechButton: {
    backgroundColor: '#34D399',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  playSpeechButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  supportContainer: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
  },
  supportHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  supportButton: {
    backgroundColor: '#4B5563',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    paddingLeft: 20,
    marginBottom: 5,
  },
  supportButtonText: {
    color: 'white',
    fontSize: 16,
  },
  troubleshootLinkContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  troubleshootLink: {
    color: '#2563EB',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  copyrightContainer: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 20,
  },
  copyrightText: {
    color: '#888',
    fontSize: 14,
  },
});
