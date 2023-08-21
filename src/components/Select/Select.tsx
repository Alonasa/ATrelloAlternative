import React, {useState} from 'react';
import {v1} from 'uuid';
import s from './Select.module.css'

type ItemType = {
  id: string
  title: string
}

type SelectType = {
  items: ItemType[]
}


export const Select = () => {
  const [show, setShow] = useState(false);
  const [mood, setMood] = useState<string>('Select Your Mood');
  
  const itemsForSelect = [
	{id:v1(), title: "I'm bad"},
	{id:v1(), title: "I'm fine"},
	{id:v1(), title: "I'm ok"},
	{id:v1(), title: "I'm Great"},
  ]
  
  const onClickHandler = () => {
	setShow(!show)
  }
  
  const moodHandler = (id: string) => {
	let item = itemsForSelect.find(i => i.id === id);
	if (item) {
	  let currentMood = item.title;
	  setMood(currentMood)
	  setShow(!show)
	}
  }
  
  return (
	<div className={s.wrapper}>
	  <div className={s.selectBox}>
		<p className={s.titleBox}>{mood}</p>
		<button onClick={onClickHandler}>{show ? '^' : 'v'}</button>
	  </div>
	  <ul className={s.listBox}>
		{show && itemsForSelect.map((item,index) => {
		  
		  return (
			<li key={item.id} className={s.listItem} style={{backgroundColor: (index%2==0)? 'gray' : 'inherit'}}
				  onClick={() => moodHandler(item.id)}>{item.title}<br/></li>
		  )
		})
		}
	  </ul>
	  
	</div>
  );
};