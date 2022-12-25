import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Modal} from "react-bootstrap";
import "../styles/game.css"
import CanvasState from '../store/gameStore'
import UserStore from '../store/userStore'
import axios from "axios"
import {
    Link
} from "react-router-dom";

const Game = observer(() => {
    const url = 'http://localhost:5000'
    const canvas = useRef(null)
    let [diraction, setDiraction] = useState('')
    let [users, setUsers] = useState([])
    let [start, setStart] = useState(true)
    let [lose1, setLose1] = useState(false)
    useEffect(() => {
        CanvasState.setCanvas(canvas.current)
        CanvasState.drawFood()
    }, [])
    useEffect(() => {

        CanvasState.drawSnake()
        CanvasState.setDiraction(diraction)
        CanvasState.setPlay(true)
    }, [diraction])
    useEffect(() => {

        setInterval(() => {
            if (CanvasState.lose) {
                setLose1(true)
                setDiraction('pm ')
            }
            if (CanvasState.play) {
                CanvasState.move()
            }

        }, CanvasState.speed)
    }, [CanvasState.speed])

    function diraction1(e) {

        if (CanvasState.play) {
            if ((e.keyCode === 37 || e.keyCode === 65) && (diraction !== "right")) {
                setDiraction("left")
            } else if ((e.keyCode === 38 || e.keyCode === 87) && (diraction !== "down")) {
                setDiraction("up")
            } else if ((e.keyCode === 39 || e.keyCode === 68) && (diraction !== "left")) {
                setDiraction("right")
            } else if ((e.keyCode === 40 || e.keyCode === 83) && (diraction !== "up")) {
                setDiraction("down")
            } else if (e.keyCode === 32) {
                CanvasState.setPlay(!CanvasState.play)
            }
        } else {
            if (e.keyCode === 13) {
                CanvasState.setPlay(!CanvasState.play)
            }
        }
    }

    function clearGame(e) {
        let game = {
            score: CanvasState.score
        }
        axios.post(url + '/games', game, {
            'headers': {
                'authorization': 'Bearer ' + UserStore.token
            }
        }).then(v => {
            console.log(v)
        })
        CanvasState.playAgain()
        setLose1(false)
    }

    document.addEventListener("keydown", diraction1)
    return (
        <div className={"main"}>
            <div>
                <p className={"score"}>Your score: {CanvasState.score}</p>
                <Link to={'/'}>
                    <button className={"back"}>back</button>
                </Link>
            </div>
            <canvas width={608} height={608} ref={canvas}></canvas>

            <Modal show={start} onHide={() => {

            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Snake</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"rules"}>
                        Rules:
                        <hr/>
                        If you eat:
                        <br/>
                        - yellow = 1 point
                        <br/>
                        - blue = 5 point
                        <br/>
                        - silver = 10 point
                        <hr/>
                        if you run into a wall or your tail, you lose!
                        <hr/>
                        Press space bar to pause, and enter to continue
                        <hr/>
                        Good Luck!!!
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={'/'}><Button variant="secondary">
                        Back
                    </Button></Link>
                    <Button variant="secondary" onClick={() => {
                        setStart(false)
                    }}>
                        Start
                    </Button>
                </Modal.Footer>

            </Modal>

            <Modal show={lose1} onHide={() => {
                setLose1(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>You lost!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"rules"}>
                        Play again and improve your score!
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={'/'}><Button variant="secondary" onClick={(e) => {
                        clearGame(e)
                    }}>
                        Main
                    </Button></Link>
                    <Button variant="secondary" onClick={(e) => {
                        clearGame(e)
                    }}>
                        Again
                    </Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
})
export default Game;