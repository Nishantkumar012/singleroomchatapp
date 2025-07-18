// HomePage.tsx
import  {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {

    // const userRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
       const [user, setUser] = useState<string>('');
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black">
      <div className="text-center bg-black/60 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
        /
        <h1 className="text-white text-4xl font-bold mb-4">Join a Room</h1>
        <input
          type="text"
           value={user}
           onChange={(e)=> setUser(e.target.value)}
          placeholder="Enter Name"
          className="w-full px-4 py-2 rounded bg-white text-black mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded font-semibold hover:opacity-90 transition"
           onClick={()=> navigate('/room' , {state:{user} })}>

          Join
        </button>
      </div>
    </div>
  );
}

export default HomePage;
