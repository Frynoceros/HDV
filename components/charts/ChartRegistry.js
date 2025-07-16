// Unified Chart.js registration system
// This ensures Chart.js modules are only registered once and only when needed

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
} from 'chart.js';

let isRegistered = false;

export function registerChartJS() {
  if (isRegistered) return;
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    Filler
  );
  
  isRegistered = true;
}

// Reset for testing purposes
export function resetChartRegistry() {
  isRegistered = false;
}

export { ChartJS };