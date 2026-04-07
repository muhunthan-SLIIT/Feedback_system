"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export function CopyButton({ textToCopy, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      type="button"
      variant={copied ? "secondary" : "primary"}
      size="sm"
      onClick={handleCopy}
      className={cn(className, copied && "bg-green-600 hover:bg-green-700")}
    >
      {copied ? "✓ Copied!" : "Copy Link"}
    </Button>
  );
}
