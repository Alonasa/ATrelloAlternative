import React, {ChangeEvent, useState} from 'react';

type SpanPropsType = {
  value: string
  onChange: (newTitle: string) => void
}

export const EditableSpan = (props: SpanPropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(props.value);
  
  const editOn = () => {
	setEditMode(true)
  }
  
  const editOff = () => {
	setEditMode(false)
	props.onChange(title)
  }
  
  const onChangeTitleHandler =(e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
  }
  
  return editMode ? <input value={title} onBlur={editOff} onChange={onChangeTitleHandler}/> :
	<span onDoubleClick={editOn}>{props.value}</span>
}

// export const EditableSpan = (props: SpanPropsType) => {
//   const [title, setTitle]=useState(props.value);
//   const [editMode, setEditMode]=useState(false)
//
//
//   const activateEditMode = () => {
// 	setEditMode(true)
//   }
//
//   const activateViewMode = () => {
//     setEditMode(false)
// 	props.onChange(title)
//   }
//
//   const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
// 	setTitle(e.currentTarget.value)
//   }
//
//   return editMode ?
//     <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus={true}/>
//  	:
// 	<span onDoubleClick={activateEditMode}>
// 	{props.value}
// 	</span>
//};
 
