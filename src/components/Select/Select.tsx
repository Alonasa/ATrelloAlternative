import React, {useState} from 'react';
import {v1} from 'uuid';

type ItemType = {
  id: string
  title: string
}

type SelectType = {
  items: ItemType[]
}


export const Select = () => {
  const [show, setShow] = useState(false);
  const [mood, setMood] = useState<string>('');
  
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
	}
  }
  
  return (
	<div style={{border: '2px solid gray', margin: '0', minHeight: '30px'}}>
	  <div style={{display:'flex', justifyContent: 'space-between'}}>
		<p style={{padding: '0 20px'}}>{mood}</p>
		<button onClick={onClickHandler}>{show ? '^' : '='}</button>
	  </div>
	  <ul style={{listStyle: 'none', padding:'0', margin: '0'}}>
		{show && itemsForSelect.map((item,index) => {
		  
		  return (
			<li key={item.id} style={{backgroundColor: (index%2==0)? 'gray' : 'inherit', padding: '0 20px'}}
				  onClick={() => moodHandler(item.id)}>{item.title}<br/></li>
		  )
		})
		}
	  </ul>
	  
	</div>
  );
};