import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { windowHeight } from '../../utils/Dimentions';
import { TextInput } from 'react-native-paper';

const FormInput = ({ label, keyboardType, formData, formErrors, value, onChangeText, error, ...rest }: any) => {


  return (
    <View style={styles.inputContainer}>

      <TextInput
        mode="outlined"
        label={label}
        style={[styles.text_input, error ? styles.errorBorder : null]}
        value={value}
        onChangeText={onChangeText}
        theme={{
          colors: { onSurfaceVariant: '#797a7d' },
          roundness: 14 // Specify the border radius here
        }}
        {...rest}
        activeOutlineColor="#43CE2E"
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {formErrors?.firstName ? <Text style={styles.errorText}>{formErrors?.firstName}</Text> : null}

    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({

  label: {
    fontSize: 16,
  },

  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  inputContainer: {
    width: '100%',
    height: windowHeight / 15,
    borderRadius: 16,
  },

  text_input: {
    backgroundColor: "#F0F4F8",
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },

  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 0, // Adjust for iOS status bar
  },

});
