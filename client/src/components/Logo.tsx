"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export default function Logo({ 
  className = "", 
  width = 140, 
  height = 40,
  showText = true 
}: LogoProps) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ height: height, display: 'flex', alignItems: 'center' }}>
        <Image
          src="/aexon-logo.png"
          alt="Aexon Logo"
          width={width}
          height={height}
          style={{ 
            height: '100%', 
            width: 'auto',
            transform: 'scale(1.3)', // Fixed oversized logo
            transformOrigin: 'left center'
          }}
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  );
}
