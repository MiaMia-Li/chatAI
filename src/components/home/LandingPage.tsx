import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { features } from "@/config/page";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-background px-6 py-24 dark:from-blue-950/30 dark:to-background sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Transform Your Resume with
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                {" "}
                AI Power
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Leverage advanced AI technology to create a standout resume that
              gets you noticed. Smart analysis, industry insights, and
              personalized optimization all in one place.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/resume-optimization">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500">
                  Get Started Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-blue-600/20 bg-white/50 text-blue-600 backdrop-blur-sm hover:bg-blue-50/50 dark:border-blue-400/20 dark:bg-background/50 dark:text-blue-400 dark:hover:bg-blue-950/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* 装饰性背景元素 */}
        <div className="absolute -top-40 right-0 -z-10 transform opacity-20">
          <div className="h-96 w-96 rounded-full bg-blue-400 blur-3xl dark:bg-blue-600"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Powerful Features to Boost Your Career
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Everything you need to create a professional, ATS-friendly resume
              that helps you land your dream job.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group border-transparent bg-white/50 transition-all duration-300 hover:border-blue-600/20 hover:shadow-lg hover:shadow-blue-600/5 dark:bg-white/5 dark:hover:border-blue-400/20 dark:hover:shadow-blue-400/5">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 text-blue-600 dark:from-blue-400/10 dark:to-indigo-400/10 dark:text-blue-400">
                    <CheckCircle className="h-6 w-6" />
                  </div>

                  <CardHeader className="p-0">
                    <h3 className="mb-4 text-xl font-semibold leading-7 text-foreground">
                      {feature.title}
                    </h3>
                  </CardHeader>

                  <p className="text-base leading-7 text-muted-foreground">
                    {feature.description}
                  </p>

                  <Link
                    href="/resume-optimization"
                    className="mt-4 flex items-center text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-blue-400">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 dark:from-blue-500 dark:to-indigo-500">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Resume?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands of professionals who have already improved their
              job search success with our AI-powered platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/resume-optimization">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-blue-600 hover:bg-blue-50 dark:bg-white/90 dark:text-blue-600 dark:hover:bg-white">
                  Get Started Now
                </Button>
              </Link>
              <Button variant="link" className="text-white hover:text-blue-100">
                Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
