import './Card.css'
import {useEffect, useState} from "react";



export default function Card(props) {

	const [opened, setOpened] = useState(false)



	useEffect(() => {
		if(props.openedCards.includes(props.index) || props.matched.includes(props.index)){
			setOpened(true)
		}
		else{
			setOpened(false)
		}
	}, // eslint-disable-next-line
		[props.openedCards, props.matched]);



		return (
			<div className={opened ? 'card_open' : "card_closed"} onClick={()=>props.open(props.index)}>
				<img className='card_img' src={require(`./img/${props.name}.jpg`)} alt={props.name} />
			</div>
		)

}