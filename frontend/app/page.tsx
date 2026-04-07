export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold mb-4">Chat Session Feedback System</h1>
      <p className="text-gray-600 mb-8">Rate your chat experience</p>
      <div className="space-y-2 text-sm text-gray-500">
        <p>
          Admin:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            /admin/enterprises/[enterpriseId]/session-feedback-form
          </code>
        </p>
        <p>
          Public:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            /feedback/[feedbackId]
          </code>
        </p>
      </div>
    </div>
  );
}
