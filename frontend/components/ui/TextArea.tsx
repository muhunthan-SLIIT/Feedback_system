import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function TextArea({ className, error, ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      <textarea
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          error && "border-danger focus:ring-danger",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}
