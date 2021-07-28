import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Linking } from "react-native";
import { ActivityIndicator, Appbar, Avatar, Button, Colors, Headline, List } from "react-native-paper";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import Helper from '../../provider/Helper'
import HelperService from '../../provider/HelperService';

export default class Dashboard extends Component<any> {

  constructor(props) {
    super(props)
  }

  state = {
    comapany: [],
    isLoading: true
  }

  async componentDidMount() {
    let asyncValues: any = await HelperService.get('api/profile/profile-info');
    console.log(asyncValues);

    if (asyncValues && asyncValues.length != 0) {
      this.setState({
        comapany: JSON.parse(asyncValues),
        isLoading: false
      })
    }
    else {
      this.setState({
        isLoading: false
      })
    }

  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Appbar.Header>
            <Appbar.Content title="Dashboard" />
            <Appbar.Action icon="dots-vertical" onPress={() => { }} />
          </Appbar.Header>
        </View>
        <View style={{ flex: 1 }}>
          {this.state && this.state.comapany && this.state.comapany.length != 0 ?
            <View style={{ margin: 10 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Headline>App List</Headline>
                <Button mode="contained" onPress={() => {
                  Helper.viewProfile(
                    this.props
                  );
                }}>New App</Button>
              </View>
              <FlatList
                data={this.state.comapany}
                renderItem={({ item, index }) => {
                  return (
                    <List.Item
                      style={{ backgroundColor: '#dedede', borderRadius: 10, marginTop: 5 }}
                      title={item.title}
                      description={item.description + "\n" + "Author:" + item.author}
                      onPress={()=>{
                        Linking.openURL(item.link)
                      }}
                      descriptionNumberOfLines={2}
                      left={props => <Avatar.Image size={50} style={{ backgroundColor: '#fff', marginTop: 10 }}
                        source={item.logo ? { uri: item.logo } : require('../assets/image/images.png')} />}
                      right={props => <Button style={{ marginTop: 15 }}
                        onPress={() => {
                          Helper.viewProfile(this.props, item)
                        }}>
                        Edit
                      </Button>}
                    />
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
              />

            </View>
            :
            <View style={{flex:1}}>
              {this.state.isLoading ?
                <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                  <ActivityIndicator size="large" animating={true} color={Colors.red800} />
                </View>
                :
                <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                  <Text style={{ fontSize: 20, textAlign: 'center' }}>Welcome to Dashboard</Text>
                  <View style={{ marginTop: 10 }}>
                    <Button
                      onPress={() => {
                        Helper.viewProfile(
                          this.props
                        );
                      }}
                      mode="contained"
                    >
                      <Text style={{ fontSize: 20 }}>Add New App</Text>
                    </Button>
                  </View>
                </View>
              }
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



