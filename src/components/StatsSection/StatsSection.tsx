import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Users, TrendingUp, Award } from 'lucide-react';
import './statssection.css';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

export const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const stats: StatItem[] = [
    {
      icon: <GraduationCap size={24} />,
      value: 15000,
      suffix: '+',
      label: 'Students Trained',
    },
    {
      icon: <Users size={24} />,
      value: 250,
      suffix: '+',
      label: 'Recruiters',
    },
    {
      icon: <TrendingUp size={24} />,
      value: 95,
      suffix: '%',
      label: 'Placement Rate',
    },
    {
      icon: <Award size={24} />,
      value: 13,
      suffix: '+',
      label: 'Years Experience',
    },
  ];

  return (
    <div className="stats-wrapper" ref={containerRef}>
      <div className="container">
        <motion.div 
          className="stats-card"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <StatCounter 
                key={idx} 
                stat={stat} 
                triggerCount={isInView} 
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface StatCounterProps {
  stat: StatItem;
  triggerCount: boolean;
}

const StatCounter: React.FC<StatCounterProps> = ({ stat, triggerCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggerCount) return;

    let start = 0;
    const end = stat.value;
    const duration = 2000; // ms
    const incrementTime = Math.max(Math.floor(duration / end), 15);
    
    // Slow down updates if value is large (e.g. 15,000) so it finishes in 2s
    const step = Math.ceil(end / 100);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [triggerCount, stat.value]);

  // Formatter for large numbers (15,000 -> 15,000 or 15K depending on label)
  const formatCount = (val: number) => {
    if (val >= 1000) {
      return (val / 1000).toFixed(0) + 'k';
    }
    return val.toString();
  };

  return (
    <div className="stat-box">
      <div className="stat-icon-container">
        {stat.icon}
      </div>
      <div className="stat-info">
        <span className="stat-number">
          {formatCount(count)}
          {stat.suffix}
        </span>
        <span className="stat-label">{stat.label}</span>
      </div>
    </div>
  );
};
