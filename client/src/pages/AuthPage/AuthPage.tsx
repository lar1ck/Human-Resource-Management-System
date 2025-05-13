import { useState } from "react"
import SignupForm from "./Signup/SignupForm"
import LoginForm from "./Login/LoginForm"

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleToggle = () => {
        setIsLogin((prev) => !prev)
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="flex gap-2">
            <button onClick={handleToggle} className="px-15 py-1 border-b-2">Login</button>
            <button onClick={handleToggle} className="px-15 py-1 border-b-2">Signup</button>
        </div>
        <div>
        {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
    </div>
  )
}

export default AuthPage