import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {setUserdata} from "../redux/userSlice"
import Artifact from "../components/Artifact";
import Sidebar from "../components/SideBar";
import ChatArea from "../components/ChatArea";

function Home() {
  const {userData} = useSelector(state=>state.user)
  const dispatch = useDispatch()
   const handlelogin = async (token) =>{
    try {
      const {data} = await api.post("/api/auth/login",{token})
      dispatch(setUserdata(data))
    } catch (error) {
     console.log(error) 
    }
  }
  const googlelogin = async () => {
    const data = await signInWithPopup(auth,googleProvider);
    const token = await data.user.getIdToken()
    console.log(token)
    await handlelogin(token)
    console.log(data);
  };
  return (
  //   <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
  //     lo
  //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
  //     <div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5">
  //     <div className="flex flex-col gap-1">
  //       <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">Welcome to CortexAi</h2>
  //         <p className="text-[13px] text-slate-500">Please login to continue using the app</p>
        
  //     </div>
  //     <button className="w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium tet-white bg-linear-to-br from indigo-500 to violet-700 hover:from-indigo-400 hover:to-violet-600 active:from-indigo-600 active:to-violet-800 border border-indigo-500/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-150 cursor-pointer">
  //       <FcGoogle size={15} className="text-white"/>
  //       Continue With Google
  //     </button>

  //     </div>
     
  //     </div>
      
  //   </div>

  <div className="h-screen min-w-0 flex bg-[#0b0d13] text-white overflow-hidden">

<Sidebar/>
<ChatArea/>
<Artifact/>

{!userData && (
  <>
    {/* Background Glow */}
  <div className="absolute w-[450px] h-[450px] rounded-full bg-indigo-600/20 blur-[130px] top-[-120px] left-[-120px]" />
  <div className="absolute w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-[130px] bottom-[-120px] right-[-120px]" />

  {/* Overlay */}
  <div className="fixed inset-0 flex items-center justify-center bg-black/55 backdrop-blur-xl">

    {/* Gradient Border */}
    <div className="p-[1px] rounded-3xl bg-gradient-to-br from-indigo-500/50 via-violet-500/30 to-cyan-500/40 shadow-[0_0_60px_rgba(99,102,241,0.25)]">

      {/* Card */}
      <div className="w-[380px] rounded-3xl bg-[#11141d]/90 backdrop-blur-2xl border border-white/10 px-8 py-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/30">
            🤖
          </div>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome to <span className="text-indigo-400">CortexAI</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            Sign in with your Google account and unlock your AI workspace.
          </p>
        </div>

        {/* Google Button */}
        <button
        onClick={googlelogin}
          className="mt-8 w-full flex items-center justify-center gap-3 rounded-2xl
          bg-gradient-to-r from-indigo-600 to-violet-600
          hover:from-indigo-500 hover:to-violet-500
          active:scale-[0.98]
          transition-all duration-300
          py-3.5 font-medium shadow-xl shadow-indigo-500/30 cursor-pointer"
        >
          <div className="bg-white rounded-full p-2">
            <FcGoogle size={18} />
          </div>

          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-slate-500 uppercase tracking-widest">
            Secure Login
          </span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 leading-relaxed">
          By continuing you agree to our
          <span className="text-indigo-400 cursor-pointer hover:underline">
            {" "}Terms
          </span>
          {" "}and{" "}
          <span className="text-indigo-400 cursor-pointer hover:underline">
            Privacy Policy
          </span>
        </p>

      </div>
    </div>
  </div>
  </>
)}
</div>
   )

}


export default Home
