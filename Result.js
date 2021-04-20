import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class Result extends Component {
  render() {
    const{title, color}=this.props;
    return (
      <View
          style={{
            flex: 3,
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>

          <Text style={styles.resultText}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    topResult: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },

  resultText: {
    fontSize: 35,
    fontWeight: "bold",
    margin:10,
  },
});

export default Result;
