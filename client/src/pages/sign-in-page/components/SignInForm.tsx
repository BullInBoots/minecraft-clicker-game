import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {

  const API_URL = 'http://10.4.53.25:9999';
  const CLICKER_PAGE_ROUTE = 'leaderboard';
  const navigate = useNavigate();
  const [username, setUsername] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [passwordIsCorrect, setPasswordIsCorrect] = useState<boolean>(true);
  
  const onSubmitHandler = async () => {
    const url = `${API_URL}/users/signin?username=${username}&password=${password}`;
    const logIn = await axios.get(url).then(
      (res) => {
        if (res.data.passwordIsCorrect) {
          setPasswordIsCorrect(state => state = true);
          navigate(CLICKER_PAGE_ROUTE);
        } else {
          setPasswordIsCorrect(state => state = false);
        }
      }
    );
    return logIn;
  }
  
  return (
    <div className="p-4 min-w-[360px] bg-secondary-700 rounded-lg">

      <div className="font-segoe-ui font-bold text-xl text-primary-100">Sign in</div>
      <form>
        <div className="flex flex-col gap-2 text-primary-100 mt-1">
          <label htmlFor="username">Username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} name="username" id="username" className="h-8 pl-2 bg-secondary-600 rounded-sm"/>
          <label htmlFor="password">Password {passwordIsCorrect ? <></> : <span className="text-red-alert">password is incorrect!</span>}</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="h-8 pl-2 bg-secondary-600 rounded-sm"/>
          <button type="button" onClick={onSubmitHandler} value="Sign in" className="h-8 mt-8 bg-accent-500 rounded-sm">Sign in</button>
          <div className="font-segoe-ui text-primary-100 text-xs">New to this game? <span className="text-accent-500 underline">Create account</span></div>
        </div>
      </form>
    </div>
  )
}

export default SignInForm