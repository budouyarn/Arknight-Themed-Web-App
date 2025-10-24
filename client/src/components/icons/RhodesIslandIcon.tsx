import rhodesIslandLogo from "@assets/rhodes-island-logo.png";

interface RhodesIslandIconProps {
  className?: string;
}

export default function RhodesIslandIcon({ className = "w-4 h-4" }: RhodesIslandIconProps) {
  return (
    <img 
      src={rhodesIslandLogo} 
      alt="Rhodes Island" 
      className={className}
    />
  );
}
