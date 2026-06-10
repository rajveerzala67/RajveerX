import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroCard() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || status === 'sending') return;

    setStatus('sending');

    try {
      const response = await fetch("https://formspree.io/f/xeewzrza", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          message: message
        })
      });

      if (response.ok) {
        setStatus('success');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }

    // Automatically revert back to the input form state after 4 seconds
    setTimeout(() => {
      setStatus('idle');
    }, 4000);
  };

  return (
    <div className="glass rounded-3xl h-full w-full p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:shadow-blue-500/10">

      {/* Bio Information */}
      <div className="mb-6 md:mb-0">
        <h2 className="font-syne text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
          Hi, I'm Rajveer
        </h2>
        <p className="font-satoshi text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
          Over time, I have built a variety of web applications including social media platforms, news portals, 3D interactive experiences, portfolio websites, and full-stack MERN applications.
        </p>
      </div>

      {/* Form or Success/Error Banner */}
      <div className="relative w-full h-12 mt-6">
        <AnimatePresence mode="wait">
          {status === 'idle' || status === 'sending' ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex w-full h-full items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-blue-500/50 transition-colors duration-300"
            >
              <input
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a quick note or say hi..."
                className="flex-1 bg-transparent px-4 text-sm text-white placeholder-white/35 outline-none"
                required
                disabled={status === 'sending'}
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="h-full px-5 bg-white/10 hover:bg-white text-white hover:text-black transition-colors duration-300 flex items-center justify-center border-l border-white/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Send message"
              >
                {status === 'sending' ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </motion.form>
          ) : status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="absolute inset-0 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-4 rounded-2xl"
            >
              <CheckCircle2 size={20} className="flex-shrink-0" />
              <span className="font-syne text-sm font-medium tracking-wide">
                message send !
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="error"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="absolute inset-0 flex items-center gap-3 bg-rose-500/10 border border-rose-500/25 text-rose-400 px-4 rounded-2xl"
            >
              <span className="font-syne text-sm font-medium tracking-wide">
                Failed to send. Please try again.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
