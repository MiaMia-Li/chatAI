// components/resume/FileUploader.tsx
"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "../ui/progress";

interface FileUploaderProps {
  onFilesPick: (files: File[]) => void;
  disabled?: boolean;
  progress?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesPick,
  disabled,
  progress = 0,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        setError("Please upload a PDF or Word document");
        return;
      }
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        setError(null);
        onFilesPick(acceptedFiles);
      }
    },
    [onFilesPick]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    multiple: false,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300
        ${isDragActive ? "border-blue-500 bg-blue-50/50" : "border-gray-200"}
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-500
      `}>
      <input {...getInputProps()} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-12 text-center">
        <AnimatePresence mode="wait">
          {!selectedFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/20">
                <Upload className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Upload Your Resume
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                  Drag and drop your resume file (PDF or Word) or click to
                  browse
                </p>
              </div>
              <Button variant="default" className="mt-4" disabled={disabled}>
                Select File
              </Button>
            </motion.div>
          )}

          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4">
              <div className="flex items-center space-x-3">
                <File className="h-6 w-6 text-blue-500" />
                <span className="font-medium">{selectedFile.name}</span>
                {progress === 100 && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>

              {progress > 0 && progress < 100 && (
                <div className="w-full max-w-xs">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-2">
                    Uploading your resume...
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </motion.div>
        )}
      </motion.div>

      {/* Drag overlay */}
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm flex items-center justify-center">
            <div className="text-blue-500 font-medium">Drop your file here</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default FileUploader;
