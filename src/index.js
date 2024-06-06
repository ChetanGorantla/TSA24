import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native'
import React, {useState} from 'react'
import axios from 'axios'



const ChatGPT = () => {
    const [data, setData] = useState([]);
    const apiKey = ""
    const apiUrl = 'https://api.openai.com/v1/chat/completions'
    const [textInput, setTextInput] = useState('');

    const handleSend = async () => {
        const prompt = textInput;
        try {
            const response = await axios.post(
                apiUrl,
                {
                    model: 'gpt-4-1106-preview',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: prompt },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );
    
            // Log the request and response for debugging
            console.log('Request:', response.config);
            console.log('Response:', response.data);
    
            const text = response.data.choices[0].message.content;
            setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: text }]);
            setTextInput('');
        } catch (error) {
            // Handle any errors that occur
            console.error('Error:', error.response?.data || error.message);
        }
    };
    
    
    
    

    return(
        <KeyboardAvoidingView 
          style={{flex: 1}} 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >

        
        <View style = {[styles.container, {marginTop:60, marginRight:10}]}>
            
                <FlatList
                    data = {data}
                    keyExtractor = {(item, index) => index.toString()}
                    style = {[styles.body, {paddingRight:22}]}
                    renderItem = {({item}) => (
                        <View style = {{flexDirection: 'row', padding: 10}}>
                            <Text style = {{fontWeight:'bold', color: item.type === 'user' ? 'green': 'red'}}>{item.type === 'user' ? 'Me: ' : 'Bot: '}</Text>
                            <Text style = {styles.bot}>{item.text}</Text>
                        </View>
                    )}
                />
                <View style = {{flexDirection:'row', padding: 10}}>
                    <TextInput
                        style = {[styles.input, {marginHorizontal:5}]}
                        value = {textInput}
                        onChangeText = {text => setTextInput(text)}
                        placeholder="Ask me anything"
                    
                    />
                    
                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {handleSend}
                        
                    >
                        <Image source={require('./send.png')} style = {{width: '100%', height: '100%'}} />
                        
                    </TouchableOpacity>
                    
                    
                </View>
            
            
            

        </View>
        </KeyboardAvoidingView>
    )
}

export default ChatGPT

const styles = StyleSheet.create({
    container:{
      flex:1,
      
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:"white",
      
    },
    body:{
        backgroundColor:"white",
        width:'115%',
        
    },
    bot:{
        fontSize:16
    },
    input:{
        borderWidth:1,
        borderColor:'black',
        width:'90%',
        height:60,
        marginBottom:30,
        borderRadius:10,
        paddingHorizontal: 15
    },
    button:{
        backgroundColor:'#A3D5FF',
        width:'25%',
        height:60,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    buttonText:{
        fontSize:25,
        fontWeight:'bold',
        fontFamily: 'Avenir Next',
        color:'black'
    }
})
