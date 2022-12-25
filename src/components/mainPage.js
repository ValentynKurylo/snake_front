import React, {useEffect, useRef, useState}  from 'react';
import {
    Link
} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import axios from "axios"
import {observer} from "mobx-react-lite";
import Game from "./game"
import UserStore from '../store/userStore'
import '../styles/mainPage.css'

const MainPage = observer(() => {
    const url = 'http://localhost:5000'
    let [login, setLogin] = useState(false)
    let [registration, setRegistration] = useState(false)
    let [user1, setUser] = useState({})
    let [userR, setUserR] = useState({})
    let [raiting, setRaiting] = useState([])
    let [showRaiting, setShowRaiting] = useState(true)
    let email = useRef('')
    let password = useRef('')

    let nameRef = useRef('')
    let emailRef = useRef('')
    let passwordRef = useRef('')
    let countryRef = useRef('')
   useEffect(()=>{
       if(UserStore.token === ''){
           setLogin(true)
       }
   }, [])
    function loginFunc(e){
        setUser(user1.email = email.current.value)
        setUser(user1.password = password.current.value)
        try {
            axios.post(url + '/auth/login', user1).then(value => {
                console.log(value.data)
                UserStore.setToken(value.data.token)
                console.log('====================')
                axios.get(url + '/users/currentUser', {
                    'headers': {
                        'authorization': 'Bearer ' + UserStore.token
                    }}).then(value => {
                    console.log(value)
                    UserStore.setCurrentUser(value.data)
                    setLogin(false)
                })
            })
            
        } catch (e) {
            alert('wrong email or password)')
        }
    }
    
    function registrationFunc(e){
        setUserR(userR.name = nameRef.current.value)
        setUserR(userR.email = emailRef.current.value)
        setUserR(userR.password = passwordRef.current.value)
        setUserR(userR.country = countryRef.current.value)

        axios.post(url + '/auth/registration', userR).then(value => {
            UserStore.setToken(value.data.token)
            setRegistration(false)
        })
    }
    function worldRaitin(e){
        axios.get(url + '/games/byScore').then(v =>{
            console.log(v.data)
            setRaiting(v.data)
            setShowRaiting(false)
        })
    }
    function MyGames(e){
        axios.get(url + '/games/byUserIdAndScore/' + UserStore.currentUser.id).then(v =>{
            setRaiting(v.data)
            setShowRaiting(false)
        })
    }

    function LocalRating(e){
        
        axios.get(url + '/games/byCountry/' + UserStore.currentUser.country).then(v =>{
            setRaiting(v.data)
            setShowRaiting(false)
        })
        
    }
    return (
        <div className={"main"}>
            <div className={"wrap"}>
                <div className={"box1"}>
                    <div className={"buttons"}>
                        <button className={"b"} onClick={(e)=>{worldRaitin(e)}}>World raiting</button>
                        <button className={"b"} onClick={(e)=>{LocalRating(e)}}>Local Rating</button>
                        <button className={"b"} onClick={(e)=>{MyGames(e)}}>Your games</button>
                    </div>
                    <div className={"box"}>
                            {
                                showRaiting ? <center><p className={"hello"}>Hello {UserStore.currentUser.name}!
                                </p></center> : <div className={"boxRaiting"}>
                                    <div className={"topBox"}>
                                        <p className={"pRaiting"}>Raiting: </p>
                                        <button onClick={()=>{setShowRaiting(true)}} className={"hide"}>Hide</button>
                                    </div>
                                    <hr/>
                                        {
                                            raiting.map((value,i) => <p key={i} className={"pData"}>{i + 1}){value.user.name}:  {value.score} points    : {value.user.country}<hr/></p>) 
                                        }

                                </div>
                            }
                            
                    </div>
                </div>
               <Link to={'/play'}>
                  
                       <button className={'btnPlay'}>Play</button>
                  
                </Link></div>

            <Modal show={login} onHide={() => {
                alert("You must login!")
                setLogin(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor={"name"} className={"lable"}>Enter your email: </label><br/>
                    <input id={"name"}  type={"text"} className={"input"} ref={email}/><br/>
                    <label htmlFor={"password"} className={"lable"}>Enter your password: </label><br/>
                    <input id={"password"} type={"password"} className={"input"} ref={password}/><br/>

                    <div className={"MinBox"}>
                        <center><p className={"pReg"}>If you are not registred</p>
                            <button className={"butReg"} type={"password"} onClick={(e)=>{setLogin(false)
                            setRegistration(true)}}>register</button>
                        </center>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e)=> loginFunc(e)}>
                        Enter
                    </Button>
                </Modal.Footer>

            </Modal>

            <Modal show={registration} onHide={() => {
                alert("You must login!")
                setLogin(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor={"name"} className={"lable"}>Enter your name: </label><br/>
                    <input id={"name"}  type={"text"} className={"input"} ref={nameRef}/><br/>
                    <label htmlFor={"email"} className={"lable"}>Enter your email: </label><br/>
                    <input id={"email"}  type={"text"} className={"input"} ref={emailRef}/><br/>
                    <label htmlFor={"password"} className={"lable"}>Enter your password: </label><br/>
                    <input id={"password"} type={"password"} className={"input"} ref={passwordRef}/><br/>
                    <label htmlFor={"country"} className={"lable"}>Enter your coutry: </label><br/>
                    <input id={"country"}  type={"text"} className={"input"} ref={countryRef}/><br/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e)=> registrationFunc(e)}>
                        Register
                    </Button>
                </Modal.Footer>

            </Modal>
        </div>
    );
});

export default MainPage;