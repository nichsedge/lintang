import React from 'react';

interface LoShuCanvasProps {
  activeNodes?: number[];
  lines?: [number, number][];
  size?: number;
  interactive?: boolean;
  onNodeClick?: (nodeNum: number) => void;
  className?: string;
  theme?: 'dark' | 'light';
  showLabels?: boolean;
}

// Lo Shu Grid coordinates:
// 4  9  2  (y=0)
// 3  5  7  (y=1)
// 8  1  6  (y=2)
const nodeCoordinates: Record<number, { cx: number; cy: number }> = {
  4: { cx: 25, cy: 25 },
  9: { cx: 50, cy: 25 },
  2: { cx: 75, cy: 25 },
  3: { cx: 25, cy: 50 },
  5: { cx: 50, cy: 50 },
  7: { cx: 75, cy: 50 },
  8: { cx: 25, cy: 75 },
  1: { cx: 50, cy: 75 },
  6: { cx: 75, cy: 75 },
};

export const LoShuCanvas: React.FC<LoShuCanvasProps> = ({
  activeNodes = [8, 5, 2, 9],
  lines = [[8, 5], [5, 2], [5, 9]],
  size = 120,
  interactive = false,
  onNodeClick,
  className = '',
  theme = 'dark',
  showLabels = false,
}) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1F2A44' : '#F4EDE1';
  const inactiveDotColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(31, 42, 68, 0.2)';
  const activeDotFill = '#C9A45C'; // Emas Redup
  const activeGlow = '#F4EDE1';
  const lineColor = '#C9A45C';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl select-none transition-all shadow-inner ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-2"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id={`glow-${isDark ? 'dark' : 'light'}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Drawn connecting lines */}
        {lines.map(([from, to], idx) => {
          const p1 = nodeCoordinates[from];
          const p2 = nodeCoordinates[to];
          if (!p1 || !p2) return null;
          return (
            <line
              key={`line-${idx}-${from}-${to}`}
              x1={p1.cx}
              y1={p1.cy}
              x2={p2.cx}
              y2={p2.cy}
              stroke={lineColor}
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          );
        })}

        {/* 9 Lo Shu Nodes */}
        {[4, 9, 2, 3, 5, 7, 8, 1, 6].map((num) => {
          const pos = nodeCoordinates[num];
          const isActive = activeNodes.includes(num);

          return (
            <g
              key={`node-${num}`}
              className={interactive ? 'cursor-pointer group' : ''}
              onClick={() => {
                if (interactive && onNodeClick) {
                  onNodeClick(num);
                }
              }}
            >
              {/* Outer pulsing ring for active nodes */}
              {isActive && (
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r="7"
                  fill="none"
                  stroke="#C9A45C"
                  strokeWidth="0.8"
                  opacity="0.6"
                  className="animate-pulse"
                />
              )}

              {/* Main Node circle */}
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r={isActive ? 4.5 : 2.5}
                fill={isActive ? activeDotFill : inactiveDotColor}
                stroke={isActive ? activeGlow : 'none'}
                strokeWidth={isActive ? '1' : '0'}
                filter={isActive ? `url(#glow-${isDark ? 'dark' : 'light'})` : undefined}
                className="transition-all duration-200"
              />

              {/* Optional number label */}
              {showLabels && (
                <text
                  x={pos.cx}
                  y={pos.cy - 7}
                  textAnchor="middle"
                  fill={isActive ? '#C9A45C' : (isDark ? '#A1AAB8' : '#717885')}
                  fontSize="7"
                  fontWeight={isActive ? '700' : '400'}
                  className="select-none pointer-events-none"
                  fontFamily="'DM Sans', sans-serif"
                >
                  {num}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
