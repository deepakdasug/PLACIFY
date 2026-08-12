import React from 'react';
import './PieChart.css';

interface PieChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const PieChart: React.FC<PieChartProps> = ({ 
  percentage, 
  size = 120, 
  strokeWidth = 10,
  label = 'Readiness'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  const displayPercentage = Math.round(percentage);
  console.log('PieChart data:', { percentage, displayPercentage, size, radius });

  const getColor = (percent: number) => {
    if (percent >= 80) return '#4CAF50';
    if (percent >= 60) return '#FF9800';
    if (percent >= 40) return '#FFC107';
    return '#F44336';
  };

  return (
    <div className="pie-chart-container">
      <div className="pie-chart-wrapper" style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} className="pie-chart" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor(percentage)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="pie-chart-progress"
          />
        </svg>
        {/* Percentage text overlay */}
        <div 
          className="pie-chart-text-overlay"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#212121',
            zIndex: 10
          }}
        >
          {displayPercentage}%
        </div>
      </div>
      {label && <p className="pie-chart-label">{label}</p>}
    </div>
  );
};