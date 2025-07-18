import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';


function ChatRoom() {
     
  const [message, setMessage] = useState<{ sender: string; message: string }[]>([])
  const [count, setCount] = useState<number>(0)

const wsRef = useRef<WebSocket | null>(null);
  const location = useLocation();
  const username = location.state?.user || 'Anonymas'
      
      const msgRef = useRef<HTMLInputElement>(null);
   useEffect(()=>{
    //  const ws = new WebSocket("ws://localhost:8000");
     const ws = new WebSocket("https://singleroomchatapp.onrender.com/");

         
      // ws.onmessage=(e)=>{
      //      const data = JSON.parse(e.data);
      //      // Ensure payload has sender and message
      //      setMessage((m)=> [...m, { sender: data.payload.sender || 'Anonymous', message: data.payload.message || String(data.payload) }])
      //   //    alert("message has come")
      // } 

        ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === "chat") {
        setMessage((m) => [
          ...m,
          {
            sender: data.payload.sender || 'Anonymous',
            message: data.payload.message || String(data.payload),
          },
        ]);
      }

      if (data.type === "user-joined" || data.type === "user-left") {
      
        setCount(data.payload.count);
        
        console.log(data.payload.message);
      }
    };
           

         wsRef.current = ws; 
     ws.onopen =()=>{
       ws.send(JSON.stringify({
           type:"join",
           payload:{roomId:'red'}
       }))
     }
     alert("you have joined the room red")
    
    },[])


   

    







 return (
  <>
  

    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-black via-indigo-900 to-purple-800 animate-gradient bg-[length:300%_200%]">
  <div className="bg-white/10 backdrop-blur-md rounded-2xl h-[90vh] w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-[600px] flex flex-col justify-between shadow-lg border border-white/20">
    <div className="text-white text-center py-2 font-semibold text-base sm:text-lg">
      Users in room: {count}
    </div>

    {/* Message Area */}
    <div className="p-4 space-y-3 overflow-y-auto flex-1">
      {message.map((msgObj, index) => (
        <div
          key={index}
          className={`flex items-center space-x-3 text-sm sm:text-base font-semibold ${
            msgObj.sender === username ? 'justify-end' : 'justify-start'
          }`}
        >
          {msgObj.sender !== username && (
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center text-xs sm:text-sm">
              {msgObj.sender.slice(0, 2).toUpperCase()}
            </span>
          )}
          <span
            className={`px-4 py-2 sm:px-5 sm:py-2 rounded-2xl shadow break-words max-w-[80%] sm:max-w-[75%] ${
              msgObj.sender === username
                ? 'bg-green-300 text-black'
                : 'bg-[#C6E2FF] text-black'
            }`}
          >
            {msgObj.message}
          </span>
        </div>
      ))}
    </div>

    {/* Input Area */}
    <div className="flex items-center px-4 py-3 border-t border-white/20">
      <input
        className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 mr-2 sm:mr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60 backdrop-blur-sm placeholder-gray-700 text-sm sm:text-base"
        placeholder="...type message"
        ref={msgRef}
      />
      <button
        className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-2xl shadow hover:bg-blue-600 transition text-sm sm:text-base"
        onClick={() => {
          if (wsRef.current && msgRef.current?.value.trim()) {
            wsRef.current.send(
              JSON.stringify({
                type: 'chat',
                payload: {
                  message: msgRef.current.value,
                  sender: username,
                },
              })
            );
            console.log('Sender:', username);
            msgRef.current.value = '';
          }
        }}
      >
        Send
      </button>
    </div>
  </div>
</div>

  </>
);

}

export default ChatRoom