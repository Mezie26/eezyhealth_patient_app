import { StatusBar } from 'expo-status-bar';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-expo';
import { ChatClientProvider } from './shared/ChatClientContext';



export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ChatClientProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <OverlayProvider>
            <Provider store={store}>
              <PaperProvider  >
                <SafeAreaProvider>
                  <Navigation colorScheme={colorScheme} />
                  <StatusBar />
                </SafeAreaProvider>
              </PaperProvider>
            </Provider>
          </OverlayProvider>
        </GestureHandlerRootView>
      </ChatClientProvider >
    );
  }
}
