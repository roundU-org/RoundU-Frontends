<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Edit3, History, LogOut, Bell, Shield, HelpCircle, X, Check } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, dispatch, bookings, notifications } = useApp();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
=======
import { useNavigate } from "react-router-dom";
import { ChevronRight, Edit3, History, LogOut, Bell, HelpCircle, Tag, Settings, Gift } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useApp();
>>>>>>> f48ab5114b79e725439ec9834468bbafd8e25090

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

<<<<<<< HEAD
  const saveProfile = () => {
    dispatch({ type: "UPDATE_USER", user: { name, email, address } });
    setEditOpen(false);
    toast.success("Profile updated");
  };

  return (
    <div className="min-h-full flex flex-col bg-background pb-24">
      <div className="px-5 pt-6 pb-4 animate-fade-in">
        <h1 className="text-2xl font-extrabold text-foreground">Profile</h1>
      </div>

      <div className="px-5 flex-1 overflow-y-auto space-y-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-xl font-extrabold">
            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-foreground">{user.name}</h2>
            <p className="text-xs text-muted-foreground">+91 {user.phone || "—"}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <button
            onClick={() => setEditOpen(true)}
            className="w-9 h-9 rounded-xl bg-input border border-border flex items-center justify-center"
          >
            <Edit3 size={14} className="text-primary" />
          </button>
        </div>


        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <Item icon={History} label="Booking History" onClick={() => navigate("/bookings")} />
          <Item icon={Bell} label="Notifications" onClick={() => toast(notifications[0]?.text || "No notifications")} />
          <Item icon={Shield} label="Privacy & Security" onClick={() => toast.message("Privacy settings opened")} />
          <Item icon={HelpCircle} label="Help & Support" onClick={() => toast.message("Support coming soon")} last />
=======
  return (
    <div className="min-h-full flex flex-col bg-[#F5F6FA] pb-24 font-sans">
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10 flex items-center">
        <h1 className="text-xl font-extrabold text-[#030916]">Profile</h1>
      </div>

      <div className="px-5 pt-5 flex-1 overflow-y-auto space-y-4">
        
        {/* Profile Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4 relative">
          <div className="w-16 h-16 rounded-full bg-[#152E4B] flex items-center justify-center text-white text-xl font-extrabold shadow-sm">
            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[17px] font-extrabold text-gray-900">{user.name}</h2>
            <p className="text-[13px] text-gray-500 font-medium mt-0.5">+91 {user.phone || "—"}</p>
            <p className="text-[13px] text-gray-500 font-medium truncate mt-0.5">{user.email || "hello@roundu.in"}</p>
          </div>
          <button
            onClick={() => navigate("/profile/edit")}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center active:scale-95 transition-all text-blue-600 hover:bg-blue-100"
          >
            <Edit3 size={16} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <Item icon={History} label="My Bookings" onClick={() => navigate("/bookings")} />
          <Item icon={Bell} label="Notifications" onClick={() => navigate("/notifications")} />
          <Item icon={Tag} label="Offers & Promos" onClick={() => navigate("/offers")} />
          <Item icon={Gift} label="Refer & Earn" onClick={() => navigate("/refer-earn")} />
          <Item icon={Settings} label="Settings" onClick={() => navigate("/settings")} />
          <Item icon={HelpCircle} label="Help & Support" onClick={() => navigate("/support")} last />
>>>>>>> f48ab5114b79e725439ec9834468bbafd8e25090
        </div>

        <button
          onClick={handleLogout}
<<<<<<< HEAD
          className="w-full py-3.5 rounded-2xl bg-card border border-destructive/30 text-destructive font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <LogOut size={16} />
=======
          className="w-full py-4 rounded-2xl bg-white border border-red-100 shadow-sm text-red-500 font-bold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-red-50 mt-2"
        >
          <LogOut size={18} />
>>>>>>> f48ab5114b79e725439ec9834468bbafd8e25090
          Log out
        </button>
      </div>

      <BottomNav />
<<<<<<< HEAD

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Field label="Name" value={name} onChange={setName} />
            <Field label="Email" value={email} onChange={setEmail} />
            <Field label="Address" value={address} onChange={setAddress} />
          </div>
          <div className="flex gap-2 mt-6">
            <button onClick={() => setEditOpen(false)} className="flex-1 py-3 rounded-xl bg-input border border-border text-sm font-semibold flex items-center justify-center gap-1">
              <X size={14} /> Cancel
            </button>
            <button onClick={saveProfile} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-1">
              <Check size={14} /> Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
=======
>>>>>>> f48ab5114b79e725439ec9834468bbafd8e25090
    </div>
  );
};

<<<<<<< HEAD
const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-card border border-border rounded-2xl p-3 text-center shadow-card">
    <p className="text-lg font-extrabold text-foreground">{value}</p>
    <p className="text-[10px] text-muted-foreground">{label}</p>
  </div>
);

const Item = ({ icon: Icon, label, onClick, last }: any) => (
  <button onClick={onClick} className={`w-full px-4 py-3.5 flex items-center gap-3 active:bg-input transition-colors ${last ? "" : "border-b border-border"}`}>
    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon size={16} className="text-primary" />
    </div>
    <span className="flex-1 text-left text-sm font-semibold text-foreground">{label}</span>
    <ChevronRight size={16} className="text-muted-foreground" />
  </button>
);

const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1 block">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 rounded-xl bg-input border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
    />
  </div>
);

=======
const Item = ({ icon: Icon, label, onClick, last }: any) => (
  <button onClick={onClick} className={`w-full px-5 py-4 flex items-center gap-4 active:bg-gray-50 transition-colors ${last ? "" : "border-b border-gray-50"}`}>
    <div className="w-10 h-10 rounded-xl bg-[#F5F6FA] flex items-center justify-center border border-gray-100">
      <Icon size={18} className="text-[#152E4B]" />
    </div>
    <span className="flex-1 text-left text-[14.5px] font-bold text-gray-800">{label}</span>
    <ChevronRight size={18} className="text-gray-300" />
  </button>
);

>>>>>>> f48ab5114b79e725439ec9834468bbafd8e25090
export default Profile;
