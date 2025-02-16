"use client";
import { useState } from 'react';

export default function IntroPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        reason: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main className="h-full bg-blue-500">
            <div className='bg-white text-black flex flex-col items-center justify-center gap-3 p-6 h-full'>
                <h1 className="text-2xl font-bold mb-5">Tell Us About Your Startup Dream</h1>
                <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-96 p-3 rounded-xl bg-gray-100" />
                <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-96 p-3 rounded-xl bg-gray-100" />
                <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-96 p-3 rounded-xl bg-gray-100" />
                <textarea name="reason" placeholder="Why are you thinking of a startup?" value={formData.reason} onChange={handleChange} className="w-96 p-3 h-28 rounded-xl bg-gray-100" />
                <button onClick={() => window.location.href = '/generate'} className="w-96 h-10 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-sm">
                    Let's Go!
                </button>
            </div>
        </main>
    );
}
