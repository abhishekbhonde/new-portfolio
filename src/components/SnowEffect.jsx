import { useEffect, useState } from 'react';

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const createSnowflake = () => ({
      id: Math.random(),
      left: Math.random() * 100,
      size: Math.random() * 4 + 1,
      animationDuration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.6 + 0.2
    });

    const initialSnowflakes = Array.from({ length: 50 }, createSnowflake);
    setSnowflakes(initialSnowflakes);

    const interval = setInterval(() => {
      setSnowflakes(prev => {
        const newSnowflakes = prev.filter(() => Math.random() > 0.02);
        const snowflakesToAdd = 50 - newSnowflakes.length;
        return [
          ...newSnowflakes,
          ...Array.from({ length: snowflakesToAdd }, createSnowflake)
        ];
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {snowflakes.map(snowflake => (
        <div
          key={snowflake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${snowflake.left}%`,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            opacity: snowflake.opacity,
            animation: `fall ${snowflake.animationDuration}s linear infinite`
          }}
        />
      ))}
    </div>
  );
} 