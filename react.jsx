import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NexusInterface = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);

  // Fare hareketlerini takip eden Grid efekti
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    { id: 1, title: "DATA_CORE v1", tech: "React / Three.js", desc: "Finansal modelleme arayüzü." },
    { id: 2, title: "CYBER_SHELL", tech: "UI/UX Design", desc: "Fütüristik mobil portfolyo tasarımı." }
  ];

  return (
    <div className="relative h-screen w-full bg-[#050505] text-[#00f3ff] overflow-hidden font-mono">
      
      {/* KATMAN B: INTERACTIVE GRID */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black, transparent)`
        }}
      />

      {/* ANA TERMINAL */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black tracking-tighter mb-12 shadow-cyan-500/50"
        >
          THE_NEXUS_INTERFACE
        </motion.h1>

        <div className="flex gap-8">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #00f3ff" }}
              className="p-6 border border-[#00f3ff] bg-black/50 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedProject(proj)}
            >
              <h2 className="text-xl font-bold">{proj.title}</h2>
              <p className="text-xs opacity-60">STATUS: READY_TO_LOAD</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* KATMAN C: SPLIT-SCREEN OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <div className="absolute inset-0 z-50 flex">
            {/* Sol Kanat */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="w-1/2 h-full bg-[#050505] border-r border-[#00f3ff] p-20 flex flex-col justify-center"
            >
              <h3 className="text-4xl font-bold mb-4">SYSTEM_LOGS</h3>
              <div className="space-y-2 opacity-70 text-sm">
                <p>{`> ENCRYPTING_DATA... DONE`}</p>
                <p>{`> ANALYZING_ROI... %98.4`}</p>
                <p>{`> TECH_STACK: ${selectedProject.tech}`}</p>
              </div>
            </motion.div>

            {/* Sağ Kanat */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="w-1/2 h-full bg-[#050505] p-20 flex flex-col justify-center"
            >
              <h3 className="text-4xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="text-lg opacity-80 mb-8">{selectedProject.desc}</p>
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-40 py-2 border border-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all"
              >
                RETURN_TO_GRID
              </button>
            </motion.div>

            {/* Merkezi Hologram Efekti (Opsiyonel Işık) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-cyan-500 shadow-[0_0_50px_#00f3ff]" />
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NexusInterface;