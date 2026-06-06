import { Logo } from "@/components/logo"

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1EB53A]/10 to-[#0072C6]/10">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse">
          <Logo variant="icon-only" size="xl" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">Loading Salone Assist...</p>
      </div>
    </div>
  )
}
