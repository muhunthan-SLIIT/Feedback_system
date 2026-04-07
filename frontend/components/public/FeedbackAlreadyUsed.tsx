export function FeedbackAlreadyUsed({ message }: { message: string }) {
  return (
    <div className="card text-center py-8">
      <div className="text-5xl mb-4">✓</div>
      <h2 className="text-xl font-bold mb-2">Already Submitted</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
