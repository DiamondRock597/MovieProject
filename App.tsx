import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RootStore, initStore } from 'store';
import { AppNavigator } from 'navigation/AppNavigator';

export default function App() {
  const store = useRef<RootStore | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const didMount = async () => {
      try {
        store.current = await initStore();
      } finally {
        setLoading(false);
      }
    };

    didMount();
  }, [setLoading]);

  if (isLoading || !store.current) {
    return <ActivityIndicator />;
  }

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <SafeAreaProvider>
        <Provider store={store.current}>
          <AppNavigator />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
