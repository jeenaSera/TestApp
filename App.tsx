import React, {useEffect, useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/pro-solid-svg-icons';
import {
  fab,
  faTwitterSquare,
  faFacebook,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import Navigation from './app/navigation/Navigation';

library.add(fas, fab, faTwitterSquare, faFacebook, faLinkedin, faGithub);

const lightMode = 'light-content';
const darkMode = 'dark-content';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //load information
    setLoading(false);
  }, []);

  return (
    <SafeAreaProvider>
      {/* used dark mode for ios and light mode for android */}
      <StatusBar
        animated={true}
        barStyle={Platform.OS == 'ios' ? darkMode : lightMode}
      />
      {loading ? <></> : <Navigation />}
    </SafeAreaProvider>
  );
}
