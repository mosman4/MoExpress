import { useContext,useState } from 'react';
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { Alert } from 'react-native';
import AuthContent from "../../components/Auth/AuthContent";
import {AuthContext} from "../../store/context-store"
import { registerWithEmailAndPassword } from '../../Config/Auth';

function SignupScreen() {
  const [isLoading, setLoading] = useState(false)
  const AuthCxt = useContext(AuthContext)

  async function signUpHandler ({username,email,password}){
    setLoading(true)
    try{
      const userInfo = await registerWithEmailAndPassword(username,email,password)
      AuthCxt.setUser(userInfo)
    }catch(error) {
      setLoading(false)
      console.log(error)
      Alert.alert("Try again if you want","Something went horribly wrong (:")
    }
   
  }
  if(isLoading) {
    return <LoadingOverlay message="loading"/>
  }
  return <AuthContent onAuthenticate={signUpHandler}/>;
}

export default SignupScreen;
