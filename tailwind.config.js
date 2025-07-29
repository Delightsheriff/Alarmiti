/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope-Regular", "System"],
        inter: ["Inter_900Black", "System"],
      },
      colors: {
        peace: {
          background: "#121417", // Deep Night Sky
          secondary: "#172645", // Twilight Blue "#1A2A44"
          text: "#FFFFFF",
          subtle: "#40454F",
          container: "#A3A8B2",
        },
      },
      // State 2: "Awareness Activated" (The Alert State)
      awareness: {
        amber: "#FFB400", // Warm Amber Glow
      },

      // State 3: "Community Engaged / Resolved" (The Positive Action State)
      resolved: {
        sage: "#4A936F", // Verdant Sage
      },
      borderRadius: {
        "squircle-sm": "12px", // For smaller elements like tags
        "squircle-md": "16px", // Default for cards and inputs
        "squircle-lg": "24px", // For modals or larger containers
        "squircle-btn": "32px", // For a soft, rounded button shape
      },

      /**
       * The Rhythm of the Neighborhood: Motion & Interaction
       * Keyframes for the subtle, "living" animations.
       * Use these with `animation-calm-pulse` in your classes.
       */
      keyframes: {
        calmPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".9" },
        },
      },
      animation: {
        "calm-pulse": "calmPulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
