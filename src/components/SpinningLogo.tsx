import React from "react";
import Image from "next/image";

export function SpinningLogo({ size = "20px", ...props }) {
  return (
    <div
      {...props}
      style={{
        animation: `spin 2s linear infinite`,
        height: size,
        width: size,
        alignSelf: "center",
        zIndex: 1,
        position: "relative",
      }}
    >
      <Image
        priority={true}
        objectFit="contain"
        fill
        alt="logo"
        src="/images/logo-transparent.png"
      />
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
