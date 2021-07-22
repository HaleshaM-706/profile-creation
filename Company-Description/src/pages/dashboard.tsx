import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar, Avatar, Button } from "react-native-paper";
import Helper from '../../provider/Helper'
import { Badge, Icon } from 'react-native-elements';
import HelperService from '../../provider/HelperService';

export default class Dashboard extends Component<any> {

  constructor(props) {
    super(props)
  }

  state = {
    comapany: {
      title: '',
      description: '',
      employeeCount: '',
      establishYear: '',
      founder: '',
      headQuater: '',
      logo: 'hh',
      id: 0
    }
  }

  async componentDidMount() {
    let asyncValues: any = await HelperService.getCurrentCompany();
    if (asyncValues && asyncValues.id) {
      console.log('inside');

      this.setState({
        comapany: asyncValues
      })
    }

  }


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
            <Appbar.Content title="Dashboard" />
            <Appbar.Action icon={() => <Icon type="ionicon" name="ios-notifications" color="white" />} onPress={() => { }} />
            <Appbar.Action icon="dots-vertical" onPress={() => { }} />
          </Appbar.Header>
        </View>
        <View style={{flex:1}}>
          {this.state && this.state.comapany && this.state.comapany.id != 0 ?
            <View style={{ margin: 10 }}>
              <View style={{ margin: 10,display:'flex',alignItems:'center' }}>
                <Avatar.Image size={150} style={{ backgroundColor: '#fff' }}
                  source={this.state.comapany.logo ? { uri: this.state.comapany.logo } : require('../assets/image/images.png')} />
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textStyle}>Company Name</Text>
                <Text style={styles.textStyle}>{this.state.comapany.title}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textStyle}>Description</Text>
                <Text style={styles.textStyle}>{this.state.comapany.description}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textStyle}>Founder</Text>
                <Text style={styles.textStyle}>{this.state.comapany.founder}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textStyle}>Employee Count</Text>
                <Text style={styles.textStyle}>{this.state.comapany.employeeCount}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textStyle}>Establish Year</Text>
                <Text style={styles.textStyle}>{this.state.comapany.establishYear}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textStyle}>Headquater</Text>
                <Text style={styles.textStyle}>{this.state.comapany.headQuater}</Text>
              </View>
            </View>
            :
            <View style={{flex:1, display:'flex',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={{ fontSize: 20,textAlign:'center' }}>Welcome to Dashboard</Text>
              <View style={{ marginTop: 10 }}>
            <Button
              onPress={()=>{
                Helper.viewProfile(
                  this.props
                );
              }}
              mode="contained"
            >
              <Text style={{ fontSize: 20 }}>Go to Profile</Text>
            </Button>
          </View>
            </View>
          }

        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    fontSize: 18
  },
  row: {
    flexDirection: 'row'
  },
  badgeStyle: {
    position: 'absolute',
    top: 10,
    right: 60
  },
  textStyle: {
    fontSize: 20,
    borderWidth: 1,
    width: '50%',
    textAlign: 'center'
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row'
  }
});



