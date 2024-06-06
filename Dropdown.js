import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';


const formatDisplayText = (text) => {
  return text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};



const Dropdown = ({options, defaultText, onSelect, ind, symptomString, strings, }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultText);

  const toggleDropdown = () => setIsVisible(!isVisible);

  

  const onOptionSelect = (option) => {
    setSelectedOption(formatDisplayText(option)); // Display formatted text
    onSelect(option); // Keep original text for backend processes
    toggleDropdown();
    
    symptomString = formatDisplayText(option);
    strings[ind] = symptomString
    console.log(strings);
    
    
  };

  
  const [isNoteVisible, setNoteVisible] = useState(false);

  const toggleNote = () => {
    setNoteVisible(!isNoteVisible);
  };
  let out;
  if (ind == 1){
    out = "Symptoms related to skin"
  }else if (ind == 2){
    out = "Stomach Issues"
  }else if (ind == 3){
    out = "Breathing Issues"
  }else if (ind == 5){
    out = "Symptoms related to bones/muscles"
  }else if (ind == 9){
    out = "Symptoms related to blood"
  }

  return (
    
    <View style={isVisible ? styles.dropdownContainerActive : styles.dropdownContainer}>
      <TouchableOpacity onPress={toggleDropdown} style={[(ind === 0) ? styles.button:styles.shortButton]}>
        <Text style={selectedOption === defaultText ? { color: "black", fontWeight:"600" } : { color: "#2e64e6", fontWeight:"600" }}>{selectedOption}</Text>
        {(ind !== 0 && ind !== 4 && ind !== 6 && ind !== 7 && ind !== 8 && ind !== 10) && (
          <TouchableOpacity style = {[styles.alignedQuestion]} onPress = {(e) => {
            e.stopPropagation();
            toggleNote();
          }}>
            <Image source={require('./assets/question.png')} style = {[styles.question]}/>
          </TouchableOpacity>
        )}
        
      </TouchableOpacity>
      {isNoteVisible && (
        <TouchableOpacity style={styles.noteContainer} onPress={toggleNote}>
          
          <Text style={styles.noteText}>{out}</Text>
          
          
        </TouchableOpacity>
      )}
      {isVisible && (
        <View style={[(ind === 0) ? styles.optionsContainer:styles.shortOptionsContainer]}>
          <ScrollView>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => onOptionSelect(option)}
              >
                <Text>{formatDisplayText(option)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
  
};

const styles = StyleSheet.create({
  noteContainer: {
    position: 'absolute',
    right: 10,
    bottom: -10, // Adjust as needed
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 4000, // Make sure the zIndex is higher than the surrounding elements
    // Shadow properties for iOS
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 1, width: 0 },
    // Elevation for Android
    elevation: 3,
  },
  alignedQuestion:{
    position: 'absolute',
    right: 10, // Adjust the right position as needed
    bottom: 0, // Adjust the bottom position as needed
    

  },
  question:{
    width:20,
    height:20,
    bottom:3
  },
  button: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 15,
    height:50,
    width:320,
    zIndex:0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  shortButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,
    width: 150,
    height:70,
    zIndex:0
    
  },

  optionsContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    maxHeight: 250, // Set a maximum height that works for your layout

    
    marginVertical:9
  },
  shortOptionsContainer: {
    backgroundColor: 'white',
    position: 'relative',
    //top: 50,
    left: 0,
    right: 0,
    zIndex: 4000,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    maxHeight: 250, // Set a maximum height that works for your layout
    maxWidth:150,
    marginVertical:9
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    
  },
  dropdownContainer: {
    zIndex: 0, // regular stack order
  },
  dropdownContainerActive: {
    zIndex: 3000, // on top of other elements
  },
});

export default Dropdown;
