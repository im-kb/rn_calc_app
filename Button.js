import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class Button extends Component {
  render() {
    const {title, color, size, handleOnPress} = this.props;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: color,
          width: size,
          height: '20%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handleOnPress({title})}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Button;
