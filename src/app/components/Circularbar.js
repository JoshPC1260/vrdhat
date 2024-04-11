import { useState } from 'react';

export default function CircularProgressbar({ value, title, max_value }) {
  const strokeWidth = 5; // Ancho del trazo (stroke width)
  const radius = 85; // Radio del círculo (circle radius)
  const circumference = Math.PI * radius * 2; // Circunferencia del círculo (circle circumference)

  // Calculate the progress ratio for both stroke dasharray and offset
  const progressRatio = value / max_value;
  const progressDasharray = circumference;
  const progressDashoffset = circumference - progressRatio * circumference;

  // Calculate colors based on progress
  const getGradientColor = (progress) => {
    // Adjust these ranges and colors as needed
    if (progress <= 0.25) {
      return '#ff0000';
    } else if (progress <= 0.5) {
      return 'yellow';
    } else if (progress <= 0.75) {
      return '#ff6e00';
    } else {
      return '#00ff5d';
    }
  };

  const getLetterScore = (input_value) => {
    // Adjust these ranges and letters as needed
    if (input_value <= 0.2) {
      return 'F';
    } else if (input_value <= 0.4) {
      return 'D';
    } else if (input_value <= 0.6) {
      return 'C';
    } else if (input_value <= 0.8) {
      return 'B';
    } else {
      return 'A';
    }
  };

  return (
    <div className='h-full w-full flex flex-wrap items-center justify-center'>
      <h1
        x="50%"
        y="0%"
        className='text-zinc-50 w-full text-center font-bold text-3xl mb-3'
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {title}
      </h1>
      <svg width="250" height="250" viewBox="0 0 200 200">
        {/* Background circle (full circle) */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          className="circle-background"
          strokeWidth={strokeWidth}
          stroke="#ddd" // Set background color here (replace with desired color)
        />

        {/* Progress bar (filled portion) */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={getGradientColor(progressRatio)}
          strokeWidth={strokeWidth } // Adjust stroke width for visual differentiation
          className="circle-progress"
          style={{
            strokeDasharray: progressDasharray,
            strokeDashoffset: progressDashoffset,
            strokeLinecap: 'round', // Apply rounded corners
          }}
          transform="rotate(-90 100 100)"
        />

        {/* Labels */}
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill='#ddd'
          style={{ fontWeight: '600' }}
          className='text-zinc-800 text-bold text-8xl'
        >
          {getLetterScore(progressRatio)}
        </text>

        <text
          x="50%"
          y="70%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill='#ddd'
          style={{ fontWeight: '500' }}
          className='text-zinc-800 text-bold text-1xl'
        >
          {value} out of {max_value}
        </text>
      </svg>
    </div>
  );
}
