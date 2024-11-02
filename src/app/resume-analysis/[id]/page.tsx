// pages/resume/analysis/[id].tsx
"use client";
import { useRouter } from "next/router";
import { ResumeAnalysisPanel } from "@/components/resume/ResumeAnalysisPanel";
import { useEffect, useState } from "react";
import { ResumeAnalysis } from "@/types";

const AnalysisPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchAnalysis(id as string);
    }
  }, [id]);

  const fetchAnalysis = async (analysisId: string) => {
    try {
      const response = await fetch(`/api/analysis?chatId=${analysisId}`);
      if (!response.ok) throw new Error("Failed to fetch analysis");
      const data = await response.json();
      setAnalysis(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };
  console.log("analysis---", analysis);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Error</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading analysis...</div>
      </div>
    );
  }

  return <ResumeAnalysisPanel analysis={analysis} />;
};

export default AnalysisPage;
