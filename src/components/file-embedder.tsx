"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { PaperclipIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MultiFilePickerProps {
  onFilesPick: (files: File[]) => void; // 传递 File 对象数组
  disabled: boolean;
}

const MultiFilePicker: React.FC<MultiFilePickerProps> = ({
  onFilesPick,
  disabled,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesPick(acceptedFiles); // 直接传递 File 对象数组
    },
    [onFilesPick]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    }, // No restrictions, accept all file types
    maxFiles: 1,
    multiple: false, // Allow multiple file selection
    maxSize: 10485760, // 10 MB per file
  });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input disabled={disabled} {...getInputProps()} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={disabled}
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full shrink-0 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
              <PaperclipIcon className="w-5 h-5" />
              {isDragActive && (
                <span className="sr-only">Drop the files here</span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload Resume</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MultiFilePicker;
