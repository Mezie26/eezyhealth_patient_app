import { ChevronDown } from "@/assets/svg/ChevronDown";
import { ChevronUp } from "@/assets/svg/ChevronUp";
import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from "react-native";

const CollapsibleSelector = ({ options, selected, onSelect } : {options: any, selected: any, onSelect: any}) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, options.length * 40], // Adjust height based on number of options
  });

  return (
    <View style={styles.container}>
      {/* Selector */}
      <TouchableOpacity style={styles.selector} onPress={toggleExpand}>
        <Text style={styles.selectedText}>{selected || "Select frequency"}</Text>
        {expanded ? <ChevronUp/> : <ChevronDown/>}
      </TouchableOpacity>

      {/* Collapsible Dropdown */}
      <Animated.View style={[styles.dropdown, { height: heightInterpolation }]}>
        {options.map((item: any) => (
          <TouchableOpacity
            key={item}
            style={styles.option}
            onPress={() => {
              onSelect(item);
              toggleExpand();
            }}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const {height} = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  selector: {
    height: 42,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D5D5D5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedText: {
    color: "#363636",
    fontSize: 14,
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    lineHeight: 15
  },
  dropdown: {
    backgroundColor: "#ecf0f1",
    overflow: "hidden",
    marginTop: 5,
    borderRadius: 8,
  },
  option: {
    padding: height * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: "#bdc3c7",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
});

export default CollapsibleSelector;