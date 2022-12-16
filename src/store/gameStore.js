import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas = null
    ctx = null
    ground = null
    box = 32
    score = 0
    snake = [{}]
    intervalId = null
    randFood = {
        x: null,
        y: null,
        score: 1
    }
    diraction = null
    play = false
    speed = 400
    fast = 0
    lose = false
    constructor() {
        makeAutoObservable(this)
        
    }
    setCanvas(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
        this.snake[0] = {
            x: 9 * this.box,
            y: 10 * this.box
        }
        /*
        setInterval(() => {
            if(this.play){
                this.move()
            }

        }, this.speed)*/
        //this.drawFood()
    }
    setPlay(b){
        this.play = b
    }

    
    setDiraction(dir){
        this.diraction = dir
        
    }
    playAgain(){
        this.score = 0
        this.snake = [{}]
        this.snake[0] = {
            x: 9 * this.box,
            y: 10 * this.box
        }
        this.speed = 400
        this.diraction = 0
        this.drawSnake()
        this.drawFood()
        this.lose = false
        this.play = true
    }
    
    
    move(){
        //console.log("mmm", this.diraction)
        let snakeX = this.snake[0].x
        let snakeY = this.snake[0].y

        if((snakeX === this.randFood.x) && (snakeY === this.randFood.y)){

            this.score += this.randFood.score
            this.fast += this.randFood.score

            if(this.fast >= 50){
                this.speed -= (this.speed / 50)

            }
            this.drawFood()
        }
        else{
            this.snake.pop()
        }

        if((snakeX < 0 || snakeX >= 19 * this.box) || (snakeY < 0 || snakeY >= 19 * this.box)){
            this.play = false
            this.lose = true
            return 0;
        }

        if(this.diraction === "left"){
            snakeX -= this.box
        }
        else if(this.diraction === "right"){
            snakeX += this.box
        }
        else if(this.diraction === "up"){
            snakeY -= this.box
        }
        else if(this.diraction === "down"){
            snakeY += this.box
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        }
        this.eatTail(newHead)
        this.snake.unshift(newHead)
        this.drawSnake()
    }
    drawSnake() {

        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0, 0, 608, 608)
        if(this.randFood.score === 1){
            this.ctx.fillStyle = "yellow"
        }
        else if(this.randFood.score === 5){
            this.ctx.fillStyle = "blue"
        }
        else if(this.randFood.score === 10){
            this.ctx.fillStyle = "silver"
        }
        this.ctx.fillRect(this.randFood.x, this.randFood.y, this.box, this.box)

         for(let i = 0; i < this.snake.length; i++){
             if(i === 0){
                 this.ctx.fillStyle = "red"
             }
             else {
                 this.ctx.fillStyle = "green"
             }
             this.ctx.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box)
         }

         
    }

    drawFood() {
        let num = Math.random()
        let sc = 0;
        console.log(num)
        if(num > 0.7 && num < 0.9){
            sc = 5
        }
        else if(num >= 0.9){
            sc = 10
        }
        else{
            sc = 1
        }
        this.randFood = {
            x: Math.floor(Math.random() * 19) * this.box,
            y: Math.floor(Math.random() * 19) * this.box,
            score: sc
        }
    }

    eatTail(head){
        for (let i = 0; i < this.snake.length; i++) {
            if(head.x === this.snake[i].x && head.y === this.snake[i].y){
                this.play = false
                this.lose = true
            }
        }
    }

}
export default new CanvasState();