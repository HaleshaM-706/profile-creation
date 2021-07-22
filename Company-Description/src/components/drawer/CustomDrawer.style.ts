import { StyleSheet } from "react-native";
import theme from "../../theme";
import Helper from "../../../provider/Helper";
// import { defaultStyles } from '../../config';

export const drawerStyles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: "white",
    // ...defaultStyles.mainCtr
  },
  navItemStyle: {
    padding: 10,
  },
  navSectionStyle: {
    backgroundColor: "lightgrey",
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footerContainer: {
    color: "black",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  footerText: {
    color: "black",
    // fontSize: Helper.getPlatform() == "iOS" ? 12 : 14,
    marginBottom: 2,
  },
  drawerItem: {
    paddingVertical: 10,
  },
});
