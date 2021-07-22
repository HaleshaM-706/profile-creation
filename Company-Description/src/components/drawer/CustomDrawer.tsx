import {
  withTheme,
  Drawer,
  Divider,
  Avatar,
  Caption,
  Badge,
} from "react-native-paper";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { drawerStyles } from "./CustomDrawer.style";
import { Navigation } from "react-native-navigation";
import Helper from "../../../provider/Helper";
import theme from "../../theme";
// import Share from "react-native-share";

function CustomDrawer({ componentId, props, activeIndex }) {
  const [active, setActive] = useState<any>(activeIndex || 0);
  const [componentIds, setcomponentIds] = useState<any>("DashBoardId");
  const [state, setState] = useState({
    currentUser: {},
    organizations: {},
    logo: "",
    leftCredits: 0,
    flyerCredits: 0,
    sideMenunames: {
      Notifications: 0,
      Products: 1,
      MyBuyers: 2,
      PromotePage: 3,
    },
  });

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      bottomTabs: {
        visible: false,
      },
    });
  }, []);



  const closeSidemenu = () => {
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
  };

  const pushToScreen = (componentName: any, fromRegister?: any, data?: any) => {
    closeSidemenu();
    Helper.pushToEventDetails(
      componentIds,
      { componentName: componentName },
      fromRegister,
      { isUpload: data }
    );
  };


  function onLogout() {
    closeSidemenu();
    Alert.alert(
      "Confirmation",
      `Are you sure want to logout?`,
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            Helper.setRoot("HomePage");
          },
        },
      ],
      { cancelable: false }
      // await setScrollEnabled(true)
    );
  }

  return (
    <View style={drawerStyles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 2.5 }}>
          {state.logo ? (
            <View style={{ width: 100, height: 100, marginLeft: 15 }}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "stretch",
                }}
                source={{ uri: state.logo }}
              />
            </View>
          ) : (
            // <Avatar.Text
            //   size={100}
            //   style={{
            //     marginTop: 5,
            //     alignSelf: "center",
            //     backgroundColor: theme.colors.primary,
            //   }}
            // />
            null
          )}
        </View>
      </View>
      <ScrollView>
        <Drawer.Item
          icon="home"
          active={active === 0}
          label="Home"
          onPress={async () => {
            if (active != 0) {
              setActive(0);
              Helper.navigateToDashboard(props, "Dashboard");
            } else {
              closeSidemenu();
            }
          }}
        />

        <Drawer.Item
          icon="account"
          active={active === 1}
          label="Profile"
          onPress={async () => {
            if (active != 1) {
              setActive(1);
              pushToScreen("Profile");
            } else {
              closeSidemenu();
            }
          }}
        />




        {/* <Drawer.Item
          icon="account-arrow-right"
          active={active === 9}
          label="Logout"
          onPress={async () => {
            if (active != 9) {
              setActive(9);
              onLogout();
            } else {
              closeSidemenu();
            }
          }}
        /> */}
      </ScrollView>

    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 0,
  },
  tenantNameCtr: {
    alignSelf: "center",
    fontSize: 16,
    flex: 4,
    color: theme.colors.primary,
    marginTop: -10,
    marginLeft: 8,
  },
});
export default withTheme(CustomDrawer);
