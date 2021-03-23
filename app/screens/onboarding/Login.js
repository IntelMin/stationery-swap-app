import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import {LargeButton, TextLink, SocialButton, CustomModal } from '../../components/common';
import {logIn} from "../../firebase/authMethods"
const Login = ({navigation}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [busyModal, setBusyModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const LoginPressed=async()=>{
    if(email && password !== ""){
      setBusyModal(true);
    await logIn(email,password).then((response)=>{
      console.log("response:",response)
      setBusyModal(false);
      if(response=="added"){
        navigation.navigate('Main')
      } else if (response.code == 'auth/email-already-in-use') {
        setErrorModalText('That email address is already in use!');
        setErrorModal(true);
    
      } else if (response.code == 'auth/invalid-email') {
        setErrorModalText('That email address is invalid!');
        setErrorModal(true);
      } 
      else if(response.code !==undefined || response.code !== null){
        setErrorModalText('Unknown error occurred.');
        setErrorModal(true);
      }
    })
    }else{
      setErrorModalText('Please fill all fields');
      setErrorModal(true);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Email Address"
        onChangeText={(text)=>setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
        onChangeText={(text)=>setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        <LargeButton onPress={()=>{
          console.log("login pressed")
          LoginPressed()}}
          title="LOGIN"          
        />
        <TextLink style={styles.forgot}>Forgot Password?</TextLink>
      </View>
      <Text style={styles.loginWith}>or login with</Text>
      <View style={styles.socialCont}>
        <SocialButton style={styles.socialButton} social="google" />
        <SocialButton style={styles.socialButton} social="facebook" />
        <SocialButton style={styles.socialButton} social="twitter" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Don't have an account? </Text>
        <TextLink style={styles.bottomText} onPress={() => {}}>Create new now!</TextLink>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>By signing up, you are agree with our </Text>
        <TextLink style={styles.bottomText} onPress={() => {}}>Terms & Conditions</TextLink>
      </View>
      <CustomModal
        show={busyModal}
        onClose={() => setBusyModal(false)}
        busy={true}
        backPress={true}
        text="Please wait..."
      />
      <CustomModal
        show={errorModal}
        onClose={() => setErrorModal(false)}
        backPress={true}
        text={errorModalText}
        okbtn={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 20
  },
  title: {
    fontSize: 30,
    backgroundColor: 'yellow'
  },
  textInput: {
    height: 50,
    width: '100%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    paddingHorizontal: 25,
    fontSize: 16,
    marginBottom: 20
  },
  buttonGroup: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }, 
  forgot: {
    fontSize: 14,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10
  },
  loginWith: {
    color: '#9D9D9D',
    fontSize: 12,
    marginTop: 10
  },
  socialCont: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5
  },
  socialButton: {
    marginLeft: 10,
    marginRight: 10
  },
  bottomContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 13
  }
});

export default Login;
