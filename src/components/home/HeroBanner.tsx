import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroBanner = () => {
  return (
    <section className="relative py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Optimize Your Resume {""}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent font-extrabold">
              with AI Insights
            </span>
          </h1>

          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">
            Enhance your career journey with intelligent resume analysis and
            personalized recommendations
          </p>

          <Link
            href="/resume-optimization"
            className={cn(
              buttonVariants({
                variant: "default",
                size: "lg",
              }),
              "px-4"
            )}>
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
