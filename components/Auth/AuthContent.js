import { useState } from 'react';
import { Alert, StyleSheet, View,Text } from 'react-native';
import FlatButton from "../UI/FlatButton";
import AuthForm from './AuthForm';
import {Colors} from "../../constants/styles";
import { useNavigation } from '@react-navigation/native';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation()
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    username:false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
      if(isLogin) {
        navigation.navigate("Signup")
      }else {
        navigation.navigate("Login")
      }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail,username, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();
    username = username.trim();
    const emailIsValid = email.includes('@');
    const usernameIsValid = username.length != 0;
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual || !usernameIsValid))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        username:!usernameIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ username,email,password });
  }

  return (
    <View style={styles.authContent}>
        <Text style={{fontSize:20,marginBottom:15}} >Welcome !</Text>

      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        
      {isLogin &&  <FlatButton onPress={()=> console.log("reset")}>
          Forgot your password?
        </FlatButton>}
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? <Text style={{color:"#7E7E7E"}}>Don't have an account? <Text style={{color:"#F16947"}} >Signup</Text></Text> : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 14,
    marginHorizontal: 15,
    padding: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
    
  },
});
