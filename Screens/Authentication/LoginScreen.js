import {useContext, useState} from "react"
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { Alert } from 'react-native';
import AuthContent from "../../components/Auth/AuthContent";
import {AuthContext} from "../../store/context-store"
import { loginInWithEmailAndPassword } from "../../Config/Auth";
function LoginScreen() {
  const [isLoading, setLoading] = useState(false)
  const AuthCxt = useContext(AuthContext)
  
  async function signInHandler ({email,password}){
    setLoading(true)
    try{
      const user = await loginInWithEmailAndPassword(email,password) 
      AuthCxt.setUser(user)
    }catch(error) {
      Alert.alert("Try again if you want","Something went horribly wrong :(")
      setLoading(false)
    }
  }
  if(isLoading) {
    return <LoadingOverlay message="loading"/>
  }
  return <AuthContent isLogin onAuthenticate={signInHandler}/>;
}
export default LoginScreen;
