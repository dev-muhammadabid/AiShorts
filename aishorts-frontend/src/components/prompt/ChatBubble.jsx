// ChatBubble component displays a message bubble.
// Props:
// - message: The text message to display.
// - isUser: Boolean indicating if the message is from the user (true) or from AI/other (false).

// eslint-disable-next-line react/prop-types
export default function ChatBubble({ message, isUser }) {
  return (
    <div className={`flex my-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg shadow-md ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
        }`}
      >
        {/* Display message with preserved whitespace and word breaks */}
        <p className="whitespace-pre-line break-words">{message}</p>
      </div>
    </div>
  );
}
