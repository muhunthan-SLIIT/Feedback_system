interface ValidationErrorsProps {
  errors: Record<string, string>;
}

export function ValidationErrors({ errors }: ValidationErrorsProps) {
  if (Object.keys(errors).length === 0) return null;
  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm font-medium text-red-800 mb-2">Please fix:</p>
      <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
        {Object.entries(errors).map(([field, message]) => (
          <li key={field}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
