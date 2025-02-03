import './Table.css'
import Card from "../Card/Card";
import {useEffect, useState} from "react";



export default function Table(props) {
	const [cards, setCards] = useState([])
	const [openedCards, setOpenedCards] = useState([])
	const [matched, setMatched] = useState([])
	const [gameOver, setGameOver] = useState(true)
	const [score, setScore] = useState(0)
	const [tryCount, setTryCount] = useState(0)

	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}



	useEffect(() => {
		setCards(props.cards)
		setMatched(Object.keys(props.cards).map(key => parseInt(key)))
	},[]);

	useEffect(() => {
		if(gameOver){
			const interval = setInterval(()=>{
				setCards(shuffle([...cards]))
			}, 3000)
			return () => {
				clearInterval(interval)
			}
		}
	},[gameOver, cards]);

	useEffect(() => {
		if(matched.length === cards.length){
			setGameOver(true)
		}
		else if( tryCount === 0){
			setGameOver(true)
			setMatched(Object.keys(props.cards).map(key => parseInt(key)))
		}
	}, [matched, cards, tryCount]);

	const openCard = (index) => {
			if(openedCards.length === 2){
				return
			}
			else{
				setOpenedCards((prevOpenedCards) => {
					const newOpenedCards = [...prevOpenedCards, index];

					if (newOpenedCards.length === 2) {
						if (cards[newOpenedCards[0]] !== cards[newOpenedCards[1]]) {
							setTimeout(() => setOpenedCards([]), 1000);
							setTryCount(tryCount -1);
						} else {
							setMatched([...matched, newOpenedCards[0], newOpenedCards[1]]);
							setScore((prevScore) => prevScore + 1);
							return [];
						}
					}
					return newOpenedCards;
				});
			}

	};


	const startGame = () => {
		setCards(shuffle([...cards]))
		setOpenedCards([])
		setMatched([])
		setGameOver(false)
		setScore(0)
		setTryCount(5)
	}

	return (
		<>
			<div className="table">
				<h1>Memory game</h1>
				<h3>Score: {score}</h3>
				<h3>Tries: {tryCount}</h3>
				<div className='table_cards'>
					{cards.map((card, index) => <Card key={index} index={index} name={card} open={openCard}
					                                  openedCards={openedCards} matched={matched}/>)}
				</div>
			</div>
			<button onClick={startGame}>{gameOver ? 'Start Game' : 'Restart Game'}</button>
		</>
	)
}