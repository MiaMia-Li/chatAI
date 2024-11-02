"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { experimental_useObject as useObject } from "ai/react";

import { ResumeAnalysis } from "@/types";
import { resumeAnalysisSchema } from "../api/use-object/route";
import { RESUME_ANALYSIS_PATH } from "@/config/page";
import {
  FeatureGrid,
  PageHeader,
} from "@/components/resume/ResumeAnalysisPage";
import AnalysisSection from "@/components/resume/AnalysisSection";
import FileUploader from "@/components/resume/FileUploader";
import { StepLoading } from "@/components/resume/StepLoading";

// 动画配置
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const HomePage = () => {
  // 状态管理
  const [state, setState] = useState({
    chatId: uuidv4(),
    isUploading: false,
    uploadProgress: 0,
    uploadedFile: null,
    isAnalyzing: false,
    isProcessing: false,
  });

  const router = useRouter();

  // AI 分析处理
  const { submit, isLoading } = useObject({
    api: "/api/use-object",
    schema: resumeAnalysisSchema,
    onFinish: (result) => {
      console.log("result", result);
      if (result.error) {
        toast.error(result.error.message);
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          isAnalyzing: false,
        }));
        return;
      }
      saveAnalysis(result.object as ResumeAnalysis);
    },
    onError: (error) => {
      console.error("Error submitting object:", error);
      toast.error(error.message);
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        isAnalyzing: false,
      }));
    },
  });

  // 保存分析结果
  const saveAnalysis = async (analysis: ResumeAnalysis) => {
    try {
      const response = await fetch("/api/analysis/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis,
          fileName: state.uploadedFile,
          chatId: state.chatId,
        }),
      });

      if (!response.ok) throw new Error("Failed to save analysis results");

      // 使用动画过渡到结果页
      await router.push(`${RESUME_ANALYSIS_PATH}/${state.chatId}`);
    } catch (error) {
      console.error("Error saving analysis:", error);
      toast.error("Failed to save analysis results");
    }
  };

  // 文件上传处理
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      return await response.json();
    } catch (error) {
      console.error("File upload error:", error);
      toast.error((error as Error).message);
      return undefined;
    }
  };

  // 文件选择处理
  const handleFilesPick = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    setState((prev) => ({ ...prev, isUploading: true, uploadProgress: 0 }));

    // 进度条动画
    const progressInterval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        uploadProgress: Math.min(prev.uploadProgress + Math.random() * 30, 95),
      }));
    }, 500);

    try {
      const uploadedFiles = await Promise.all(files.map(uploadFile));
      const validAttachments = uploadedFiles.filter(Boolean);

      setState((prev) => ({
        ...prev,
        uploadedFile: validAttachments[0],
        uploadProgress: 100,
      }));

      // 上传成功提示
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      clearInterval(progressInterval);
      setState((prev) => ({ ...prev, isUploading: false }));
    }
  }, []);

  // 开始分析
  const handleAnalysis = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isAnalyzing: true,
      isProcessing: true,
    }));
    console.log("state.uploadedFile", state.uploadedFile);
    // @ts-ignore
    submit(state.uploadedFile?.markdown || "");
  }, [submit]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-gray-50/50 via-white to-white 
                 dark:from-gray-900/50 dark:via-gray-900 dark:to-gray-900
                 transition-colors duration-500">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <PageHeader />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}>
          <FeatureGrid />
        </motion.div>

        <motion.div
          {...pageTransition}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto space-y-8">
          <FileUploader
            onFilesPick={handleFilesPick}
            disabled={state.isUploading || state.isAnalyzing}
            progress={state.uploadProgress}
          />

          <AnimatePresence mode="wait">
            {state.uploadedFile && (
              <AnalysisSection
                isAnalyzing={state.isAnalyzing}
                onAnalyze={handleAnalysis}
                isLoading={isLoading}
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {state.isProcessing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}>
                <StepLoading />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
