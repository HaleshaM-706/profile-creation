import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from '../env.json'
import Toast from 'react-native-simple-toast';


export default function HelperService() {}

HelperService.post = function (url, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        API_URL + url,
        {
          method: 'POST',
          body: body,
          headers: {
            'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('response',response);
      
      let json = await response.text();
      // console.log('result =======================>', json)
      resolve(json)
    } catch (error) {
      console.error(error);
      reject(error)
    }
  })
}

HelperService.update = function (url, body, id) {
  return new Promise(async (resolve, reject) => {
    console.log("===========>", url, body, id);
    try {
      let response = await fetch(
        API_URL + url + '/' + id,
        {
          method: 'PUT',
          body: body,
          headers: {
            'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
            'Content-Type': 'application/json'
          }
        }
      );
      let json = await response.text();
      // console.log('result =======================>', json)
      resolve(json)
    } catch (error) {
      console.error(error);
      reject(error)
    }
  })
}

HelperService.getCurrentCompany = function () {
  return new Promise(async (resolve, reject) => {
    let res = await AsyncStorage.getItem('CURRENT_COMPANY');
    if (res) {
      console.log("user", res);
      let user = JSON.parse(res)
      resolve(user)
    }
    else {
      reject(null)
    }
  })
}

HelperService.showToast=(msg)=> {
  Toast.showWithGravity(msg, 1000 ,Toast.BOTTOM)
}