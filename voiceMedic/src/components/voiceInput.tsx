import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av';

export const SpeechToText: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState<string>('');

  // Start the recording
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status === 'granted') {
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        setIsRecording(true);
      } else {
        console.error('Permission to access microphone denied');
      }
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  // Stop the recording
  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI(); // Audio file URI
      console.log('Recording stopped, URI:', uri);
      setIsRecording(false);
      sendToGoogleSpeechAPI(uri); // Send audio to Google API
    }
  };

  // Send the recorded audio to Google Cloud Speech API
  const sendToGoogleSpeechAPI = async (audioUri: string) => {
    try {
      const audioBlob = await fetch(audioUri).then((res) => res.blob());
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = reader.result?.toString().split(',')[1];

        if (base64Audio) {
          const apiKey = 'YOUR_GOOGLE_CLOUD_API_KEY';
          const response = fetch(
            `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                config: {
                  encoding: 'LINEAR16',
                  sampleRateHertz: 16000,
                  languageCode: 'en-US',
                },
                audio: {
                  content: base64Audio,
                },
              }),
            }
          );

          const data = await (await response).json();
          console.log('Google Speech-to-Text response:', data);
          setText(data?.results?.[0]?.alternatives?.[0]?.transcript || 'No transcription');
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error sending audio to Google API:', error);
    }
  };

  return (
    <View>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Text>Transcribed Text: {text}</Text>
    </View>
  );
};

