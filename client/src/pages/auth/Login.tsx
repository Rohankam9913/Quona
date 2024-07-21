import { NavLink, useNavigate } from "react-router-dom";
import style from "./auth.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Authinterface } from "../../interface/interfaces";

const Login = ()=>{
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<Authinterface>();
    const navigate = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem("user");
        if(user){
            navigate(-1);
            return;
        }

        inputRef.current?.focus();
    },[]);

    const loginUser = async (e: FormEvent) => {
        e.preventDefault();
        setError({username: "", email: "", password: "", account: ""});
        try{
            const response = await fetch("http://localhost:5000/api/auth/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });
            const data = await response.json();
            if(data.error){
                setError(data.error);
                return;
            }

            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
        }
        catch(error){
            alert(error);
        }
    }

    return(
        <div className={style.auth}>
            <h1 className={style.main__heading}>Quona</h1>
            <h3 className={style.main__subHeading}>A place to share knowledge and better understand the world</h3>

            <div className={style.line}/>

            <form className={style.form} onSubmit={(e)=>loginUser(e)}>
                <h4 className={style.form__heading}>Login</h4>
                <span className="error">{error?.account}</span>

                <label className={style.label} htmlFor="email">Email <small className={style.required}>*</small></label>
                <input className={style.input} type="text" placeholder="Your email" name="email" id="email" ref={inputRef} value={email} onChange={(e)=>setEmail(e.target.value)}/>

                <label className={style.label} htmlFor="password">Password <small className={style.required}>*</small></label>
                <input className={style.input} type="password" placeholder="Your Password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <button type="submit" className={style.btn}>Login</button>
                <span className={style.form__footer}>Don't have an account ? <NavLink to={"/register"} className={style.auth_links}>Register</NavLink></span>
            
            </form>
        </div>
    )
}

export default Login;