import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTIONS } from '../redux/Actions'

function Form() {
	const dispatch = useDispatch()
	const [username, setUsername] = useState("")
	const [age, setAge] = useState("")

	const likedList = useSelector(state => state.like)

	function handleSubmit(e) {
		e.preventDefault()
		const data = { username, age }
		dispatch({ type: ACTIONS.create, payload: data })
		setUsername("")
		setAge("")
	}

	return (
		<form onSubmit={handleSubmit} className='w-[500px] mx-auto mt-[75px] space-y-[15px]'>
			<Input value={username} required autoComplete='off' onChange={(e) => setUsername(e.target.value)} placeholder='Enter your Name' type='text' size='large' allowClear />
			<Input value={age} required autoComplete='off' onChange={(e) => setAge(e.target.value)} placeholder='Enter your Age' type='number' size='large' allowClear />
			<Button className="w-full" size="large" htmlType="submit" type="primary">Submit</Button>
			<Button type="default" size="large">Liked ({likedList.length})</Button>
		</form>
	)
}

export default Form