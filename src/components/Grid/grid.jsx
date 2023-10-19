import { useState } from "react";
import Card from "../Card/card";
import isWinner from "../../Helpers/checkWinner";
import './grid.css'
import winSound from '../../assets/winner.wav'
import clickSound from '../../assets/click.wav'
import drawSound from '../../assets/draw.wav'



const winAudio = new Audio(winSound);
const clickAudio = new Audio(clickSound);
const gameDraw = new Audio(drawSound)


function Grid({numberOfCards}){
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true); // true ==> o, false ==> X
    const [winner,setWinner] = useState(null)
    const [draw, setIsDraw] = useState(false);


    function play(index){
        if (turn === true){
            board[index] = 'O';
        }else{
            board[index] = 'X'
        }
        const newBoard = [...board];
    newBoard[index] = turn ? 'O' : 'X';

        const win = isWinner(newBoard, turn ? 'O' : 'X');
        if(win){
            setWinner(win);
            winAudio.play(); // playing the winner sound
            setIsDraw(false);
        } else if (newBoard.every((cell) => cell !== '')) {
            gameDraw.play(); // Play the draw sound
        setIsDraw(true);

        }
        setBoard(newBoard);
        setTurn(!turn)
        clickAudio.play();

    }
    function reset(){
        setTurn(true);
        setWinner(null)
        setBoard(Array(numberOfCards).fill(""))
    }
    return(
        <div className="grid-wrapper">
            {
                winner &&(
                    <> 
                        <h1 className="turn-highlighter">Winner is {winner}</h1>
                        <button className="reset" onClick={reset}>Reset Game</button>
                    </>
                )
                
            }

            {
                draw &&(
                    <> 
                        <h1 className="turn-highlighter">Match Draw</h1>
                        <button className="reset" onClick={reset}>Reset Game</button>
                    </>
                )
            }
            <h1 className="turn-highlighter">Current Turn: {(turn) ? 'O' : 'X'}</h1>
             <div className="grid">
            {board.map((ele, idx) => <Card gameEnd={winner? true : false} key={idx} onPlay={play} player={ele} index={idx}/>)}

        </div>
        </div>
       
    
        )
}

export default Grid;