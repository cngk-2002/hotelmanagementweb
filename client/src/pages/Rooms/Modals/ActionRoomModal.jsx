import "../../../css/localpopupbasic.css"
import "../../../css/localpopup.css"
import { useState, useMemo } from "react";
import axios from 'axios'

export default function ActionRoomModal({ close, ID, roomno, type, inroom, price, status }) {
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = useState('')
    // const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
        setValue(value)
    }

    console.log(ID)

    const [nROOM_NO, setRoomNo] = useState(roomno)
    const [nTYPE, setType] = useState(type)
    const [nIN_ROOM, setInRoom] = useState(inroom)
    const [nPRICE, setPrice] = useState(price)
    const [nSTATUS, setStatus] = useState(status)

    const displayInfo = () => {
        console.log(nROOM_NO, nTYPE, nIN_ROOM, nPRICE, nSTATUS)
    }

    // displayInfo()

    const updateRoom = (ID) => {
        console.log(nROOM_NO, nTYPE, nIN_ROOM, nPRICE, nSTATUS )
        axios.put('http://localhost:5000/updateroom',{
            roomno: nROOM_NO,
            type: nTYPE,
            inroom: nIN_ROOM,
            price: nPRICE,
            status: nSTATUS,
            id: ID,
        }).then((response) => {
            alert("updated")
        })
    }

    const DeleteRoom = (ID) => {
        axios.delete(`http://localhost:5000/deleteroom/${ID}`)
    }

    const handleSubmit = (e) => {
        e.prevenDefault();
    }


    return (
        <div className="">
            <div className="translate-x-[500px] text-2xl">
                <a className="close cursor-pointer" onClick={close}>
                    &times;
                </a>
            </div>
            <form onSubmit={handleSubmit} className="w-[32rem] grid grid-cols-2 gap-x-2 gap-y-12 items-center ml-4">
                    <div className="ml-8 translate-y-[40px] text-xl font-medium -top-6 relative text-gray-900 dark:text-white"> <label htmlFor="roomno" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Room no</label>
                    <input className="ml-8 -mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[7rem] h-[2.6rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="roomno"
                        id="roomno"
                        defaultValue={roomno}
                        onChange={(e) => {
                            setRoomNo(e.target.value);
                        }}
                    /></div>
                    <div className="ml-8 translate-y-[10px]">
                        <label htmlFor="type" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                        <select className="ml-12" id="type"
                         onChange={(e) => {
                            setType(e.target.value);
                        }}
                        defaultValue={type}
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <div className="ml-8 translate-y-[-5px] flex">
                        <label htmlFor="inroom" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">In Room</label>
                        <input className="ml-9 -mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[7rem] h-[2.6rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="inroom"
                            id="inroom"
                            defaultValue={inroom}
                            onChange={(e) => {
                                setInRoom(e.target.value);
                            }}
                        />
                    </div>
                    <div className="ml-8 translate-y-[-6px] flex">
                        <label htmlFor="phone" className="mb-2 translate-y-2 text-sm font-medium text-gray-900 dark:text-white">Price (vnd)</label>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-2 w-[7rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="price"
                            id="price"
                            defaultValue={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                    </div>
                    <div className="ml-8 translate-y-[-30px]">
                        <label htmlFor="identity" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <select className="ml-12" id="type" name="type"
                        defaultValue={status}
                         onChange={(e) => {
                            setStatus(e.target.value);
                        }}
                        >
                            <option value="empty">empty</option>
                            <option value="checkedin">checked in</option>
                        </select>
                    </div>
                

                <div className="relative mt-[-10px]">
                    <button className="right-0 bottom-0 translate-y-20 -translate-x-40 absolute  bg-[#f59e0b] text-white p-2 rounded-lg" onClick={() => {DeleteRoom(ID)}}>Delete</button>
                    <button className="right-0 bottom-0 absolute translate-y-20 -translate-x-8 bg-[#374151] text-white p-2 rounded-lg" type="submit" onClick={()=>{updateRoom(ID)}}>Save Changes</button>
                </div>
            </form>
        </div>
    )
}