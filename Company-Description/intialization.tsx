import React, { useState } from 'react';
import { AppState, StyleSheet, Text, View, Image } from 'react-native';
import { useEffect } from 'react';
import Helper from './provider/Helper';



function Intializing(props) {
  const [loadingText, setLoadingText] = useState('Loading');
  const [appState, setAppState] = useState(AppState.currentState);


  async function init() {
    try {
      Helper.navigateToDashboard(props,'Dashboard');
    } catch (err) {
      Helper.setRoot('HomePage');
      console.log('err', err);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      init();
    }, 5000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./src/assets/image/hardwood-tree.jpg')}
      />
      <Text>Welcome to Task 2</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    margin: 20,
    alignContent: 'center',
    borderRadius:100
  },
});
export default Intializing;
