import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export const CommunityIcon = () => (
  <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <Circle
      cx="40"
      cy="45"
      r="20"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <Circle
      cx="80"
      cy="45"
      r="20"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <Circle
      cx="60"
      cy="75"
      r="20"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M50 55 L70 55"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Path
      d="M45 65 L55 75"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Path
      d="M75 65 L65 75"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </Svg>
);

export const AwarenessIcon = () => (
  <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <Circle
      cx="60"
      cy="60"
      r="35"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <Circle
      cx="60"
      cy="60"
      r="20"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
    <Circle cx="60" cy="60" r="8" fill="#FFFFFF" />
    {/* Subtle pulse rings */}
    <Circle
      cx="60"
      cy="60"
      r="50"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity="0.3"
    />
  </Svg>
);

export const ReportingIcon = () => (
  <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <Path
      d="M60 30 C70 30 78 38 78 48 C78 65 60 85 60 85 C60 85 42 65 42 48 C42 38 50 30 60 30 Z"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Circle cx="60" cy="48" r="8" fill="#FFFFFF" />
  </Svg>
);
