interface RhodesIslandIconProps {
  className?: string;
}

export default function RhodesIslandIcon({ className = "w-4 h-4" }: RhodesIslandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18L18.82 7.5 12 11.32 5.18 7.5 12 4.18zM5 9.08l6 3.42v7.82L5 16.9V9.08zm8 11.24v-7.82l6-3.42v7.82l-6 3.42z" />
      <path d="M12 8.5l-3 1.73v3.54l3 1.73 3-1.73v-3.54L12 8.5zm0 1.73l1.5.87v1.8l-1.5.87-1.5-.87V11.1l1.5-.87z" />
    </svg>
  );
}
