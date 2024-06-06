import React, { useState, useRef } from 'react';
import { ImageBackground, StyleSheet, Modal, FlatListText, FlatList, View, TouchableOpacity, ScrollView, Image, TextInput, Text, Linking, Button, TouchableWithoutFeedback } from 'react-native';
import InputTextField from './components/InputTextField';
import * as SMS from 'expo-sms';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatGPT from './src';
import Dropdown from './Dropdown';
import formatDisplayText from './Dropdown';

import i18next, { languageResources } from './services/i18next';
import {useTranslation} from "react-i18next";
import languagesList from './services/languagesList.json';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

const AuthScreens = ({ onLogin }) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" options={{ headerShown: false }}>
        {props => <Login {...props} onLogin={onLogin} />}
      </AuthStack.Screen>
      {/* ... other screens, if any ... */}
    </AuthStack.Navigator>
  );
};


const MainScreens = () => {
  return (
    <NavigationContainer independent = {true} >
      

      <Tab.Navigator initialRouteName='Login' screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#73a5ff',
        
        tabBarStyle: [{
          backgroundColor: '#2e64e6', // Set your own color
          borderTopColor: 'transparent',
          height: 100,
          
          
          // Add more styling as needed
        }]
        }}
        
      >

        

        <Tab.Screen name="Home" component={Home} 
          options={{headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              
              <Image
                source={require('./assets/home.png')}
                style={{
                  width: focused ? 28 : 20,
                  height: focused ? 28 : 20,
                  tintColor: focused ? "white" : "#73a5ff"
                   // Optional: if you want to change the color when focused
                }}
              />
            ),
          }}
        />
        <Tab.Screen name="Virtual Assistant" component={GPT} 
          options={{headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/messagess.png')}
                style={{
                  width: focused ? 28 : 20,
                  height: focused ? 28 : 20,
                  tintColor: focused ? "white" : "#73a5ff"
                   // Optional: if you want to change the color when focused
                }}
              />
            ),
          }}
        />
        <Tab.Screen name="Clinic" component={Hospital} 
          options={{headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/hospital.png')}
                style={{
                  width: focused ? 28 : 20,
                  height: focused ? 28 : 20,
                  tintColor: focused ? "white" : "#73a5ff"
                   // Optional: if you want to change the color when focused
                }}
              />
            ),
          }}
        />
        <Tab.Screen name="Info" component={Education} 
          options={{headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/list.png')}
                style={{
                  width: focused ? 28 : 20,
                  height: focused ? 28 : 20,
                  tintColor: focused ? "white" : "#73a5ff"
                   // Optional: if you want to change the color when focused
                }}
              />
            ),
          }}
        />

        <Tab.Screen name="Language" component={Language} 
          options={{headerShown: false, tabBarButton: () => null, tabBarVisible: false
          }}
        />
        <Tab.Screen name="Model" component={Model} 
          options={{headerShown: false, tabBarButton: () => null, tabBarVisible: false
          }}
        />
        {/* Add more Tab.Screen as needed */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  
  
      
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      const handleLogin = () => {
        setIsLoggedIn(true);
      };

      return (
        <NavigationContainer>
          {isLoggedIn ? <MainScreens /> : <AuthScreens onLogin={handleLogin} />}
        </NavigationContainer>
      );
  
};


      
     
const Model = (props) => {
  const dropdownOptions = ['Continent', 'Integumentary System', 'Digestive System', 'Respiratory System', 'Eyes', 'Musculoskeletal System', 'Body Temperature', 'Urinary System', 'Emotions/Energy', 'Circulatory System', 'Other Symptoms']
  const continentOptions = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

  const symptoms = [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "muscle_wasting",
    "vomiting",
    "burning_micturition",
    "spotting_urination",
    "fatigue",
    "weight_gain",
    "anxiety",
    "cold_hands_and_feets",
    "mood_swings",
    "weight_loss",
    "restlessness",
    "lethargy",
    "patches_in_throat",
    "irregular_sugar_level",
    "cough",
    "high_fever",
    "sunken_eyes",
    "breathlessness",
    "sweating",
    "dehydration",
    "indigestion",
    "headache",
    "yellowish_skin",
    "dark_urine",
    "nausea",
    "loss_of_appetite",
    "pain_behind_the_eyes",
    "back_pain",
    "constipation",
    "abdominal_pain",
    "diarrhoea",
    "mild_fever",
    "yellow_urine",
    "yellowing_of_eyes",
    "acute_liver_failure",
    "fluid_overload",
    "swelling_of_stomach",
    "swelled_lymph_nodes",
    "malaise",
    "blurred_and_distorted_vision",
    "phlegm",
    "throat_irritation",
    "redness_of_eyes",
    "sinus_pressure",
    "runny_nose",
    "congestion",
    "chest_pain",
    "weakness_in_limbs",
    "fast_heart_rate",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "irritation_in_anus",
    "neck_pain",
    "dizziness",
    "cramps",
    "bruising",
    "obesity",
    "swollen_legs",
    "swollen_blood_vessels",
    "puffy_face_and_eyes",
    "enlarged_thyroid",
    "brittle_nails",
    "swollen_extremeties",
    "excessive_hunger",
    "extra_marital_contacts",
    "drying_and_tingling_lips",
    "slurred_speech",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "spinning_movements",
    "loss_of_balance",
    "unsteadiness",
    "weakness_of_one_body_side",
    "loss_of_smell",
    "bladder_discomfort",
    "foul_smell_of_urine",
    "continuous_feel_of_urine",
    "passage_of_gases",
    "internal_itching",
    "toxic_look_(typhos)",
    "depression",
    "irritability",
    "muscle_pain",
    "altered_sensorium",
    "red_spots_over_body",
    "belly_pain",
    "abnormal_menstruation",
    "dischromic_patches",
    "watering_from_eyes",
    "increased_appetite",
    "polyuria",
    "family_history",
    "mucoid_sputum",
    "rusty_sputum",
    "lack_of_concentration",
    "visual_disturbances",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "coma",
    "stomach_bleeding",
    "distention_of_abdomen",
    "history_of_alcohol_consumption",
    "blood_in_sputum",
    "prominent_veins_on_calf",
    "palpitations",
    "painful_walking",
    "pus_filled_pimples",
    "blackheads",
    "scurring",
    "skin_peeling",
    "silver_like_dusting",
    "small_dents_in_nails",
    "inflammatory_nails",
    "blister",
    "red_sore_around_nose",
    "yellow_crust_ooze",
  ];
  const skin = [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "cold_hands_and_feets",
    "yellowish_skin",
    "puffy_face_and_eyes",
    "brittle_nails",
    "swollen_extremeties",
    "blister",
    "inflammatory_nails",
    "small_dents_in_nails",
    "skin_peeling",
    "pus_filled_pimples",
    "blackheads",
    "scurring",
    "red_spots_over_body",
    "dischromic_patches",
  ];
  const digestion = [
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "vomiting",
    "weight_gain",
    "weight_loss",
    "patches_in_throat",
    "irregular_sugar_level",
    "indigestion",
    "loss_of_appetite",
    "constipation",
    "abdominal_pain",
    "diarrhoea",
    "swelling_of_stomach",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "stomach_bleeding",
    "irritation_in_anus",
    "cramps",
    "excessive_hunger",
    "passage_of_gases",
    "belly_pain",
    "increased_appetite",
    "distention_of_abdomen",
    "nausea",
    "acute_liver_failure",
  ];
  const ent_respiratory = [
    "continuous_sneezing",
    "cough",
    "breathlessness",
    "runny_nose",
    "congestion",
    "sinus_pressure",
    "patches_in_throat",
    "phlegm",
    "throat_irritation",
    "loss_of_smell",
    "mucoid_sputum",
    "rusty_sputum",
    "blood_in_sputum",
  ];
  const eyes = [
    "sunken_eyes",
    "pain_behind_the_eyes",
    "yellowing_of_eyes",
    "blurred_and_distorted_vision",
    "redness_of_eyes",
    "watering_from_eyes",
    "visual_disturbances",
  ];
  const musculoskeletal = [
    "joint_pain",
    "muscle_wasting",
    "weakness_in_limbs",
    "cramps",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "muscle_pain",
    "painful_walking",
  ];
  const body_temperature = ["shivering", "chills", "high_fever", "sweating", "mild_fever"];
  const urinary = [
    "burning_micturition",
    "spotting_urination",
    "dark_urine",
    "yellow_urine",
    "bladder_discomfort",
    "foul_smell_of_urine",
    "continuous_feel_of_urine",
    "polyuria",
  ];
  const emotional = [
    "anxiety",
    "lethargy",
    "depression",
    "irritability",
    "fatigue",
    "restlessness",
    "mood_swings",
  ];
  const circulatory = [
    "irregular_sugar_level",
    "fast_heart_rate",
    "swollen_blood_vessels",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "prominent_veins_on_calf",
    "palpitations",
  ];
  let other = [];
  for (let i of symptoms) {
    if (
      skin.includes(i) ||
      digestion.includes(i) ||
      ent_respiratory.includes(i) ||
      eyes.includes(i) ||
      musculoskeletal.includes(i) ||
      body_temperature.includes(i) ||
      urinary.includes(i) ||
      emotional.includes(i) ||
      circulatory.includes(i)
    ) {
      // Do nothing
    } else {
      other.push(i);
    }
  }

  const allDropdowns = [continentOptions, skin, digestion, ent_respiratory, eyes, musculoskeletal, body_temperature, urinary, emotional, circulatory, other];
  let patientSymp = "";


  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const handleToggleDropdown = (id) => {
    if (activeDropdownId === id) {
      setActiveDropdownId(null);
    } else {
      setActiveDropdownId(id);
    }
  };

  const handleCloseDropdown = () => {
    setActiveDropdownId(null);
  };

  

  let continent = "";
  let skinselect = "";
  let digestionselect = "";
  let respiratoryselect = "";
  let eyeselect = "";
  let musculoskeletalselect = "";
  let temperatureselect = "";
  let urinaryselect = "";
  let emotionselect = "";
  let circulatoryselect = "";
  let otherselect = "";
  const strings = [continent, skinselect, digestionselect, respiratoryselect, eyeselect, musculoskeletalselect, temperatureselect, urinaryselect, emotionselect, circulatoryselect, otherselect];
  const [prediction, setPrediction] = useState('');
  //console.log(prediction.length);
  const performPrediction = async (inputList) => {
    try {
      let response = await fetch(process.env.SERVER_LINK, { //Change the link whenever you need to run the app freshly through ngrok. Make sure you put /predict at the end. ngrok http 5000
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input: inputList}),
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      let jsonResponse = await response.json();
      
      
      setPrediction(jsonResponse.prediction); // Update the state with the response
      console.log(jsonResponse); // Process your response here
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  

  

  return (
    
      
      <TouchableWithoutFeedback onPress={handleCloseDropdown}>
        <ScrollView style={styles.container}>
          <View style={{ marginTop: 60 }}>
            <Text>Enter your continent and any symptoms you have.</Text>
            {/* First dropdown */}
            {dropdownOptions.slice(0, 1).map((option, index) => (
              <Dropdown
                key={index}
                options={allDropdowns[index]}
                defaultText={dropdownOptions[index]}
                onSelect={() => {}}
                isVisible={activeDropdownId === index}
                toggleDropdown={() => handleToggleDropdown(index)}
                ind={index}
                symptomString={strings[index]}
                strings = {strings}
                
              />
            ))}
            
            {/* Start mapping from the second dropdown */}
            {dropdownOptions.slice(1).reduce((rows, option, index) => {
              // Calculate the row index
              let rowIndex = Math.floor(index / 2);
              // Create a new row if it doesn't exist
              if (!rows[rowIndex]) {
                rows[rowIndex] = [];
              }
              // Add the dropdown to the current row
              rows[rowIndex].push(
                <View style={styles.dropdownWrapper} key={index + 1}>
                  <Dropdown
                    options={allDropdowns[index + 1]}
                    defaultText={dropdownOptions[index + 1]}
                    onSelect={() => {}}
                    isVisible={activeDropdownId === index + 1}
                    toggleDropdown={() => handleToggleDropdown(index + 1)}
                    ind={index + 1}
                    symptomString={strings[index+1]}
                    strings = {strings}
                    
                  />
                </View>
              );
              return rows;
            }, []).map((row, rowIndex) => (
              // Render each row as a separate View
              <View style={styles.row} key={rowIndex}>
                {row}
              </View>
            ))}
            
          </View>
          <Button onPress={() => performPrediction(strings)} title = "Predict"></Button>
          <View>
            <View style = {[styles.modelOutput]}>
              <Text style = {styles.outputText}>{prediction}</Text>
              
            </View>
            
          </View>
          <View style={{flex:1}}>
            
            {prediction.length > 0 && (
              <View style={styles.bottomTextContainer}>
                <Text style={[styles.bottomText, {color:"grey", fontSize:12}]}>
                  Note: This is a medical prediction, not diagnosis. Please refer to your doctor for a professional diagnosis.
                </Text>
                <Text></Text>
                <Text style={styles.bottomText}>
                  Want to know more about {prediction}? Ask our AI Chatbot any questions you have.
                </Text>
              </View>
            )}

            
          </View>
          {prediction.length > 0 && (
          <Image source = {require("./assets/arrow.png")} style = {{width:60, height:90, marginLeft:66, marginBottom:15, marginTop:-15}}></Image>
          )}

          
        </ScrollView>
        
      </TouchableWithoutFeedback>
      
    
  );
}
//Login page
const Login = ({ onLogin }) => {
  
  const login = async () => {
    // Perform login logic...
    onLogin();
  };
  

  return (
    <ScrollView style ={styles.container}>
      <View style = {{marginTop:30}}>
        <View style = {{marginTop:60, alignItems: "center", justifyContent: "center"}}>
          <Image source = {require("./assets/logo.png")} style = {{height: 200, width:200,}}></Image>
          

        </View>
        <View style={{marginTop:48, flexDirection:"row", justifyContent: "center"}}>
          <TouchableOpacity>
            <View style={styles.socialButton}>
              <Image source = {require("./assets/facebook.png")} style = {styles.socialLogo}></Image>
              <Text style = {styles.text}>Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style = {styles.socialButton}>
              <Image source = {require("./assets/google.png")} style = {styles.socialLogo}></Image>
              <Text style = {styles.text}>Google</Text>
            </View>
          </TouchableOpacity>

        </View>
        
        <Text style = {[styles.text, {color: "#ABB4BD", fontSize: 15, textAlign: "center", marginVertical: 20}]}>or</Text>


        <InputTextField title="Email"></InputTextField>
        <InputTextField style = {{marginTop:32, marginBottom:8}} title="Password" isSecure = {true}></InputTextField>


        <Text style = {[styles.text, styles.link, {textAlign:"right"}]}>Forgot Password?</Text>

        <TouchableOpacity style={styles.submitContainer} onPress = {login}>
          <Text style={[styles.text, {color:"#fff", fontWeight: "600", fontSize:16}]}>Login</Text>
        </TouchableOpacity>

        <Text style={[styles.text, {fontSize:14, color:"#ABB4BD", textAlign:"center", marginTop:24}]}>
          Don't have an account? <Text style = {[styles.text, styles.link]}>Register Now</Text>
        </Text>


        
      </View>
    </ScrollView>
    
  );
}

//Homepage/Dashboard
const Home = props => {

  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);
  const changeLng = lng => {
    i18next.changeLanguage(lng);
    setVisible(false);
  }
  

  const onAppts = () => {
    props.navigation.navigate('Appointments');
    
  };
  const onModel = () => {
    props.navigation.navigate('Model');
    
  };
  const onGPT = () => {
    props.navigation.navigate('Virtual Assistant');
    
  };
  const onMedication = () => {
    props.navigation.navigate('Medications');
    
  };
  const onLanguage = () => {
    props.navigation.navigate('Language');
    
  };
  const onEducation = () => {
    props.navigation.navigate('Education');
    
  };
  const onHospital = () => {
    props.navigation.navigate('Hospital');
    
  };
  
  const [isCollapsed1, setIsCollapsed1] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(true);
  return (
    <ScrollView style ={styles.container}>
      <View>
        
        <View>

        

          {/* Circular button on top right */}
          <TouchableOpacity
            style={[styles.circleButton, {marginTop: 20, marginRight: -45}]}
            onPress={onLanguage}>
            
            <Image source = {require("./assets/globe.png")} style = {[styles.dashPic, {marginHorizontal: 10, width: 40, height: 40, tintColor:"black"}]} onPress={onLanguage}></Image>
          </TouchableOpacity>


          

            <View style={{marginTop:60, flexDirection:"row", justifyContent: "left"}}>
              <Text style = {{fontFamily: "Avenir Next", fontSize:30, color: "#2e64e6", fontWeight: 'bold'}}>Welcome,</Text>
            </View>
            <View style={{marginTop: 10, flexDirection:"row", justifyContent: "left"}}>
              <Text style = {{fontFamily: "Avenir Next", fontSize:35, color: "#2e64e6", fontWeight:'bold'}}>Chetan Gorantla!</Text>
            </View>
            {/* Your other components go here, they will be rendered in front of the background */}

          
          
          
        
          



          
          
            <View style = {[styles.dashButton, {marginTop:20,}]}>
                <Text style={[styles.head]}>Appointment Details</Text>
                <View style = {{alignContent:"flex-end", marginTop:25}}>
                  <TouchableOpacity style = {[{flexDirection:"row", paddingHorizontal:10}]} onPress={ ()=>{ Linking.openURL('https://www.kelsey-seybold.com/')}} >
                    <Image source = {require("./assets/timer.png")} style = {[styles.dashPic, {marginTop:10, tintColor: "#69b2a7", width: 40, height: 40,marginLeft:-10}]}></Image>
                    <Text style = {[styles.text, {textAlign:"right", color: "#69b2a7", fontWeight: 500, marginLeft:20}]}>Kelsey Seybold - Thyroid Checkup{"\n"}February 10, 2024{"\n"}3:15 - 3:45 pm</Text>
                    
                  </TouchableOpacity>
                  <TouchableOpacity style = {[{}]} onPress={ ()=>{ Linking.openURL('https://www.kelsey-seybold.com/')}}>
                    <Text style = {[styles.text, {textAlign: "right"}]}>Kelsey Seybold - Bone Density Scan{"\n"}March 24, 2024{"\n"}10:30 - 11 am</Text>
                    
                  </TouchableOpacity>
                </View>
                
                
            </View>
            
          
          
            {//
}
          <TouchableOpacity style={[styles.appointment,{marginTop:35, flexDirection:"column", justifyContent: "center"}]} onPress={()=>{ Linking.openURL('https://www.arthritis.org/drug-guide/medication-topics/understanding-methotrexate')}}>
            <Text style={[styles.head]}>Medication Info</Text>
            <View style = {[{flexDirection:"row"}]}>
              <View style = {[{flexDirection:"column", alignContent: "center"}]}>
                    <Text style = {[styles.text, {fontWeight: "bold"}]}>Oral Methotrexate</Text>
                    <Text style = {styles.text}>Arthritis Prescription</Text>
                    <Text></Text>
                    <Text style = {[styles.text, {fontWeight: "bold"}]}>Doctor Note:</Text>
                    <Text style = {styles.text}>Take 7.5 mg per week</Text>
                </View>

                
              <View>
                <Image source = {require("./assets/methotrexate.jpg")} style = {[styles.dashPic, {marginHorizontal: 10}]}></Image>
              </View>
            </View>
            
            
          </TouchableOpacity>
          
          
        
            
          
        

          {/*
          <View style={{marginTop:35, flexDirection:"row", justifyContent: "center"}}>
            <TouchableOpacity onPress={onAppts} style = {{}}>
              <View style={[styles.dashButton, {justifyContent: "center", backgroundColor: "#C7D3D6"}]}>
                <Image source = {require("./assets/calendar.png")} style = {styles.dashPic}></Image>
                <Text style = {[styles.centeredText, {color: "#1A515F", fontWeight:"600"}]}>{t("appointments")}</Text>
                
                
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLanguage}>
              <View style={[styles.dashButton, {justifyContent: "center", backgroundColor: "#C7D3D6"}]}>
                <Image source = {require("./assets/globe.png")} style = {styles.dashPic}></Image>
                <Text style = {[styles.centeredText, {color: "#1A515F", fontWeight:"600"}]}>{t("languages")}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{marginTop:35, flexDirection:"row", justifyContent: "center"}}>
            <TouchableOpacity onPress={onMedication}>
              <View style={[styles.dashButton, {justifyContent: "center", backgroundColor: "#C7D3D6"}]}>
                <Image source = {require("./assets/medications.png")} style = {styles.dashPic}></Image>
                <Text style = {[styles.centeredText, {color: "#1A515F", fontWeight:"600"}]}>{t("medications")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onGPT}>
              <View style={[styles.dashButton, {justifyContent: "center", backgroundColor: "#C7D3D6", height:240, paddingHorizontal:35}]}>
                <Image source = {require("./assets/messages.png")} style = {{width: 110, height: 107}}></Image>
                <Text style = {[styles.centeredText, {color: "#1A515F", fontWeight:"600"}]}>{t("chatwitha")}</Text>
                <Text style = {[styles.centeredText, {color: "#1A515F", fontWeight:"600"}]}>{t("professional")}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{marginTop:35, flexDirection:"row", justifyContent: "center"}}>
            <TouchableOpacity onPress = {onHospital}>
              <View style={[styles.dashButton, {justifyContent: "center", backgroundColor: "#C7D3D6"}]}>
                <Image source = {require("./assets/hospital.png")} style = {styles.dashPic}></Image>
                <Text style = {[styles.centeredText, {color: "#1A515F", fontWeight:"600"}]}>{t("hospital")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onEducation}>
              <View style={[styles.dashButton, {justifyContent: "center", backgroundColor: "#C7D3D6"}]}>
                <Image source = {require("./assets/education.png")} style = {styles.dashPic}></Image>
                <Text style = {[styles.centeredText, {color: "#1A515F", fontWeight:"600"}]}>{t("education")}</Text>
              </View>
            </TouchableOpacity>
          </View>
          */}
{// ()=>{ Linking.openURL('https://kgkdiagnosticsupdate.streamlit.app/General_Disease')}
}
          <View style={{marginTop:35, flexDirection:"row", justifyContent: "center"}}>
            <TouchableOpacity onPress={onModel}>
              <View style={[styles.dashButton, {justifyContent: "center", backgroundColor: "white", width: 320, height:150, marginBottom:40}]}>
                <Image source = {require("./assets/magnifying.png")} style = {[styles.dashPic, {alignSelf:"center"}]}></Image>
                <Text style = {[styles.centeredText, {color: "black", fontWeight:"600"}]}>Disease Prediction</Text>
              </View>
            </TouchableOpacity>
          </View>
          
        </View>
        <Image source = {require("./assets/reading.png")} style={{ width: 330, height: 300, resizeMode: "contain", tintColor:"black" }}></Image>
      </View>
      
    </ScrollView>
  );
}

//Appointments
const Appointments = () => {
  
  return (
    <ScrollView style ={styles.container}>
      <View>
        <View>
          
            <TouchableOpacity style = {[styles.appointment, {alignItems: "center"}]} onPress={ ()=>{ Linking.openURL('https://www.kelsey-seybold.com/')}} >
              <Text style = {[styles.text]}>Kelsey Seybold - Thyroid Checkup February 10, 2024 at 3:15 - 3:45 pm</Text>
              
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.appointment, {alignItems: "center"}]} onPress={ ()=>{ Linking.openURL('https://www.kelsey-seybold.com/')}}>
              <Text style = {[styles.text]}>Kelsey Seybold - Bone Density Scan March 24, 2024 at 10:30 - 11 am</Text>
              
            </TouchableOpacity>
          
        </View>
        
      </View>
      <Text style = {[styles.link]}>Want to schedule an appointment?</Text>

      <Image source = {require("./assets/reading.png")} style={{ width: 330, height: 500, resizeMode: "contain" }}></Image>
    </ScrollView>
  )
}

//ChatGPT
const GPT = () => {
  return (
    <View style = {styles.container}>
      <ChatGPT/>
    </View>
  )
}

const Language = () => {
  
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);
  const changeLng = lng => {
    i18next.changeLanguage(lng);
    setVisible(false);
  }
  const onPressHandler = event => setText("Changed text");
  state = {
    textValue: 'Change me'
  }
  onEs = () => {
    this.setState({
      textValue: 'Espanol'
    })
  }



  const [welcomeText, setWelcomeText] = useState('Welcome to MedSync!');

  const enPress = () => {
    // Change the welcome text when TouchableOpacity is pressed
    setWelcomeText('Welcome to MedSync!');
  };
  const esPress = () => {
    // Change the welcome text when TouchableOpacity is pressed
    setWelcomeText('¡Bienvenido a MedSync!');
  };
  const frPress = () => {
    // Change the welcome text when TouchableOpacity is pressed
    setWelcomeText('Bienvenue sur MedSync!');
  };
  const gePress = () => {
    // Change the welcome text when TouchableOpacity is pressed
    setWelcomeText('Willkommen bei MedSync!');
  };
  const hiPress = () => {
    // Change the welcome text when TouchableOpacity is pressed
    setWelcomeText('स्टेसेफ में आपका स्वागत है!');
  };


  return (
    <View>
      <ScrollView style = {{marginTop: 65}}>
        <TouchableOpacity style = {[styles.socialButton,]} >
          <Button title = "Arabic"></Button>
        </TouchableOpacity>
        <TouchableOpacity style = {[styles.socialButton,]} onPress = {enPress}>
          <Button title = "English"></Button>
        </TouchableOpacity>
        <TouchableOpacity style = {[styles.socialButton,]} onPress = {esPress}>
          <Button title = "Español"></Button>
        </TouchableOpacity>
        <TouchableOpacity style = {[styles.socialButton,]} onPress = {frPress}>
          <Button title = "French"></Button>
        </TouchableOpacity>
        <TouchableOpacity style = {[styles.socialButton,]} onPress = {gePress}>
          <Button title = "German"></Button>
        </TouchableOpacity>
        <TouchableOpacity style = {[styles.socialButton,]} onPress = {hiPress}>
          <Button title = "Hindi"></Button>
        </TouchableOpacity>
        <TouchableOpacity style = {[styles.socialButton,]}>
          <Button title = "Japanese"></Button>
        </TouchableOpacity>
      
      </ScrollView>
      <Text style={[styles.welcomeText]}>{welcomeText}</Text>
    </View>
    
  );
  
}

const Messages = () => {
  /*
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  //This function checks if device has sms capabilities
  const checkSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable){
      alert('SMS is available on this device');

    }else{
      alert('SMS is not available on this device');
    }
  }
  //This function sends message to number using the native SMS app
  const sendSMS = async () => {
    const {result} = await SMS.sendSMSAsync(number, message);
    if (result === 'sent'){
      alert('Message sent successfully')
    }
  }

  return (
    <ScrollView style ={styles.container}>
      <View style = {{marginTop:250}}>
        <Button
          title = 'Check SMS Availability'
          onPress = {checkSMS}
          

        />
        <TextInput
          style = {styles.input}
          placeholder = 'Enter phone number'
          value = {number}
          onChangeText = {setNumber}
          keyboardType = 'phone-pad'
        />
        <TextInput
          style = {styles.input}
          placeholder = 'Enter message'
          value = {message}
          onChangeText = {setMessage}
          multiline
        />
        <Button
          title = 'Send Message' onPress = {sendSMS}
        />
      </View>
      
    </ScrollView>
  )
  */
}

const Hospital = () => {
  return (
    <ScrollView style ={styles.container}>
      <TouchableOpacity style={[{marginTop:50, flexDirection:"row", justifyContent: "center"}]} onPress={ ()=>{ Linking.openURL('https://www.google.com/maps/place/Kelsey-Seybold+Clinic+%7C+Fort+Bend+Medical+and+Diagnostic+Center/@29.6106636,-95.6426212,17.25z/data=!4m6!3m5!1s0x8640e6cdf2770111:0xd2dc07dc945f1977!8m2!3d29.6104376!4d-95.6409306!16s%2Fg%2F1wz532mr?entry=ttu')}}>
            <View style = {[styles.appointment, {flexDirection:"column", justifyContent:"center"}]}>
              <Image source = {require("./assets/map.png")} style = {{width:350, height:400, marginHorizontal:0}}></Image>
          
            </View>
      </TouchableOpacity>
      <Text style = {[styles.text, {fontWeight: "bold"}]}>
        Kelsey Seybold Clinic
      </Text>
      <Text style = {[styles.text, ]}>
        Open: 8 AM - 5 PM CST
      </Text>
      <Text style = {[styles.text, ]}>
        Address: 11555 University Blvd, Sugar Land, TX 77478
      </Text>
      <Text style = {[styles.text, ]}>
        Phone: (713) 442-9100
      </Text>

    </ScrollView>
  )
}


const Education = () => {
  return (
    <ScrollView style ={styles.container}>
      <TouchableOpacity style={[{marginTop:35, flexDirection:"row", justifyContent: "center"}]} onPress={ ()=>{ Linking.openURL('https://www.youtube.com/watch?v=Do-s0LXmwn4')}}>
            <View style = {[styles.appointment, {flexDirection:"column", justifyContent:"center"}]}>
              <Image source = {require("./assets/l1.png")} style = {{width:170, height:100, marginHorizontal:5}}></Image>
              <Text style = {[styles.text, {fontWeight: "bold"}]}>What is osteoarthritis?</Text>
              <Text style = {styles.text}>YouTube Video</Text>
            </View>
      </TouchableOpacity>

      <TouchableOpacity style={[{marginTop:35, flexDirection:"row", justifyContent: "center"}]} onPress={ ()=>{ Linking.openURL('https://www.youtube.com/watch?v=c91ggTlEGv8')}}>
            <View style = {[styles.appointment, {flexDirection:"column", justifyContent:"center"}]}>
              <Image source = {require("./assets/l2.png")} style = {{width:170, height:100, marginHorizontal:5}}></Image>
              <Text style = {[styles.text, {fontWeight: "bold"}]}>Chronic Disease</Text>
              <Text style = {styles.text}>YouTube Video</Text>
            </View>
      </TouchableOpacity>

      <TouchableOpacity style={[{marginTop:35, flexDirection:"row", justifyContent: "center"}]} onPress={ ()=>{ Linking.openURL('https://my.clevelandclinic.org/health/diagnostics/17649-blood-pressure')}}>
            <View style = {[styles.appointment, {flexDirection:"column", justifyContent:"center"}]}>
              <Image source = {require("./assets/article.jpg")} style = {{width:170, height:140, marginHorizontal:5}}></Image>
              <Text style = {[styles.text, {fontWeight: "bold"}]}>Blood Pressure</Text>
              <Text style = {styles.text}>Article</Text>
            </View>
      </TouchableOpacity>

      <TouchableOpacity style={[{marginTop:35, flexDirection:"row", justifyContent: "center"}]} onPress={ ()=>{ Linking.openURL('https://www.health.harvard.edu/topics/arthritis')}}>
            <View style = {[styles.appointment, {flexDirection:"column", justifyContent:"center"}]}>
              <Image source = {require("./assets/article.jpg")} style = {{width:170, height:140, marginHorizontal:5}}></Image>
              <Text style = {[styles.text, {fontWeight: "bold"}]}>General Arthritis Info</Text>
              <Text style = {styles.text}>Article</Text>
            </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

//Medications
const Medications = props => {
  const onGPT = () => {
    props.navigation.navigate('Virtual Assistant');
    
  };
  
  return (
    <ScrollView style ={styles.container}>
      <View>
        <View>
          <TouchableOpacity style={{marginTop:35, flexDirection:"row", justifyContent: "center"}} onPress={ ()=>{ Linking.openURL('https://www.arthritis.org/drug-guide/medication-topics/understanding-methotrexate')}}>
            <View style = {[styles.appointment, {flexDirection:"column"}]}>
                <Text style = {[styles.text, {fontWeight: "bold"}]}>Oral Methotrexate</Text>
                <Text style = {styles.text}>Arthritis Prescription</Text>
            </View>

            
              <View>
                <Image source = {require("./assets/methotrexate.jpg")} style = {[styles.dashPic, {marginHorizontal: 10}]}></Image>
              </View>
            

          </TouchableOpacity>
          
          
            <View style = {[styles.appointment, {flexDirection:"column"}]}>
              <Text style = {[styles.text, {fontWeight: "bold"}]}>Doctor Note:</Text>
              <Text style = {styles.text}>Take 7.5 mg per week</Text>

              
            </View>
            
          
        </View>

        <View style = {[styles.footerInfo, {flexDirection:"column"}]}>
          <Text>Got a question?</Text>
          
            
            <Text style={{}}>   </Text>
            <TouchableOpacity style= {[{}]} onPress = {onGPT}>
            <Text style = {[styles.text, styles.link]}>Ask a professional</Text>
            </TouchableOpacity>
          
          
        </View>
      </View>
      <Image source = {require("./assets/dog.png")} style={{ width: 330, height: 440, resizeMode: "contain" }}></Image>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bottomTextContainer: {
    position: 'relative', // Position the view at the bottom
    //bottom: 37,
    left: 0,
    right: 0,
    height: 150, // Set a specific height for the text container
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: 'transparent', // Set background color or make it transparent
    
  },
  bottomText: {
    textAlign: 'center', // Ensure text is centered within the text container
    // Additional text styling
  },
  modelOutput:{
    
    //marginBottom:20,
    alignContent:"center",
    alignItems:"center",
    
    
  },
  outputText:{
    fontFamily:"Avenir Next",
    fontSize:30,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust as needed for spacing
    marginBottom: 10, // Spacing between rows
  },
  dropdownWrapper: {
    width: '48%', // slightly less than half to fit two side by side with some space
    // padding or margin as necessary, for example:
    marginBottom: 10,
  },
  
  circleButton: {
    position: 'absolute',
    right: 10, // Adjust the distance from the right as needed
    top: 10, // Adjust the distance from the top as needed
    //backgroundColor: '#007AFF', // Button color
    width: 100, // Diameter of the circular button
    height: 100, // Diameter of the circular button
    borderRadius: 30, // Half the width/height to make it circular
    justifyContent: 'center', // Center the text/icon vertically
    alignItems: 'center', // Center the text/icon horizontally
    elevation: 3, // Add elevation for Android (optional)
  },
  welcomeText:{
    fontFamily: "Avenir Next",
    fontSize: 20,
    color: "#1D2029",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  head:{
    fontFamily: "Avenir Next",
    fontSize: 20,
    color: "black",
    textAlign: "left",
    marginTop: 0,
    fontWeight: 600,
  },
  languageList:{
    flex:1,
    justifyContent:'center',
    padding:10,
    marginVertical: 30

    
  },
  container:{
    flex:1,
    backgroundColor:"white",
    paddingHorizontal:30
  },
  text: {
    fontFamily: "Avenir Next",
    color: "#1D2029"
  },
  centeredText: {
    fontFamily: "Avenir Next",
    fontSize: 15,
    color: "#1D2029",
    textAlign: "center"
  },
  appointment: {
    flexDirection: "row",
    marginHorizontal: 0,
    marginVertical: 15,
    paddingVertical: 20,
    paddingHorizontal: 38,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(171, 180, 189, 0.65)",
    borderRadius:4,
    backgroundColor: "#fff",
    shadowColor: "rgba(171, 180, 189, 0.35)",
    shadowOffset: {width:0, height:10},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  footerInfo:{
    flexDirection: "row",
    marginHorizontal: 0,
    marginVertical: 15,
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  socialButton: {
    flexDirection: "row",
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 38,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(171, 180, 189, 0.65)",
    borderRadius:4,
    backgroundColor: "#fff",
    shadowColor: "rgba(171, 180, 189, 0.35)",
    shadowOffset: {width:0, height:10},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    
    
  },
  dashButton: {
    
    marginHorizontal:5,
    paddingVertical: 15,
    paddingHorizontal:20,
    height: 200,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(171, 180, 189, 0.65)",
    borderRadius:4,
    backgroundColor: "#fff",
    shadowColor: "rgba(171, 180, 189, 0.35)",
    shadowOffset: {width:0, height:10},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    color:"#C7D3D6"

  },
  
  socialLogo: {
    width: 16,
    height: 16,
    marginRight: 8

  },
  dashPic: {
    width:100,
    height:100,
    
  },
  medPic:{
    width:200,
    height:200,
  },
  link: {
    color: "#2e64e6",
    fontSize: 14,
    fontWeight:"500"
  },
  submitContainer: {
    backgroundColor:"#2e64e6",
    fontSize: 16,
    borderRadius: 4,
    paddingVertical: 12,
    marginTop:32,
    alignItems: "center",
    justifyContent:"center",
    shadowColor: "#2e64e6",
    shadowOffset: {width:0, height:9},
    shadowOpacity:1,
    shadowRadius:15
  },
  input:{
    width:300,
    height:40,
    borderColor:'gray',
    borderWidth:StyleSheet.hairlineWidth,
    margin:10,
    padding:10
  }

});

export default App;
