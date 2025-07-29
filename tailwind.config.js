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
          background: "#0F172A", // Sophisticated slate background
          secondary: "#1E293B", // Elevated dark slate
          accent: "#334155", // Medium slate for cards
          text: "#F8FAFC", // Soft white text
          subtle: "#64748B", // Balanced gray for secondary text
          container: "#CBD5E1", // Light slate for containers
          border: "#475569", // Subtle borders
        },
        // State 2: "Awareness Activated" (The Alert State)
        awareness: {
          amber: "#F59E0B", // Vibrant amber
          light: "#FEF3C7", // Light amber background
          dark: "#D97706", // Darker amber for contrast
        },
        // State 3: "Community Engaged / Resolved" (The Positive Action State)
        resolved: {
          sage: "#10B981", // Modern emerald green
          light: "#D1FAE5", // Light green background
          dark: "#059669", // Darker green for contrast
        },
        // Additional accent colors for better UX
        accent: {
          blue: "#3B82F6", // Clean blue for CTAs
          purple: "#8B5CF6", // Purple for special actions
          rose: "#F43F5E", // Rose for errors/warnings
        },
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
