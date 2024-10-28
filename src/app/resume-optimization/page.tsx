"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Zap, Edit, ChevronRight } from "lucide-react";
import { useState } from "react";
import FileUploader from "@/components/resume/file-upload";

export default function ResumeAnalysis() {
  const [score, setScore] = useState(75);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Upload Section */}
      <FileUploader />
      {/* Score Dashboard */}
      <section className="mb-12">
        <Card className="p-6">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="mb-6 text-center md:mb-0 md:text-left">
              <h2 className="text-2xl font-bold">Resume Score</h2>
              <p className="text-gray-500">
                Based on content, structure, and keywords
              </p>
            </div>
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-8 border-primary/20">
              <span className="text-3xl font-bold">{score}</span>
              <span className="text-sm text-gray-500">out of 100</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {scoreCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-gray-500">
                    {category.score}%
                  </span>
                </div>
                <Progress value={category.score} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Improvement Suggestions */}
      <section>
        <Tabs defaultValue="skills">
          <TabsList className="mb-4">
            {sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              <Card>
                <div className="divide-y">
                  {section.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <p className="font-medium">{suggestion.title}</p>
                        <p className="text-sm text-gray-500">
                          {suggestion.description}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Fix Now <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Quick Optimize Button */}
      <div className="mt-8 text-center">
        <Button size="lg" className="gap-2">
          <Zap className="h-4 w-4" />
          One-Click Optimization
        </Button>
      </div>
    </div>
  );
}

const scoreCategories = [
  { name: "Content Quality", score: 75 },
  { name: "Keyword Optimization", score: 65 },
  { name: "Structure & Format", score: 85 },
];

const sections = [
  {
    id: "skills",
    name: "Skills",
    suggestions: [
      {
        title: "Add More Technical Skills",
        description: "Include relevant programming languages and frameworks",
      },
      {
        title: "Highlight Soft Skills",
        description: "Add leadership and communication abilities",
      },
    ],
  },
  {
    id: "experience",
    name: "Experience",
    suggestions: [
      {
        title: "Quantify Achievements",
        description: "Add metrics and specific results to your accomplishments",
      },
      {
        title: "Use Action Verbs",
        description: "Start bullet points with strong action verbs",
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    suggestions: [
      {
        title: "Add Relevant Coursework",
        description: "Include courses that align with target positions",
      },
      {
        title: "Highlight Academic Achievements",
        description: "Add GPA, honors, and academic projects",
      },
    ],
  },
];
