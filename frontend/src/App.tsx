import { useEffect, useRef, useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import ChatRoom from '../components/ChatRoom'
import HomePage from "../components/HomePage"

// function App() {
     
//   const [message, setMessage] = useState<string[]>([])
// const wsRef = useRef<WebSocket | null>(null);
      
//       const msgRef = useRef<HTMLInputElement>(null);
//    useEffect(()=>{
//      const ws = new WebSocket("ws://localhost:8000");
         
//       ws.onmessage=(e)=>{
//            setMessage((m)=> [...m,e.data])
//            alert("message has come")
//       }

//          wsRef.current = ws; 
//      ws.onopen =()=>{
//        ws.send(JSON.stringify({
//            type:"join",
//            payload:{roomId:'red'}
//        }))
//      }

//    },[])

//   // const [socket, setSocket] = useState<WebSocket | null>(null) 

//   //   const [message, setMessage] = useState<string>('');

//   //    const ws = new WebSocket("ws://localhost:8000");


//   //    useEffect(()=>{
//   //           ws.onopen= ()=>{
//   //         ws.send(JSON.stringify({
//   //           type: "join",
//   //           payload: {roomId: "red"}
//   //         }))
//   //    }
//   //    },[])
     

//   //    ws.onmessage = (e)=> {
//   //         console.log(e.data)
//   //         alert(e.data);
//   //    }
      
//   //    function sendMessage(message: string){
//   //            ws.send(JSON.stringify({
//   //                type:"chat",
//   //                payload: {message}
//   //            }))
//   //            console.log("client side msg"+" "+message);
//   //    }

//    //@ts-ignore
//   // const msgRef = useRef();
  
//   //   function sendMessage(){
//   //        if(!socket){
//   //             return
//   //        } 
//   //           //@ts-ignore
//   //         const message = msgRef.current.value;
//   //        socket.send(message)
//   //   }
//   // useEffect(()=>{
//   //    const ws = new WebSocket("ws://localhost:8000")
//   //    setSocket(ws);
//   //    ws.onmessage=(e) =>{
//   //       alert(e.data)
//   //    }

//   // },[])

//   return (
// <>
//   {/* <div className='flex  w-screen h-screen justify-center items-center'>
//     <div className='rounded bg-amber-800 ml-[30vh] mr-[10vh]'>

//     <div className='b h-[80vh]'>
//        {message.map(m => <div
//        className='p-2 my-1 rounded'>
//         <span className='bg-white px-4 py-2 rounded-b-sm'>
//         {m}</span>
//         </div>)}
          
//     </div>
//     <div className='w-screen flex justify-between p-2'>
//       <input 
//        id='message'
//        placeholder='...message'
//        className='border rounded px-2 py-1 flex-1 mr-2'
//        />
//       <button 
//        onClick={()=>{
//          const message = (document.getElementById("message") as HTMLInputElement)?.value;
//          //@ts-ignore 
//          wsRef.current.send(JSON.stringify({
//            type: "chat",
//            payload:{
//              message:message
//             }
//           }))
//         }}
        
//         className='bg-blue-500 text-white px-4 py-1 rounded'>Send</button>
//     </div>
//   </div>
//         </div> */}



// {/* 

//         <div className=' w-screen h-screen flex justify-center items-center'>
            
//             <div className='bg-[#C6E2FF] rounded-2xl h-[80vh] mb-[5vh] w-[60vh] mr-[40vh] flex flex-col justify-between shadow-lg'>
//                 <div className='ml-[2vh] mt-[2vh]'>
//                     <h1>hello</h1>
//                  </div>
                 
//                     <div className='flex items-center px-[2vh] mb-[2vh]'>
//                     <input
//                       className='flex-1 border rounded-2xl px-3 py-2 mr-2'
//                       placeholder='...type Message'
//                     />
//                     <button className='bg-blue-500 text-white px-4 py-2 rounded shadow'>
//                       Send
//                     </button>
//                   </div>

//               </div>

//         </div> */}

//           <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 animate-gradient bg-[length:400%_400%]">
//   <div className="bg-white/20  backdrop-blur-md rounded-2xl h-[80vh] w-[60vh] flex flex-col justify-between shadow-lg">
//     <div className="p-4">
//       {/* <h1 className="text-xl font-semibold">hello</h1> */}
//       {message.map((msg)=> <div className=" text-xl font-semibold"
//       ><span className='bg-white px-5 py-2 rounded-2xl shadow'>{msg}</span>
//       </div>)}
//     </div>

//     <div className="flex items-center px-4 py-3">
//       <input
//         className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         placeholder="...type message"
//         ref={msgRef}
//       />
//       <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl shadow hover:bg-blue-600 transition"
//           onClick={()=>{
//             if (wsRef.current) {
//               wsRef.current.send(JSON.stringify({
//                 type: "chat",
//                 payload: {
//                   message: msgRef.current?.value
//                 }
//               }));
//             }
//           }}>
//         Send
//       </button>
//     </div>
//   </div>
// </div>

// </>

//   )
// }

function App(){
  
    return(
      <>
         <BrowserRouter>
           <Routes >
              <Route path="/" element={<HomePage/>}  />

              <Route path="/room" element={<ChatRoom/>}  />
           </Routes>
         </BrowserRouter>
      </>
    )
}

export default App
