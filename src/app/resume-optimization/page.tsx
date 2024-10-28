"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Zap, Edit, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";
import FileUploader from "@/components/resume/file-upload";
import { ClientMessage } from "../actions/resume-action";
import { useActions, useUIState } from "ai/rsc";
import { generateId } from "ai";
import ResumeResult from "@/components/resume/resume-result";
import { toast } from "sonner";
import PreviewAttachment from "@/components/preview-attachment";
import { motion, AnimatePresence } from "framer-motion";
import useChatStore from "../hooks/useChatStore";

export default function ResumeAnalysis() {
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();
  const [showUploader, setShowUploader] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);
  const setAttachments = useChatStore((state) => state.setAttachments);
  const attachments = useChatStore((state) => state.attachments);

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
      setIsUploading(true);
      setUploadQueue(files.map((file) => file.name));
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

        setAttachments((current) => [...(current || []), ...validAttachments]);
        setShowUploader(false);
        sendMessage(validAttachments[0].content);
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setUploadQueue([]);
        setIsUploading(false);
      }
    },
    [uploadFile]
  );

  const sendMessage = async (input: string) => {
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: generateId(), role: "user", display: input },
    ]);

    const message = await continueConversation(input);

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {conversation.length <= 1 ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6 max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              AI-Powered Resume Analysis
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload your resume and let our AI analyze it in seconds. Get
              personalized insights on:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4">
                <FileText className="h-6 w-6 mb-2" />
                <h3 className="font-semibold">Content Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get feedback on your experience, skills, and achievements
                </p>
              </Card>
              <Card className="p-4">
                <Edit className="h-6 w-6 mb-2" />
                <h3 className="font-semibold">Writing Improvements</h3>
                <p className="text-sm text-muted-foreground">
                  Enhance clarity, impact, and professional tone
                </p>
              </Card>
              <Card className="p-4">
                <Zap className="h-6 w-6 mb-2" />
                <h3 className="font-semibold">ATS Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Make your resume stand out to applicant tracking systems
                </p>
              </Card>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showUploader ? (
          <motion.div
            className="max-w-2xl mx-auto"
            key="uploader"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}>
            <FileUploader
              onFilesPick={handleFilesPick}
              disabled={isUploading}
            />
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground text-center mt-2">
                Loading: {uploadQueue.join(", ")}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4">
            {attachments &&
              attachments.map((attachment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}>
                  <PreviewAttachment
                    key={attachment.url}
                    attachment={attachment}
                    onDelete={() => {
                      const updatedImages = (attachments: any) =>
                        attachments.filter((_, i) => i !== index);
                      setAttachments(updatedImages(attachments));
                      setShowUploader(true);
                    }}
                  />
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout>
        {conversation.slice(1).map((message: ClientMessage, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}>
            {message.role}: {message.display}
          </motion.div>
        ))}
      </motion.div>
      {/* Quick Optimize Button */}
      {/* <div className="mt-8 text-center">
        <Button size="lg" className="gap-2">
          <Zap className="h-4 w-4" />
          One-Click Optimization
        </Button>
      </div> */}
    </div>
  );
}
