"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Sparkles, Brain, FileSearch, ChartLine, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useChatStore from "@/app/hooks/useChatStore";
import { useChat } from "ai/react";
import { v4 as uuidv4 } from "uuid";
import { Feature, UploadedFile } from "@/types";
import FileUploader from "@/components/resume/file-upload";
import {
  FeatureGrid,
  PageHeader,
  ParticleEffects,
} from "@/components/resume/ResumeAnalysisPage";
import { Button } from "@/components/ui/button";
import Chat from "@/components/resume/chat";

export const HomePage = () => {
  const [chatId] = useState(() => uuidv4());
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const setAttachments = useChatStore((state) => state.setAttachments);
  const attachments = useChatStore((state) => state.attachments);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    data,
    stop,
    setMessages,
    setInput,
    addToolResult,
  } = useChat({
    maxSteps: 1,
    onResponse: (response) => {
      if (response) {
        setLoadingSubmit(false);
      }
    },
    onError: (error) => {
      toast.error(error.message);
      setIsAnalyzing(false);
      setLoadingSubmit(false);
      toast.error("An error occurred. Please try again.");
    },
    onToolCall: async ({ toolCall }) => {
      console.log("toolCall-------", toolCall);
      if (toolCall.toolName === "analyzeResume") {
        return toolCall.args;
      }
    },
  });

  const uploadFile = useCallback(
    async (
      file: File
    ): Promise<
      | { url: string; name: string; contentType: string; content: string }
      | undefined
    > => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`/api/files/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Server error during file upload."
          );
        }

        const { url, pathname, contentType, markdown } = await response.json();
        return { url, name: pathname, contentType, content: markdown };
      } catch (error) {
        console.error("File upload error:", error);
        toast.error((error as Error).message || "Upload failed, try again.");
        return undefined;
      }
    },
    []
  );

  const handleFilesPick = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      setIsUploading(true);
      setUploadProgress(0);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + Math.random() * 30, 95));
      }, 500);

      try {
        const uploadPromises = files.map(uploadFile);
        const uploadedFiles = await Promise.all(uploadPromises);
        const validAttachments = uploadedFiles.filter(
          (
            file
          ): file is {
            url: string;
            name: string;
            contentType: string;
            content: string;
          } => file !== undefined
        );
        setUploadedFile(files[0]);
        setUploadProgress(100);
        setAttachments((current) => [...(current || []), ...validAttachments]);
        setInput && setInput(validAttachments[0].content);
      } catch (error) {
        console.error("Error uploading files:", error);
        toast.error("Upload failed. Please try again.");
      } finally {
        clearInterval(progressInterval);
        setIsUploading(false);
      }
    },
    [uploadFile, setAttachments, setInput]
  );

  // 处理分析提交
  const handleAnalysis = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!uploadedFile) {
        toast.error("Please upload a file first");
        return;
      }
      setInput(attachments?.[0]?.content || "");
      setIsAnalyzing(true);
      handleSubmit(e);
    },
    [uploadedFile, handleSubmit]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <PageHeader />
        <FeatureGrid />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto">
          <FileUploader
            onFilesPick={handleFilesPick}
            disabled={isUploading || isAnalyzing}
            progress={uploadProgress}
          />

          <AnimatePresence>
            {uploadedFile && (
              <AnalysisSection
                isAnalyzing={isAnalyzing}
                onAnalyze={handleAnalysis}
                isLoading={isLoading}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Chat
        chatId={chatId}
        messages={messages}
        input={input}
        // setSelectedModel={setSelectedModel}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        loadingSubmit={loadingSubmit}
        error={error}
        stop={stop}
        formRef={formRef}
        // isMobile={isMobile}
        setInput={setInput}
        setMessages={setMessages}
        addToolResult={addToolResult}
      />
    </div>
  );
};

// 组件拆分

interface AnalysisSectionProps {
  isAnalyzing: boolean;
  onAnalyze: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({
  isAnalyzing,
  onAnalyze,
  isLoading,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mt-8 text-center">
    <motion.div
      whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
      whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
      className="relative inline-block">
      <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-xl" />
      <form onSubmit={onAnalyze}>
        <Button
          type="submit"
          size="lg"
          disabled={isAnalyzing || isLoading}
          className="relative bg-gradient-to-r from-blue-500 to-blue-600 
            hover:from-blue-600 hover:to-blue-700 
            text-white shadow-lg hover:shadow-xl 
            transition-all duration-300 px-8 py-6 rounded-full">
          <motion.span
            animate={{
              scale: isAnalyzing ? 1 : [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2 text-lg font-medium">
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Start AI Analysis
              </>
            )}
          </motion.span>
        </Button>
      </form>
      {!isAnalyzing && <ParticleEffects />}
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 text-sm text-gray-500 dark:text-gray-400">
      {isAnalyzing
        ? "This may take a few moments..."
        : "Click to start analyzing your resume with our advanced AI"}
    </motion.p>
  </motion.div>
);

export default HomePage;
