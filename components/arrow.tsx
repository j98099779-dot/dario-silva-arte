type ArrowIconProps = {
  direction?: 'right' | 'up-right';
  className?: string;
};

/** An unobtrusive directional cue for links and controls. */
export function ArrowIcon({ direction = 'right', className }: ArrowIconProps) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={direction === 'up-right' ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16M14 6l6 6-6 6'} />
    </svg>
  );
}
