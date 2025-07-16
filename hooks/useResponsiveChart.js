import { useState, useEffect } from 'react';

export function useResponsiveChart() {
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState('lg');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      if (width < 640) {
        setScreenSize('sm');
      } else if (width < 768) {
        setScreenSize('md');
      } else if (width < 1024) {
        setScreenSize('lg');
      } else {
        setScreenSize('xl');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getResponsiveOptions = (baseOptions = {}) => {
    const responsiveOptions = {
      ...baseOptions,
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        ...baseOptions.plugins,
        legend: {
          ...baseOptions.plugins?.legend,
          position: isMobile ? 'bottom' : 'top',
          labels: {
            ...baseOptions.plugins?.legend?.labels,
            padding: isMobile ? 15 : 20,
            fontSize: isMobile ? 12 : 14,
            boxWidth: isMobile ? 15 : 20,
            usePointStyle: true,
          },
        },
        tooltip: {
          ...baseOptions.plugins?.tooltip,
          enabled: true,
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          padding: isMobile ? 8 : 12,
          titleFont: {
            size: isMobile ? 12 : 14,
          },
          bodyFont: {
            size: isMobile ? 11 : 13,
          },
        },
      },
      scales: {
        ...baseOptions.scales,
        x: {
          ...baseOptions.scales?.x,
          title: {
            ...baseOptions.scales?.x?.title,
            font: {
              size: isMobile ? 12 : 14,
            },
          },
          ticks: {
            ...baseOptions.scales?.x?.ticks,
            font: {
              size: isMobile ? 10 : 12,
            },
            maxRotation: isMobile ? 45 : 0,
            minRotation: isMobile ? 45 : 0,
          },
        },
        y: {
          ...baseOptions.scales?.y,
          title: {
            ...baseOptions.scales?.y?.title,
            font: {
              size: isMobile ? 12 : 14,
            },
          },
          ticks: {
            ...baseOptions.scales?.y?.ticks,
            font: {
              size: isMobile ? 10 : 12,
            },
          },
        },
      },
    };

    return responsiveOptions;
  };

  const getChartHeight = () => {
    switch (screenSize) {
      case 'sm':
        return 300;
      case 'md':
        return 350;
      case 'lg':
        return 400;
      default:
        return 450;
    }
  };

  const getChartContainer = () => {
    return {
      height: getChartHeight(),
      width: '100%',
    };
  };

  return {
    isMobile,
    screenSize,
    getResponsiveOptions,
    getChartHeight,
    getChartContainer,
  };
}