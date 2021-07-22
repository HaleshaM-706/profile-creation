import {
  Navigation
} from "react-native-navigation";
import { registerScreens } from './src/screen';
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.                                                                         ;
//Registers all the screens with Wix Navigation.
registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
      root: {
          component: {
              name: "Initializing"
          }
      }
  });
});