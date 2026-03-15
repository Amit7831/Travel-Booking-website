import React, { useState } from 'react';
import axios from "axios";
// Optional: Install lucide-react for modern icons
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const url = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent accidental page refreshes
    setLoading(true);
    
    try {
      const postUrl = `${url}/contact/add`;
      const res = await axios.post(postUrl, { name, email, phone, message });

      if (res?.data?.status) {
        alert(res?.data?.message || "Message sent successfully!");
        setName(""); setEmail(""); setPhone(""); setMessage("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen  flex items-center justify-center bg-gradient-to-r from-[#dfe2fe] via-[#b1cbfa] to-[#8e98f5] p-4  md:p-10'>
      <div className='max-w-6xl  mt-20 w-full grid lg:grid-cols-5 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden'>

        {/* --- Left Side: Info (Takes 2 columns) --- */}
        <div className='lg:col-span-2  bg-gradient-to-tl from-[#1e293b] via-[#6366f1] to-[#71717a] p-8 md:p-12 text-white flex flex-col justify-between'>
          <div>
            <span className='bg-blue-500 text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full'>
              Get In Touch
            </span>
            <h1 className='text-4xl font-extrabold mt-6 leading-tight'>
              Let's create<br /> memoriable.
            </h1>
            <p className='text-blue-100 mt-6 leading-relaxed'>
              Ready for your next extraordinary journey? Reach out and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className='mt-10 space-y-6'>
            <div className='flex items-center gap-4'>
              <div className='bg-blue-500 p-3 rounded-lg'><Mail size={20} /></div>
              <p className='font-medium'>amit@company.com</p>
            </div>
            <div className='flex items-center gap-4'>
              <div className='bg-blue-500 p-3 rounded-lg'><Phone size={20} /></div>
              <p className='font-medium'>+91 (555) 000-0000</p>
            </div>
            <div className='flex items-center gap-4'>
              <div className='bg-blue-500 p-3 rounded-lg'><MapPin size={20} /></div>
              <p className='font-medium'>123 Tech Avenue, Silicon Valley</p>
            </div>
          </div>
        </div>

        {/* --- Right Side: Form (Takes 3 columns) --- */}
        <div className='lg:col-span-3 p-8 md:p-12'>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Full Name</label>
              <input 
                required
                className='w-full border-gray-200 border rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all'
                type="text" placeholder='John Doe'
                onChange={(e) => setName(e.target.value)} value={name} 
              />
            </div>

            <div className='grid md:grid-cols-2 gap-5'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address</label>
                <input 
                  required
                  className='w-full border-gray-200 border rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all'
                  type="email" placeholder='john@example.com'
                  onChange={(e) => setEmail(e.target.value)} value={email} 
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Phone Number</label>
                <input 
                  className='w-full border-gray-200 border rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all'
                  type="tel" placeholder='+1...'
                  onChange={(e) => setPhone(e.target.value)} value={phone} 
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Message</label>
              <textarea 
                required
                rows="4"
                placeholder='How can we help you?'
                className='w-full border-gray-200 border rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none'
                onChange={(e) => setMessage(e.target.value)} value={message} 
              />
            </div>

            <button 
              disabled={loading}
              type="submit"
              className='w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] transition-all disabled:bg-blue-300 disabled:cursor-not-allowed'
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;