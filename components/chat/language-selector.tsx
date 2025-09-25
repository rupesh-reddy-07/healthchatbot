"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"

interface LanguageSelectorProps {
  value: string
  onChange: (language: string) => void
}

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
]

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const currentLanguage = languages.find((lang) => lang.code === value) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-transparent">
          <Globe className="h-4 w-4 mr-2" />
          {currentLanguage.nativeName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onChange(language.code)}
            className="flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">{language.name}</span>
            </div>
            {value === language.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
