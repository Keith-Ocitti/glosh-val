'use client';

import { useState, useEffect } from 'react';

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function ValentineProposal() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showBubbles, setShowBubbles] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [puppiesDancing, setPuppiesDancing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 2,
        size: 20 + Math.random() * 30
      };
      
      setHearts(prev => [...prev.slice(-10), newHeart]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleNoHover = () => {
    let newX, newY;
    let attempts = 0;
    
    // Generate positions until we find a safe one or max attempts reached
    do {
      newX = Math.random() * 200 - 100;
      newY = Math.random() * 100 + 20; // Only move to spaces below (20px to 120px down)
      attempts++;
    } while (
      Math.abs(newX) < 60 && // Keep away from Yes button
      attempts < 20
    );
    
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setShowBubbles(true);
    setShowMessage(true);
    setPuppiesDancing(true);
    
    const newBubbles: Bubble[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 50,
      y: 50,
      size: Math.random() * 40 + 20
    }));
    
    setBubbles(newBubbles);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 overflow-hidden">
      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute text-red-400 animate-pulse"
            style={{
              left: `${heart.left}%`,
              bottom: '-50px',
              fontSize: `${heart.size}px`,
              animation: `float ${heart.animationDuration}s ease-in-out infinite`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Bubble Animation */}
      {showBubbles && (
        <div className="absolute inset-0 pointer-events-none">
          {bubbles.map(bubble => (
            <div
              key={bubble.id}
              className="absolute rounded-full bg-pink-300 opacity-60"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                animation: `bubbleFloat 2s ease-out forwards`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Cute Puppy Illustrations */}
          <div className="flex justify-center gap-2 mb-6 px-4">
            <svg width="60" height="60" viewBox="0 0 100 100" className={puppiesDancing ? "animate-bounce" : "animate-bounce"} style={puppiesDancing ? {animationDuration: '0.4s'} : {}}>
              {/* Puppy 1 - Full standing */}
              {/* Body */}
              <ellipse cx="50" cy="55" rx="15" ry="20" fill="#D2691E" stroke="#8B4513" strokeWidth="1.5"/>
              {/* Head */}
              <circle cx="50" cy="30" r="12" fill="#D2691E" stroke="#8B4513" strokeWidth="1.5"/>
              {/* Ears */}
              <ellipse cx="38" cy="25" rx="6" ry="10" fill="#8B4513" transform="rotate(-20 38 25)"/>
              <ellipse cx="62" cy="25" rx="6" ry="10" fill="#8B4513" transform="rotate(20 62 25)"/>
              {/* Eyes */}
              <circle cx="45" cy="28" r="2" fill="#000"/>
              <circle cx="55" cy="28" r="2" fill="#000"/>
              {/* Nose */}
              <ellipse cx="50" cy="33" rx="3" ry="2" fill="#000"/>
              {/* Mouth */}
              <path d="M 47 35 Q 50 37 53 35" stroke="#000" strokeWidth="1" fill="none"/>
              {/* Front legs */}
              <rect x="42" y="65" width="4" height="12" fill="#D2691E" stroke="#8B4513" strokeWidth="1"/>
              <rect x="54" y="65" width="4" height="12" fill="#D2691E" stroke="#8B4513" strokeWidth="1"/>
              {/* Paws */}
              <ellipse cx="44" cy="77" rx="3" ry="2" fill="#8B4513"/>
              <ellipse cx="56" cy="77" rx="3" ry="2" fill="#8B4513"/>
              {/* Tail */}
              <path d="M 35 50 Q 25 45 20 35" stroke="#D2691E" strokeWidth="4" fill="none" strokeLinecap="round"/>
              {/* Bow */}
              <circle cx="50" cy="20" r="3" fill="#FFB6C1"/>
              <text x="50" y="90" textAnchor="middle" fill="#FF1493" fontSize="10">💕</text>
            </svg>
            
            <svg width="60" height="60" viewBox="0 0 100 100" className={puppiesDancing ? "animate-bounce" : "animate-pulse"} style={puppiesDancing ? {animationDuration: '0.3s'} : {}}>
              {/* Puppy 2 - Full standing */}
              {/* Body */}
              <ellipse cx="50" cy="55" rx="14" ry="18" fill="#F4A460" stroke="#D2691E" strokeWidth="1.5"/>
              {/* Head */}
              <circle cx="50" cy="32" r="11" fill="#F4A460" stroke="#D2691E" strokeWidth="1.5"/>
              {/* Ears */}
              <ellipse cx="39" cy="28" rx="5" ry="9" fill="#D2691E" transform="rotate(-15 39 28)"/>
              <ellipse cx="61" cy="28" rx="5" ry="9" fill="#D2691E" transform="rotate(15 61 28)"/>
              {/* Eyes */}
              <circle cx="46" cy="30" r="1.5" fill="#000"/>
              <circle cx="54" cy="30" r="1.5" fill="#000"/>
              {/* Nose */}
              <ellipse cx="50" cy="34" rx="2.5" ry="1.5" fill="#000"/>
              {/* Mouth */}
              <path d="M 47 36 Q 50 38 53 36" stroke="#000" strokeWidth="1" fill="none"/>
              {/* Front legs */}
              <rect x="43" y="67" width="3.5" height="10" fill="#F4A460" stroke="#D2691E" strokeWidth="1"/>
              <rect x="53.5" y="67" width="3.5" height="10" fill="#F4A460" stroke="#D2691E" strokeWidth="1"/>
              {/* Paws */}
              <ellipse cx="44.5" cy="77" rx="2.5" ry="1.5" fill="#D2691E"/>
              <ellipse cx="55.5" cy="77" rx="2.5" ry="1.5" fill="#D2691E"/>
              {/* Tail */}
              <path d="M 36 52 Q 28 48 24 40" stroke="#F4A460" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              {/* Bow */}
              <circle cx="50" cy="22" r="2.5" fill="#FFC0CB"/>
              <text x="50" y="90" textAnchor="middle" fill="#FF1493" fontSize="10">🐾</text>
            </svg>
            
            <svg width="60" height="60" viewBox="0 0 100 100" className={puppiesDancing ? "animate-bounce" : "animate-bounce"} style={puppiesDancing ? {animationDuration: '0.3s'} : {animationDelay: '0.5s'}}>
              {/* Puppy 3 - Full standing */}
              {/* Body */}
              <ellipse cx="50" cy="54" rx="16" ry="19" fill="#DEB887" stroke="#D2691E" strokeWidth="1.5"/>
              {/* Head */}
              <circle cx="50" cy="31" r="11.5" fill="#DEB887" stroke="#D2691E" strokeWidth="1.5"/>
              {/* Ears */}
              <ellipse cx="38" cy="26" rx="5.5" ry="9.5" fill="#D2691E" transform="rotate(-25 38 26)"/>
              <ellipse cx="62" cy="26" rx="5.5" ry="9.5" fill="#D2691E" transform="rotate(25 62 26)"/>
              {/* Eyes */}
              <circle cx="46" cy="29" r="2" fill="#000"/>
              <circle cx="54" cy="29" r="2" fill="#000"/>
              {/* Nose */}
              <ellipse cx="50" cy="33" rx="2.8" ry="1.8" fill="#000"/>
              {/* Mouth */}
              <path d="M 47 35 Q 50 37 53 35" stroke="#000" strokeWidth="1" fill="none"/>
              {/* Front legs */}
              <rect x="42" y="68" width="4" height="11" fill="#DEB887" stroke="#D2691E" strokeWidth="1"/>
              <rect x="54" y="68" width="4" height="11" fill="#DEB887" stroke="#D2691E" strokeWidth="1"/>
              {/* Paws */}
              <ellipse cx="44" cy="79" rx="3" ry="2" fill="#D2691E"/>
              <ellipse cx="56" cy="79" rx="3" ry="2" fill="#D2691E"/>
              {/* Tail */}
              <path d="M 34 51 Q 24 46 18 36" stroke="#DEB887" strokeWidth="4" fill="none" strokeLinecap="round"/>
              {/* Bow */}
              <circle cx="50" cy="21" r="3.2" fill="#FFB6C1"/>
              <text x="50" y="90" textAnchor="middle" fill="#FF1493" fontSize="10">💝</text>
            </svg>
          </div>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed px-4 font-comic-neue">
            Hey there Pumkin 😊
          </p>
          
          <p className="text-xl md:text-2xl font-semibold text-pink-600 mb-8 px-4 font-dancing-script">
            Will you be my Valentine? 🌹
          </p>

          {/* Success Message */}
          {showMessage && (
            <div className="mb-6 text-2xl md:text-3xl font-bold text-green-600 animate-bounce px-4 font-dancing-script">
              YAY! I'm the happiest person alive! 🎉💖
            </div>
          )}

          {/* Buttons */}
          {!showMessage && (
            <div className="flex gap-4 justify-center items-center px-4">
              <button
                onClick={handleYesClick}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold text-sm rounded-full transform transition-all duration-200 hover:scale-110 shadow-lg font-comic-neue"
              >
                YES! 💖
              </button>
              
              <button
                onMouseEnter={handleNoHover}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-full transform transition-all duration-200 shadow-lg relative font-comic-neue"
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                }}
              >
                No 😔
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes bubbleFloat {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -150vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
