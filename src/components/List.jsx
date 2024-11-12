import { DeleteOutlined, EditOutlined, HeartOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTIONS } from '../redux/Actions'

function List() {
	const dispatch = useDispatch()
	const usersList = useSelector(state => state.todo)
	const [updateModal, setUpdateModal] = useState(false)
	const [username, setUsername] = useState("")
	const [age, setAge] = useState("")
	localStorage.setItem("todos", JSON.stringify(usersList))

	// update part start
	const [updateAge, setUpdateAge] = useState(null)
	function handleUpdateBtnClick(age) {
		setUpdateModal(true)
		setUpdateAge(age)
		const findUpdateUser = usersList.find(item => item.age == age)
		setUsername(findUpdateUser.username)
		setAge(findUpdateUser.age)
	}
	function handleUpdateUser() {
		const data = { username, age }
		dispatch({ type: ACTIONS.update, payload: { newData: data, age: updateAge } })
		setUpdateModal(false)
	}
	// update part end

	// like start
	function handleLikeBtnClick(item) {
		dispatch({ type: ACTIONS.like, payload: item })
	}
	return (
		<>
			<ul className='w-[500px] mx-auto mt-10 space-y-[20px]'>
				{usersList.map((item, index) => (
					<li key={index} className='p-3 bg-slate-300 flex items-center justify-between border-[1px] border-blue-500 rounded-[15px]'>
						<div className="flex items-center space-x-2">
							<span className="text-[20px] font-semibold">{index + 1}.</span>
							<strong className="text-[20px] font-bold leading-[20px]">{item.username} - {item.age}</strong>
						</div>
						<div className="flex items-center space-x-[10px]">
							<Button onClick={() => dispatch({ type: ACTIONS.delete, payload: item.age })} style={{ borderColor: "red" }}><DeleteOutlined style={{ color: "red" }} /></Button>
							<Button onClick={() => handleUpdateBtnClick(item.age)} style={{ borderColor: "green" }}><EditOutlined style={{ color: "green" }} /></Button>
							<Button onClick={() => handleLikeBtnClick(item)} style={{ borderColor: "gold" }}><HeartOutlined style={{ color: "gold" }} /></Button>
							<Button style={{ borderColor: "blue" }}><MoreOutlined style={{ color: "blue" }} /></Button>
						</div>
					</li>
				))}
			</ul>
			<Modal title="Update User" open={updateModal} onCancel={() => setUpdateModal(false)} onOk={handleUpdateUser}>
				<Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your Name' type='text' size='large' allowClear className='mb-3' />
				<Input value={age} onChange={(e) => setAge(e.target.value)} placeholder='Enter your Age' type='number' size='large' allowClear />
			</Modal>
		</>
	)
}

export default List