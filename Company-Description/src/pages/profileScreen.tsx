import React, { Component } from "react";
import { View, Text, StyleSheet,Keyboard } from "react-native";
import { Appbar, Avatar, Button, FAB } from "react-native-paper";
import Helper from '../../provider/Helper'
import HelperService from '../../provider/HelperService';
import { Badge, Icon } from 'react-native-elements';
import TextFields from "../components/fullBorderTextInput";
import CustomTextArea from "../components/textInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from "react-native-image-picker";
import compress from 'compress-base64';

export default class ProfileScreen extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    title: '',
    description: '',
    employeeCount: '',
    establishYear: '',
    founder: '',
    headQuater: '',
    logo: '',
    id: 0
  }



  async componentDidMount() {
    let asyncValues: any = await HelperService.getCurrentCompany();
    if (asyncValues && asyncValues.id) {

      this.setState({
        title: asyncValues.title,
        description: asyncValues.description,
        employeeCount: asyncValues.employeeCount.toString(),
        establishYear: asyncValues.establishYear,
        founder: asyncValues.founder,
        headQuater: asyncValues.headQuater,
        logo: asyncValues.logo,
        id: asyncValues.id
      })
    }

  }

  submit = async () => {
    if (this.state.title) {
      Keyboard.dismiss()
      let option = {
        title: this.state.title,
        description: this.state.description,
        employeeCount: parseInt(this.state.employeeCount),
        establishYear: this.state.establishYear,
        founder: this.state.founder,
        headQuater: this.state.headQuater,
        logo: this.state.logo
      }
      if (this.state && this.state.id == 0) {
        let res: any = await HelperService.post('api/profile/details', JSON.stringify(option));
        console.log("Result res", res);
        if (res) {
          let values = await AsyncStorage.setItem('CURRENT_COMPANY', res)
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
          let values = await AsyncStorage.setItem('CURRENT_COMPANY', JSON.stringify(this.state))
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
            <Appbar.Action
              icon="menu"
              onPress={() => {
                Helper.openSidemenu(this.props.componentId, this.props.componentName);
              }}
            />
            <Appbar.Content title="Profile" />
          </Appbar.Header>
        </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={{ margin: 10 }}>
            <Avatar.Image size={150} style={{ backgroundColor: '#fff' }}
              source={this.state.logo ? { uri: this.state.logo } : require('../assets/image/images.png')} />
            <FAB
              style={styles.fab}
              icon={() => <Icon type="ionicon" name="create" color="white" />}
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
              placeholder="Name of the Company"
              textLabel="Title"
              isRequired={true}
            />
          </View>
         
          <View>
            <TextFields
              style={{ backgroundColor: "#fff" }}
              onChangeText={this.onChangeText}
              type="establishYear"
              value={this.state.establishYear}
              isBorder={true}
              placeholder="Establish year"
              textLabel="Establish year"
              keyboardType={'numeric'}
              isRequired={false}
            />
          </View>

          <View>
            <TextFields
              style={{ backgroundColor: "#fff" }}
              onChangeText={this.onChangeText}
              type="employeeCount"
              value={this.state.employeeCount}
              isBorder={true}
              placeholder="Employee Count"
              textLabel="Employee Count"
              keyboardType={'numeric'}
              isRequired={false}
            />
          </View>

          <View>
            <TextFields
              style={{ backgroundColor: "#fff" }}
              onChangeText={this.onChangeText}
              type="founder"
              value={this.state.founder}
              isBorder={true}
              placeholder="Name of the Founder"
              textLabel="Founder"
              isRequired={false}
            />
          </View>

          <View>
            <TextFields
              style={{ backgroundColor: "#fff" }}
              onChangeText={this.onChangeText}
              type="headQuater"
              value={this.state.headQuater}
              isBorder={true}
              placeholder="Name of the Headquoter"
              textLabel="Headquoter"
              isRequired={false}
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

          <View style={{ marginTop: 10 }}>
            <Button
              onPress={this.submit}
              mode="contained"
            >
              <Text style={{ fontSize: 20 }}>{this.state.id != 0 ? 'Update' : 'Submit'}</Text>
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



