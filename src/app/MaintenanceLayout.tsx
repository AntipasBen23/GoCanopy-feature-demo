"use client";

import Image from "next/image";

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set this to true to enable maintenance mode
  const isMaintenanceMode = true;

  if (isMaintenanceMode) {
    return (
      <main className="min-h-screen relative flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-background.png" 
            alt="Mining Operations" 
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Maintenance Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Icon/Logo Area */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6" 
                   style={{ backgroundColor: 'rgba(212, 160, 41, 0.2)', border: '3px solid #d4a029' }}>
                <svg className="w-12 h-12" style={{ color: '#d4a029' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              We'll Be Back Soon
            </h1>

            {/* Subheading */}
            <div className="mb-8">
              <p className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#d4a029' }}>
                Site Under Maintenance
              </p>
              <p className="text-xl text-white/90 leading-relaxed">
                We're currently performing scheduled updates and improvements to serve you better.
              </p>
            </div>

            {/* Additional Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8 border border-white/20">
              <p className="text-lg text-white mb-4">
                Our team is working hard to enhance your experience.
              </p>
              <p className="text-white/80">
                Thank you for your patience and understanding.
              </p>
            </div>

            {/* Contact Info */}
            <div className="text-white/70 text-sm">
              <p>We appreciate your patience during this maintenance period.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Normal mode - render children
  return <>{children}</>;
}