"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  Heart,
  MessageCircle,
  Calendar,
  AlertTriangle,
  BookOpen,
  Phone,
  Activity,
  Brain,
  BarChart3,
  Users,
  Video,
  Calculator,
  Gamepad2,
  ChevronDown,
  Newspaper,
  User,
  Stethoscope,
  FileText,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

const primaryNavigation = [
  { name: "Home", href: "/", icon: Heart },
  { name: "Chat", href: "/chat", icon: MessageCircle },
  { name: "Profile", href: "/profile", icon: User },
]

const healthServices = [
  { name: "Health Monitor", href: "/health", icon: Activity },
  { name: "AI Assistant", href: "/ai-assistant", icon: Brain },
  { name: "Vaccination", href: "/vaccination", icon: Calendar },
  { name: "Health Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Telemedicine", href: "/telemedicine", icon: Video },
]

const toolsAndResources = [
  { name: "Health Tools", href: "/tools", icon: Calculator },
  { name: "Medical News", href: "/news", icon: Newspaper },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
]

const communityAndSupport = [
  { name: "Community", href: "/community", icon: Users },
  { name: "Health Games", href: "/games", icon: Gamepad2 },
  { name: "Contact", href: "/contact", icon: Phone },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActiveInGroup = (items: typeof healthServices) => {
    return items.some((item) => pathname === item.href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">HealthBot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {/* Primary Navigation */}
          {primaryNavigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
                  pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}

          {/* Health Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium",
                  isActiveInGroup(healthServices) ? "text-primary bg-primary/10" : "text-muted-foreground",
                )}
              >
                <Stethoscope className="h-4 w-4" />
                <span>Health Services</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Health Services</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {healthServices.map((item) => {
                const Icon = item.icon
                return (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 w-full",
                        pathname === item.href ? "text-primary bg-primary/10" : "",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tools & Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium",
                  isActiveInGroup(toolsAndResources) ? "text-primary bg-primary/10" : "text-muted-foreground",
                )}
              >
                <FileText className="h-4 w-4" />
                <span>Resources</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Tools & Resources</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {toolsAndResources.map((item) => {
                const Icon = item.icon
                return (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 w-full",
                        pathname === item.href ? "text-primary bg-primary/10" : "",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Community & Support Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium",
                  isActiveInGroup(communityAndSupport) ? "text-primary bg-primary/10" : "text-muted-foreground",
                )}
              >
                <Shield className="h-4 w-4" />
                <span>Community</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Community & Support</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {communityAndSupport.map((item) => {
                const Icon = item.icon
                return (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 w-full",
                        pathname === item.href ? "text-primary bg-primary/10" : "",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {/* Primary Navigation */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Main</h3>
                  {primaryNavigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 text-base font-medium transition-colors hover:text-primary p-3 rounded-md",
                          pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>

                {/* Health Services */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Health Services</h3>
                  {healthServices.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 text-base font-medium transition-colors hover:text-primary p-3 rounded-md",
                          pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>

                {/* Tools & Resources */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Resources</h3>
                  {toolsAndResources.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 text-base font-medium transition-colors hover:text-primary p-3 rounded-md",
                          pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>

                {/* Community & Support */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Community</h3>
                  {communityAndSupport.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 text-base font-medium transition-colors hover:text-primary p-3 rounded-md",
                          pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
