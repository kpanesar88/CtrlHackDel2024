# VoiceMedic

VoiceMedic is a voice-activated first aid assistant created for CtrlHackDel 2024. It’s designed to guide users through emergency first aid situations by processing spoken descriptions and providing AI-powered, step-by-step instructions out loud. With VoiceMedic, anyone—regardless of their medical knowledge—can respond effectively to emergencies and provide life-saving assistance until professional help arrives.

### Inspiration
We developed VoiceMedic to help individuals, regardless of their first aid knowledge, provide emergency assistance. Our goal is to empower people to save lives, using voice-based guidance to bridge knowledge gaps in first aid skills.

### Features
- **Voice Recognition**: Click the blue button, speak, and receive spoken instructions based on the emergency situation described.
- **Text Option**: For devices without a microphone, text input is available.
- **Reference Numbers**: Quick access to emergency contacts, including 911, suicide hotlines, and non-emergency numbers, which users can call directly through their device’s calling feature.

### How It Works
VoiceMedic uses speech recognition to take in verbal descriptions of the medical situation and passes them to an AI model for processing. The model generates first aid instructions, which are then delivered as spoken output. The app is particularly useful in emergencies where immediate guidance is crucial.

### How to Use
1. **Start Speaking**: Click the blue button to start speaking. Once you stop, VoiceMedic will provide instructions.
2. **Text Input Option**: Use this if no microphone is available.
3. **Reference Numbers**: Click on the emergency numbers to call directly using your device.

### Setup and Installation
To set up and run VoiceMedic locally:

   ```bash
   git clone https://github.com/kpanesar88/VoiceMedic.git
   cd VoiceMedic
   npm install
   expo start
```

Ensure you have an API key for OpenAI to enable the AI model functionalities.

### Challenges and Future Goals
- Current Limitations: We faced dependency conflicts that limited the app’s export as an APK for mobile devices.
- Future Goals: Improve accuracy, integrate with voice assistants like Siri/Bixby, enhance AI accuracy with medical input, and fully resolve mobile app setup for broader accessibility.

### Resources
Here are some helpful resources for using and extending VoiceMedic:
- Expo Documentation -> [Here](https://docs.expo.dev/)
- React-Native Documentation -> [Here](https://reactnative.dev/docs/getting-started)
- OpenAI Developer Quickstart -> [Here](https://platform.openai.com/docs/quickstart)
- Android Studio -> [Here](https://developer.android.com/studio?gad_source=1&gclid=Cj0KCQiAlsy5BhDeARIsABRc6ZtMg1nL056HwIRrGs5OTO5wVIgH9IWRoTX8LA-pQSq3ZfW4B__MEOgaAumeEALw_wcB&gclsrc=aw.ds)

### Contact
For more information or questions, feel free to reach out via [Linktree](https://linktr.ee/zorzexy).
