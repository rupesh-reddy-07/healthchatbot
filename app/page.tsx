import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Brain } from "lucide-react"
import { MessageCircle, Calendar, AlertTriangle, Shield, Users, Globe, Mic, Smartphone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center bg-gradient-to-br from-cyan-50 via-white to-orange-50">
        <div className="container max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-900 border-cyan-300 px-6 py-3 text-sm font-medium shadow-sm"
            >
              <Brain className="h-5 w-5 mr-2" />
              Powered by Advanced AI & Medical Knowledge Base
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-balance mb-8 bg-gradient-to-r from-slate-900 via-cyan-800 to-orange-700 bg-clip-text text-transparent leading-tight">
            Your Trusted AI Health Companion
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 text-balance mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
            Get reliable health information powered by verified medical sources, vaccination schedules, and outbreak
            alerts for your community. Available in 6 languages including Telugu, Hindi, Tamil, Kannada, Odia, and
            English.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="text-lg px-10 py-7 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              <Link href="/chat">
                <MessageCircle className="mr-3 h-6 w-6" />
                Start AI Chat
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-10 py-7 bg-white/80 backdrop-blur-sm border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/vaccination">
                <Calendar className="mr-3 h-6 w-6" />
                View Vaccination Schedule
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance bg-gradient-to-r from-slate-900 to-cyan-800 bg-clip-text text-transparent">
              Advanced AI Health Support
            </h2>
            <p className="text-xl text-slate-600 text-balance max-w-3xl mx-auto leading-relaxed">
              Powered by Retrieval Augmented Generation (RAG) technology with verified medical knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-cyan-50 to-white group hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-200 group-hover:from-cyan-200 group-hover:to-cyan-300 transition-colors">
                    <Brain className="h-8 w-8 text-cyan-700" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-900 border-0 px-3 py-1"
                  >
                    RAG AI
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-3">Intelligent Health Chat</CardTitle>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  Advanced AI that retrieves information from verified medical sources before responding to your
                  questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white/80 border-2 border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-300 transition-colors"
                >
                  <Link href="/chat">Start AI Chat</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-white group hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 group-hover:from-orange-200 group-hover:to-orange-300 transition-colors">
                    <MessageCircle className="h-8 w-8 text-orange-700" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-900 border-0 px-3 py-1"
                  >
                    Telemedicine
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-3">Doctor Consultations</CardTitle>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  Book video consultations with certified doctors and get AI-powered lab report analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white/80 border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                >
                  <Link href="/contact">Find Healthcare</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-50 to-white group hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 group-hover:from-emerald-200 group-hover:to-emerald-300 transition-colors">
                    <Brain className="h-8 w-8 text-emerald-700" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-900 border-0 px-3 py-1"
                  >
                    AI Vision
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-3">Visual Health Analysis</CardTitle>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  Upload photos of symptoms for AI analysis and manage family health profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white/80 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                >
                  <Link href="/chat">Try AI Chat</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-white group hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300 transition-colors">
                    <Calendar className="h-8 w-8 text-purple-700" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-900 border-0 px-3 py-1"
                  >
                    Analytics
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-3">Health Tracking</CardTitle>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  Monitor your health metrics, set goals, and track progress with detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white/80 border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                >
                  <Link href="/profile">View Profile</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-rose-50 to-white group hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 group-hover:from-rose-200 group-hover:to-rose-300 transition-colors">
                    <Users className="h-8 w-8 text-rose-700" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-rose-100 to-rose-200 text-rose-900 border-0 px-3 py-1"
                  >
                    Community
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-3">Healthcare Finder</CardTitle>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  Find nearby hospitals, clinics, and access emergency services with real-time information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white/80 border-2 border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 transition-colors"
                >
                  <Link href="/contact">Find Healthcare</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-white group hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 group-hover:from-amber-200 group-hover:to-amber-300 transition-colors">
                    <Shield className="h-8 w-8 text-amber-700" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900 border-0 px-3 py-1"
                  >
                    Tools
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-3">Health Calculators</CardTitle>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  BMI calculator, blood pressure analyzer, and personalized health recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white/80 border-2 border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 transition-colors"
                >
                  <Link href="/resources">Use Resources</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-teal-50 to-white group hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 group-hover:from-teal-200 group-hover:to-teal-300 transition-colors">
                    <AlertTriangle className="h-8 w-8 text-teal-700" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-3">Health Alerts</CardTitle>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  Receive real-time outbreak alerts and health advisories for your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white/80 border-2 border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-colors"
                >
                  <Link href="/resources">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-50 to-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-balance bg-gradient-to-r from-slate-900 to-cyan-800 bg-clip-text text-transparent">
            Built for Everyone
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-200 mb-6">
                <Globe className="h-12 w-12 text-cyan-700" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Multilingual Support</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Available in 6 languages: English, Telugu, Hindi, Tamil, Kannada, and Odia with easy language switching
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 mb-6">
                <Mic className="h-12 w-12 text-orange-700" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Voice Assistance</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Speak your questions and listen to answers - perfect for low literacy users
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 mb-6">
                <Smartphone className="h-12 w-12 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Works Offline</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Access essential information even with poor internet connectivity
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 mb-6">
                <Users className="h-12 w-12 text-purple-700" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Community Focused</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Designed specifically for rural and semi-urban populations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-cyan-600 via-cyan-700 to-orange-600 text-white">
        <div className="container max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance leading-tight">
            Start Your Health Journey Today
          </h2>
          <p className="text-xl mb-12 text-balance opacity-95 leading-relaxed max-w-3xl mx-auto">
            Join thousands of users who trust HealthBot for reliable health information
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-12 py-8 bg-white text-cyan-700 hover:bg-slate-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <Link href="/chat">
              <MessageCircle className="mr-3 h-6 w-6" />
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-primary">HealthBot</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trusted AI-powered health assistant for rural communities
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/chat" className="hover:text-primary">
                    Health Chat
                  </Link>
                </li>
                <li>
                  <Link href="/vaccination" className="hover:text-primary">
                    Vaccination
                  </Link>
                </li>
                <li>
                  <Link href="/alerts" className="hover:text-primary">
                    Health Alerts
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Healthcare Finder
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/resources" className="hover:text-primary">
                    Health Guides
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Find Offices
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-primary">
                    Admin
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="hover:text-primary">
                    AI Chat
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-primary">
                    User Profile
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-primary">
                    Health Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Languages</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>English</li>
                <li>తెలుగు (Telugu)</li>
                <li>हिंदी (Hindi)</li>
                <li>தமிழ் (Tamil)</li>
                <li>ಕನ್ನಡ (Kannada)</li>
                <li>ଓଡ଼ିଆ (Odia)</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 HealthBot. Built for public health education and awareness.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
