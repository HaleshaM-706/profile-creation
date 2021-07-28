import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect } from 'react';
import Helper from './provider/Helper';
import { ActivityIndicator, Colors } from 'react-native-paper';


function Intializing(props) {
  async function init() {
    try {
      Helper.navigateToDashboard(props, 'Dashboard');
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
      <ActivityIndicator size="large" animating={true} color={Colors.red800} />
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
    borderRadius: 100
  },
});
export default Intializing;
