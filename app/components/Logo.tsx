interface LogoProps {
  size?: number
  className?: string
  showText?: boolean
}

/**
 * Garendil logo — abstract balance/graph SVG.
 * Works at 24px and 200px. Uses currentColor so color is controlled by parent.
 */
export function Logo({ size = 32, className = '', showText = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Central node */}
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        {/* Arms of the balance / graph edges */}
        <line x1="24" y1="24" x2="8" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="24" x2="40" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="24" x2="24" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Outer nodes */}
        <circle cx="8"  cy="12" r="3" fill="currentColor" opacity="0.8" />
        <circle cx="40" cy="12" r="3" fill="currentColor" opacity="0.8" />
        <circle cx="24" cy="40" r="3" fill="currentColor" opacity="0.6" />
        {/* Balance crossbar connecting outer top nodes */}
        <line x1="8" y1="12" x2="40" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
      </svg>
      {showText && (
        <span className="font-bold tracking-tight" style={{ fontSize: size * 0.6 }}>
          Garendil
        </span>
      )}
    </span>
  )
}
