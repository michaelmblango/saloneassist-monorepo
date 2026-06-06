import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "icon-only" | "text-only" | "stacked"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animate?: boolean
}

const sizeMap = {
  sm: { height: 24, textSize: "text-sm", gap: "gap-2" },
  md: { height: 40, textSize: "text-xl", gap: "gap-3" },
  lg: { height: 64, textSize: "text-3xl", gap: "gap-4" },
  xl: { height: 120, textSize: "text-5xl", gap: "gap-6" },
}

export function Logo({ variant = "full", size = "md", className, animate = false }: LogoProps) {
  const { height, textSize, gap } = sizeMap[size]

  const StarIcon = () => (
    <svg
      viewBox="0 0 100 100"
      style={{ height: `${height}px`, width: `${height}px` }}
      className={cn("flex-shrink-0", animate && "transition-transform duration-300 hover:scale-105 hover:rotate-2")}
      role="img"
      aria-label="Salone Assist Unity Star Logo"
    >
      <title>Salone Assist</title>
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Center white core circle */}
      <circle cx="50" cy="50" r="15" fill="white" />

      {/* Star segments - 5 triangular segments with rounded corners */}
      {/* Segment 1 - Top (Green) */}
      <path
        d="M 50 10 L 65 45 L 50 35 L 35 45 Z"
        fill="#1EB53A"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
        filter="url(#shadow)"
      />

      {/* Segment 2 - Top Right (Blue) */}
      <path
        d="M 65 45 L 90 40 L 70 60 L 58 50 Z"
        fill="#0072C6"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
        filter="url(#shadow)"
      />

      {/* Segment 3 - Bottom Right (Green) */}
      <path
        d="M 70 60 L 75 90 L 50 70 L 50 58 Z"
        fill="#1EB53A"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
        filter="url(#shadow)"
      />

      {/* Segment 4 - Bottom Left (Blue) */}
      <path
        d="M 50 70 L 25 90 L 30 60 L 42 50 Z"
        fill="#0072C6"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
        filter="url(#shadow)"
      />

      {/* Segment 5 - Top Left (Green) */}
      <path
        d="M 30 60 L 10 40 L 35 45 L 50 42 Z"
        fill="#1EB53A"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
        filter="url(#shadow)"
      />

      {/* Inner star highlight for depth */}
      <circle cx="50" cy="50" r="15" fill="white" opacity="0.95" />
      <circle cx="50" cy="48" r="12" fill="white" opacity="0.5" />
    </svg>
  )

  const Wordmark = () => (
    <div className={cn("font-sans font-bold tracking-tight select-none", textSize)} style={{ lineHeight: 1 }}>
      <span style={{ color: "#1EB53A" }}>SALONE</span> <span style={{ color: "#0072C6" }}>ASSIST</span>
    </div>
  )

  if (variant === "icon-only") {
    return (
      <div className={className}>
        <StarIcon />
      </div>
    )
  }

  if (variant === "text-only") {
    return (
      <div className={className}>
        <Wordmark />
      </div>
    )
  }

  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center", gap, className)}>
        <StarIcon />
        <Wordmark />
      </div>
    )
  }

  // Default: full horizontal layout
  return (
    <div className={cn("flex items-center", gap, className)}>
      <StarIcon />
      <Wordmark />
    </div>
  )
}

// Export additional size-specific variants for convenience
export function LogoSm(props: Omit<LogoProps, "size">) {
  return <Logo {...props} size="sm" />
}

export function LogoMd(props: Omit<LogoProps, "size">) {
  return <Logo {...props} size="md" />
}

export function LogoLg(props: Omit<LogoProps, "size">) {
  return <Logo {...props} size="lg" />
}

export function LogoXl(props: Omit<LogoProps, "size">) {
  return <Logo {...props} size="xl" />
}
