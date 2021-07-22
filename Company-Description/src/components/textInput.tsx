import React, { Component } from 'react';
import { View, TextInput, Platform } from 'react-native';

export default ({ onChangeText, ...props }) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={80}
      onChangeText={value => onChangeText('description', value)}
      style={{ marginTop: Platform.OS == 'android' ? -38 : 0, height: 100 }}
    />
  );
}