"use client";

import { useState } from "react";
import EditProfileModal from "../components/EditProfileModal";
import ProfileSidebar from "../components/profileSidebar";
import { ProfileFormData } from "../schemas/profile.schema";

const initialProfile: ProfileFormData = {
    name:"Supriya",
    email:"supriya@astal.com",
    phone: "+91 9876543210",
  city: "Pune",
  state: "Maharashtra",
  gst: "27ABCDE1234F1Z5",

}


export default function ProfilePage() {
    const [profile,setProfile] = useState<ProfileFormData>(initialProfile)
    const [editOpen,setEditOpen] = useState(false);

    function handleSave(data:ProfileFormData) {
setProfile(data);
setEditOpen(false);
    }
  return (
    <>
    <main className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <ProfileSidebar />

      {/* Main Content */}
      <section className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
          <div className="flex items-center gap-6">
            <img
              src="/images/user.jpg"
              alt="User"
              className="w-24 h-24 rounded-full border"
            />

            <div>
              <h2 className="text-xl font-semibold">Supriya</h2>
              <p className="text-gray-500">supriya@gmail.com</p>
              <button onClick={()=>setEditOpen(true)} className="mt-3 px-4 py-2 cursor-pointer text-sm rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <Info label="Phone" value={profile.phone} />
            <Info label="City" value={profile.city} />
            <Info label="State" value={profile.state} />
            <Info label="GST Number" value={profile.gst} />
          </div>
        </div>
      </section>
    </main>
    <EditProfileModal onClose={()=>setEditOpen(false)} open={editOpen} onSave={handleSave} defaultValues={profile}/>
    </>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value ?? "-"}</p>
    </div>
  );
}
