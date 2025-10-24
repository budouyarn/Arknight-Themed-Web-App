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
      <path d="M12 2.5C12 2.5 8 4 6 5.5C4 7 3 9 3 12C3 15 4 17.5 6 19.5C8 21.5 10.5 22.5 12 22.5C13.5 22.5 16 21.5 18 19.5C20 17.5 21 15 21 12C21 9 20 7 18 5.5C16 4 12 2.5 12 2.5Z" />
      <path d="M12 7V11H8V13H12V17H14V13H18V11H14V7H12Z" fill="white" />
      <path d="M12 4.5C10.5 5 8.5 6 7.5 7C6.5 8 6 9.5 6 11.5C6 13.5 6.5 15 7.5 16C8.5 17 10.5 18 12 18.5C13.5 18 15.5 17 16.5 16C17.5 15 18 13.5 18 11.5C18 9.5 17.5 8 16.5 7C15.5 6 13.5 5 12 4.5Z" opacity="0.3" />
    </svg>
  );
}
