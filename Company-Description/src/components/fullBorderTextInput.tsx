import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import colors from "../theme";

export default ({
  onChangeText,
  type,
  textLabel,
  isBorder,
  isRequired,
  ...props
}) => {
  return (
    <View>
      <Text style={{ color: isBorder ? "#000" : "#fff", marginBottom: 5, }}>
        {textLabel} {isRequired ? <Text style={{ color: 'red' }}>*</Text> : ''}
      </Text>
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        onChangeText={(value) => onChangeText(type, value)}
        style={{
          backgroundColor: colors.white,
          borderRadius: 3,
          borderColor: isBorder ? colors.borderDisbled : "#fff",
          borderWidth: isBorder ? 1 : 0,
          width:"100%",
          padding: 6,
          minHeight: 40
        }}
      />
    </View>
  );
};
