import { useState } from 'react';
import Sidebar from './Sidebar';

export default function ResponsiveLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <Sidebar />
        </div>
      </div>

      {/* Main content area with responsive padding */}
      <div className="flex-1 lg:pl-64">
        <main className="px-4 sm:px-6 lg:px-8 py-4">
          {children}
        </main>
      </div>
    </div>
  );
}