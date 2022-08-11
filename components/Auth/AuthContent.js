import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
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
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
