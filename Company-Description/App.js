import React from 'react';
import {Text} from 'react-native';
import {createContext, ReactNode, useEffect, useState} from 'react';
import {Provider} from 'react-native-paper';

// import theme from './theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
/**
 * Types
 */
type User = any | null;
// type User = FirebaXMLHttpRequestseAuthTypes.User | null;
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
/**
 * Context
 */
export const UserContext = createContext<User>(null);

function App() {
  const [initializing, setInitializing] = useState(true);
  const [listenUser, setListenUser] = useState(false);
  const [user, setUser] = useState<User>(null);

  /** Listen for auth state changes */
  useEffect(() => {
      setUser(null);
        setInitializing(false);
        setListenUser(true);
        AppEventsLogger.logEvent("test-1")
  }, [initializing, listenUser]);

  if (initializing) {
    return <Text>Loading...</Text>;
  }

  function container(children: ReactNode | ReactNode[]) {
    return <Provider theme={theme} settings={{
          icon: props => <MaterialIcons {...props} />,
        }}>{children}</Provider>;
  }


}

export default App;
