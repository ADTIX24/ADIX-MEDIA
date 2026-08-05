import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showGlowingBorder?: boolean;
  variant?: 'full' | 'icon' | 'badge';
  customLogoUrl?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showGlowingBorder = false,
  variant = 'full',
  customLogoUrl,
  onClick
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    hero: 'w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48'
  };

  const svgDimension = {
    sm: 100,
    md: 140,
    lg: 180,
    xl: 220,
    hero: 280
  }[size];

  return (
    <div 
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center cursor-pointer select-none group ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* User requirement: "ايطار لوغو بديا بديا اضائه مخفيه متحركه رفيعه بالوان ازرق واصفر واحمر واخضر" */}
        {showGlowingBorder && (
          <>
            {/* Outer subtle glow blur */}
            <div 
              className="absolute -inset-1.5 rounded-full opacity-70 blur-md transition-opacity duration-500 group-hover:opacity-100 animate-pulse-glow"
              style={{
                background: 'conic-gradient(from 0deg, #00a8ff, #ffb700, #ff3366, #00e676, #00a8ff)'
              }}
            />

            {/* Thin animated spinning multi-color border ring */}
            <div 
              className="absolute -inset-1 rounded-full p-[1.5px] animate-multi-glow-spin opacity-90 overflow-hidden"
              style={{
                background: 'conic-gradient(from 0deg, #00a8ff, #ffb700, #ff3366, #00e676, #00a8ff)'
              }}
            >
              <div className="w-full h-full bg-[#0b0d17] rounded-full" />
            </div>
          </>
        )}

        {/* Circular Frame matching reference photo 2 */}
        <div className={`relative rounded-full bg-[#12152a]/90 backdrop-blur-md p-2 sm:p-3 flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden ${sizeClasses[size]}`}>
          {customLogoUrl ? (
            <img 
              src={customLogoUrl} 
              alt="Custom Logo" 
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            /* ADIX MEDIA Dual Loop X Logo Symbol */
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-[0_0_12px_rgba(236,72,153,0.3)] transition-transform duration-500 group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Loop 1 Gradient: Blue -> Cyan -> Orange -> Red */}
                <linearGradient id="adixGrad1" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00a8ff" />
                  <stop offset="35%" stopColor="#0284c7" />
                  <stop offset="70%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>

                {/* Loop 2 Gradient: Yellow -> Gold -> Magenta -> Cyan */}
                <linearGradient id="adixGrad2" x1="180" y1="20" x2="20" y2="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="40%" stopColor="#d97706" />
                  <stop offset="75%" stopColor="#be123c" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>

                {/* Inner Shadow Filter for 3D depth */}
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Wing 1: Top-Left to Bottom-Right */}
              <path
                d="M 35 40 C 90 20, 160 80, 175 155 C 160 170, 120 160, 85 125 C 50 90, 20 60, 35 40 Z"
                fill="url(#adixGrad1)"
                filter="url(#shadow)"
              />
              {/* Inner cut for Loop 1 */}
              <path
                d="M 65 68 C 95 55, 140 95, 148 138 C 128 135, 95 110, 72 88 Z"
                fill="#12152a"
              />

              {/* Wing 2: Top-Right to Bottom-Left */}
              <path
                d="M 165 40 C 110 20, 40 80, 25 155 C 40 170, 80 160, 115 125 C 150 90, 180 60, 165 40 Z"
                fill="url(#adixGrad2)"
                filter="url(#shadow)"
              />
              {/* Inner cut for Loop 2 */}
              <path
                d="M 135 68 C 105 55, 60 95, 52 138 C 72 135, 105 110, 128 88 Z"
                fill="#12152a"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Brand Text Below Logo */}
      {(variant === 'full' || variant === 'badge') && (
        <div className="mt-2.5 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-1.5 font-extrabold tracking-wider font-['Readex_Pro',sans-serif]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-500 text-lg sm:text-xl">
              ADIX
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 text-lg sm:text-xl">
              MEDIA
            </span>
          </div>
          <span className="text-[10px] text-slate-400 tracking-widest uppercase font-mono mt-0.5 opacity-80">
            DIGITAL AGENCY
          </span>
        </div>
      )}
    </div>
  );
};
