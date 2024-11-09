import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import Voice from '@react-native-voice/voice';

// Define the type for the props of the component
interface VoiceInputProps {
  onTextReceived: (userInput: string) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onTextReceived }) => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    // Listen for speech results
    Voice.onSpeechResults = (e) => {
      const userInput = e.value[0]; // Take the first recognized result
      setText(userInput);
      onTextReceived(userInput); // Pass it to parent component
    };

    // Clean up listeners when component unmounts
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = () => {
    Voice.start('en-US'); // Start speech recognition
  };

  return (
    <View>
      <Button title="Start Listening" onPress={startListening} />
      <Text>Recognized Text: {text}</Text>
    </View>
  );
};


