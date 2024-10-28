import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  FileText,
  Target,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              AI-Powered Resume Insights
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">
              Enhance your career journey with intelligent resume analysis and
              personalized recommendations
            </p>
            <Button size="lg" className="mt-6">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-lg bg-primary/10 p-3">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="mb-4 text-sm text-gray-500">
                  {feature.description}
                </p>
                <Link href={feature.link}>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trends Section */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Industry Insights
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {trends.map((trend) => (
              <div
                key={trend.title}
                className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center text-xl font-bold">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  {trend.title}
                </h3>
                <p className="text-gray-500">{trend.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Resume Optimization",
    link: "resume-optimization",
    description:
      "AI-powered analysis to enhance your resume's impact and visibility",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Job Matching",
    link: "job-matching",
    description: "Smart recommendations based on your skills and experience",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Interview Prep",
    link: "interview-prep",
    description: "AI-assisted interview simulation and personalized coaching",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Market Insights",
    link: "market-insights",
    description: "Comprehensive analysis of salary trends and industry demands",
  },
];

const trends = [
  {
    title: "Top Positions",
    content:
      "Data Science, Full-Stack Development, and Cloud Architecture lead the market demand",
  },
  {
    title: "Salary Trends",
    content:
      "15% average increase in tech salaries across major markets in 2024",
  },
  {
    title: "Skills in Demand",
    content:
      "AI/ML, Cloud Computing, and Cybersecurity are the most sought-after skills",
  },
];
