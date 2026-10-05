import React, { useEffect } from "react";
import {
  Coins,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeftIcon,
  PanelRight,
  PenSquare,
  Plus,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { getConversations } from "../features/getConversations";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  setConversations,
  setSelectedConversation,
} from "../redux/conversationsSlice";
import { createConversation } from "../features/createConversation";
import logOut from "../features/logOut";
import { setUserdata } from "../redux/userSlice";
import BillingDrawer from "./BillingDrawer";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const { conversations, selectedConversation } = useSelector((state) => state.conversation);
  const { userData } = useSelector((state) => state.user);
  const [showBilling,setShowBilling]=useState(false)
  const [mobileOpen,setMobileOpen] = useState(false)

  useEffect(() => {
    const getConv = async () => {
      const data = await getConversations();
      dispatch(setConversations(data));
    };
    getConv();
  }, [userData?._id]);

  const handleCreateConversation = async () => {
    const data = await createConversation();
    dispatch(addConversation(data));
  };
  if (collapsed) {
    return (
      <div className="hidden lg:flex flex-col items-center w-[64px] h-screen bg-gradient-to-b bg-[#0b1020] border-r border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,.35)] py-4 gap-1 shrink-0">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all duration-200 border-none cursor-pointer mb-1"
          onClick={() => setCollapsed(false)}
        >
          <PanelRight />
        </button>
        <button
          className="flex items-center w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] hover:scale-105 transition-all duration-200 bg-transparent border-none cursor-pointer"
          onClick={()=>dispatch(setSelectedConversation(null))}
        >
          <Plus size={17} />
        </button>

        <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-5">
          {conversations.map((conv, i) => {
            const isActive = selectedConversation?._id === conv?._id;
            return (
              <div
                key={conv._id}
                onClick={() => dispatch(setSelectedConversation(conv))}
                className={`flex items-center justify-center cursor-pointer mb-1 p-2 rounded-xl border transition-all duration-200 ${isActive ? "bg-indigo-500/10 border-indigo-500/20 shadow-[0_0_14px_rgba(99,102,241,.18)]" : "border-transparent hover:bg-white/[0.05]"}`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-[20px] h-[20px] rounded-lg transition-colors duration-150 ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.05] text-slate-500"}`}
                >
                  <MessageSquare size={13} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative shrink-0">
          {userData?.avatar && !imageError ? (
            <img
              className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
              src={userData?.avatar}
              alt={"image"}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center">
              <User size={15} className="text-slate-400" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
    <button className="lg:hidden fixed top-3.5 left-4 z-50 items-center justify-center w-8 h-8 rounded-lg bg-[#0d0f14] border border-white/[0.06] text-slate-400 hover:text-slate-200 transition-colors duration-150 cursor-pointer" onClick={()=>setMobileOpen(true)}>
    <Menu size={14}/>
   </button>
   {mobileOpen && <div onClick={()=>setMobileOpen(false)} className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"/>}

    <div className={`fixed lg:static inset-y-0 left-0 z-50 w-[280px] h-screen shrink-0
bg-gradient-to-b from-[#0b0d12] via-[#0f1117] to-[#090b10]
border-r border-white/10 backdrop-blur-xl shadow-[8px_0_40px_rgba(0,0,0,0.35)] ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10 backdrop-blur-md">
          <div
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            onClick={() => setCollapsed(true)}
          >
            <PanelLeftIcon />
          </div>
          <button onClick={()=> setMobileOpen(false)} className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer">
            <X />
          </button>
          <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
            CortexAI
          </span>
          <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/15 border-indigo-400/30 shadow-[0_0_18px_rgba(99,102,241,.18)] px-2 py-0.5 rounded-full tracking-wide">
            {userData?.plan || "free"}
          </span>
          <button
            className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            onClick={()=>dispatch(setSelectedConversation(null))}
          >
            <PenSquare size={14} />
          </button>
        </div>
        <div className="px-4 pt-4 pb-1">
          <button
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 shadow-lg shadow-indigo-900/40 hover:scale-[1.02] hover:shadow-indigo-700/40 transition-all duration-200 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
            onClick={()=>dispatch(setSelectedConversation(null))}
          >
            <Plus size={15} />
            New Chat
          </button>
        </div>
        {conversations?.length == 0? (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            No Recent Conversations
          </div>
        ) : (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            Recents
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {conversations?.map((conv, i) => {
            const isActive = selectedConversation?._id === conv?._id;
            return (
              <div
                key={conv._id}
                onClick={() => dispatch(setSelectedConversation(conv))}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-xl border transition-all duration-200 ${isActive ? "bg-gradient-to-r from-indigo-500/15 to-violet-500/10 border-indigo-400/30 shadow-[0_0_20px_rgba(99,102,241,.12)]" : "bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] rounded-2xl transition-all duration-200 border-transparent"}`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-colors duration-150 ${isActive ? "bg-indigo-500/20 shadow-inner text-indigo-400" : "bg-white/[0.06] text-slate-500"}`}
                >
                  <MessageSquare size={13} />
                </div>
                <span
                  className={`text-[13px] font-medium truncate ${isActive ? "text-white" : "text-slate-200"}`}
                >
                  {conv?.title || "New Chat"}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mx-2.5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="px-3.5 py-3.5">
          {userData ? (
            <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150">
              <div className="relative shrink-0">
                {userData?.avatar && !imageError ? (
                  <img
                    className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-400/40 shadow-md shadow-indigo-500/20"
                    src={userData?.avatar}
                    alt={"image"}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center">
                    <User size={15} className="text-slate-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-semibold text-slate-100 truncate">
                  {userData?.name || "user"}
                </p>
                <p className="text-[11px] text-slate-600 mt-px">
                  {`${userData?.plan}` || "free plan"}
                </p>
              </div>
              <div className="flex gap-1">
                <button 
                onClick={()=>setShowBilling(true)}
                className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150">
                  <Coins size={16} />
                </button>
                <button
                  className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-slate-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150"
                  onClick={() => {
                    logOut();
                    dispatch(setUserdata(null));
                  }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-200 bg-gradient-to-r from-slate-800 to-slate-700 border-white/[0.08] hover:from-indigo-600 hover:to-violet-600 hover:text-white transition-all duration-200 border border-white/[0.08] rounded-xl py-[11px] cursor-pointer hover:bg-white/[0.08] transition-colors duration-150">
              Login
            </button>
          )}
        </div>
      </div>

      
    </div>
    <BillingDrawer open={showBilling} onClose={()=>setShowBilling(false)} />
    </>
  );
}

export default Sidebar;
