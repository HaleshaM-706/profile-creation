import React, { Component } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { Appbar, Avatar, Button, FAB } from "react-native-paper";
import Helper from '../../provider/Helper'
import HelperService from '../../provider/HelperService';
import TextFields from "../components/fullBorderTextInput";
import CustomTextArea from "../components/textInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from "react-native-image-picker";

export default class AppstoreScreen extends Component<any> {

  constructor(props) {
    super(props)
  }

  state = {
    title: '',
    description: '',
    appVersion: '',
    author: '',
    link: '',
    logo: '',
    id: 0
  }



  async componentDidMount() {
    if (this.props && this.props.id) {
      this.setState({
        title: this.props.title,
        description: this.props.description,
        appVersion: this.props.appVersion,
        author: this.props.author,
        link: this.props.link,
        logo: this.props.logo,
        id: this.props.id
      })
    }

  }

  isValidate = () => {
    if (this.state.title && this.state.appVersion && this.state.author &&
      this.state.link && this.state.logo) {
      return true
    }
    else {
      return false
    }
  }

  submit = async () => {
    if (this.isValidate()) {
      Keyboard.dismiss()
      let option = {
        title: this.state.title,
        description: this.state.description,
        appVersion: this.state.appVersion,
        author: this.state.author,
        link: this.state.link,
        logo: this.state.logo
      }
      if (this.state && this.state.id == 0) {
        let res: any = await HelperService.post('api/profile/details', JSON.stringify(option));
        console.log("Result res", res);
        if (res) {
          HelperService.showToast('Successfully added comapany details')
          Helper.navigateToDashboard(this.props, "Dashboard");
        }
        else {
          HelperService.showToast('Failed to add details')
        }
      }
      else if (this.state && this.state.id != 0) {
        let res: any = await HelperService.update('api/profile', JSON.stringify(option), this.state.id);
        console.log("Result res", res);
        let result: any = JSON.parse(res)
        if (result && result.message == "Profile was updated successfully.") {
          HelperService.showToast('Successfully updated the comapany details')
          Helper.navigateToDashboard(this.props, "Dashboard");
        }
        else {
          HelperService.showToast('Failed to update details')
        }
      }

    }
  }

  pickImage = async () => {
    ImagePicker.showImagePicker((response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({
          logo: response.uri
        })
        HelperService.showToast('Uploaded..')
      }
    });
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Appbar.Header>
            <Appbar.Content title="App Details" />
          </Appbar.Header>
        </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={{ margin: 10 }}>
            <Avatar.Image size={150} style={{ backgroundColor: '#fff' }}
              source={this.state.logo ? { uri: this.state.logo } : require('../assets/image/images.png')} />
            <FAB
              style={styles.fab}
              icon="plus"
              small
              onPress={() => {
                this.pickImage();
              }}
            />
          </View>

          <View>
            <TextFields
              style={{ backgroundColor: "#fff" }}
              onChangeText={this.onChangeText}
              type="title"
              value={this.state.title}
              isBorder={true}
              placeholder="Name of the App"
              textLabel="Name of the App"
              isRequired={true}
            />
          </View>

          <View>
            <Text>Description</Text>
            <View
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 10,
                overflow: "hidden",
                height: 93,
              }}
            >
              <CustomTextArea
                multiline
                numberOfLines={5}
                placeholder="Description"
                value={this.state.description}
                onChangeText={this.onChangeText}
              />
            </View>
          </View>

          <View>
            <TextFields
              style={{ backgroundColor: "#fff" }}
              onChangeText={this.onChangeText}
              type="appVersion"
              value={this.state.appVersion}
              isBorder={true}
              placeholder="App version"
              textLabel="App version"
              isRequired={true}
            />
          </View>



          <View>
            <TextFields
              style={{ backgroundColor: "#fff" }}
              onChangeText={this.onChangeText}
              type="link"
              value={this.state.link}
              isBorder={true}
              placeholder="Link of your app"
              textLabel="App Link"
              isRequired={true}
            />
          </View>
          <View>
            <TextFields
              style={{ backgroundColor: "#fff" }}
              onChangeText={this.onChangeText}
              type="author"
              value={this.state.author}
              isBorder={true}
              placeholder="Name of the author"
              textLabel="author"
              isRequired={true}
            />
          </View>

          <View style={{ margin: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              onPress={this.submit}
              mode="contained"
              disabled={!this.isValidate()}
            >
              <Text style={{ fontSize: 20 }}>{this.state.id != 0 ? 'Update' : 'Submit'}</Text>
            </Button>

            <Button
              onPress={() => {
                Helper.navigateToDashboard(this.props, "Dashboard");
              }}
              mode="outlined"
            >
              <Text style={{ fontSize: 20 }}>Cancel</Text>
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    left: 40,
    bottom: -30,

  },
})



