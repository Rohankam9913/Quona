import { NavLink, useNavigate } from "react-router-dom";
import style from "./auth.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Authinterface } from "../../interface/interfaces";

const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<Authinterface>({ username: "", email: "", password: "", account: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log(user);
        if (user && JSON.parse(user)) {
            navigate(-1);
            return;
        }
        inputRef.current?.focus();
    }, []);

    const registerUser = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (data.error) {
                return setError(data.error);
            }

            navigate("/login");
        }
        catch (error) {
            alert(error);
        }
    }

    return (
        <div className={ style.auth }>
            <h1 className={ style.main__heading }>Quona</h1>
            <h3 className={ style.main__subHeading }>A place to share knowledge and better understand the world</h3>

            <div className={ style.line } />

            <form className={ style.form } onSubmit={ (e) => registerUser(e) }>
                <h4 className={ style.form__heading }>Create Account</h4>
                <span className="error">{ error?.account }</span>

                <label className={ style.label } htmlFor="username">Username <small className={ style.required }>*</small></label>
                <input className={ style.input } type="text" placeholder="Your Username" id="username" ref={ inputRef } value={ username } onChange={ (e) => { setUsername(e.target.value); setError({ ...error, username: "" }) } } />
                <span className="error">{ error?.username }</span>

                <label className={ style.label } htmlFor="email">Email <small className={ style.required }>*</small></label>
                <input className={ style.input } type="text" placeholder="Your email" id="email" value={ email } onChange={ (e) => { setEmail(e.target.value); setError({ ...error, email: "" }) } } />
                <span className="error">{ error?.email }</span>

                <label className={ style.label } htmlFor="password">Password <small className={ style.required }>*</small></label>
                <input className={ style.input } type="password" placeholder="Your Password" id="password" value={ password } onChange={ (e) => { setPassword(e.target.value); setError({ ...error, password: "" }) } } />
                <span className="error">{ error?.password }</span>

                <button type="submit" className={ style.btn }>Create Account</button>
                <span className={ style.form__footer }>Already have an account ? <NavLink to={ "/login" } className={ style.auth_links }>Login</NavLink></span>
            </form>
        </div>
    )
}

export default Register;