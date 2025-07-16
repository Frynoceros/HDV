import { useEffect, useState } from 'react';

// Loading component with customizable size and message
export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <svg
      className={`animate-spin text-gray-200 fill-blue-600 ${sizeClasses[size]} ${className}`}
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );
}

// Full page loading state
export function LoadingPage({ message = 'Loading...' }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
    >
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-sm text-gray-600">{message}</p>
      <span className="sr-only">{message}</span>
    </div>
  );
}

// Inline loading state for components
export function LoadingInline({ message = 'Loading...' }) {
  return (
    <div role="status" className="flex items-center justify-center p-4">
      <LoadingSpinner size="sm" className="mr-2" />
      <span className="text-sm text-gray-600">{message}</span>
      <span className="sr-only">{message}</span>
    </div>
  );
}

// Skeleton loader for content
export function LoadingSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="mb-2">
          <div
            className="h-4 bg-gray-200 rounded"
            style={{ width: `${Math.random() * 40 + 60}%` }}
          />
        </div>
      ))}
    </div>
  );
}

// Loading overlay for sections
export function LoadingOverlay({ message = 'Loading...' }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      <div className="flex flex-col items-center">
        <LoadingSpinner size="md" />
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}

// Loading state with timeout
export function LoadingWithTimeout({ 
  timeout = 10000, 
  onTimeout, 
  message = 'Loading...',
  timeoutMessage = 'This is taking longer than expected...' 
}) {
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeout(true);
      if (onTimeout) onTimeout();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
    >
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-sm text-gray-600">
        {showTimeout ? timeoutMessage : message}
      </p>
      {showTimeout && (
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Refresh page
        </button>
      )}
    </div>
  );
}

// Default export maintains backward compatibility
export default LoadingPage;