import { useNavigate } from 'react-router-dom';

export function TransferFailed() {
  const navigate = useNavigate();

  return (
    <div>
      <div>Transfer Failed!</div>
      <button
        onClick={() => {
          navigate('/dashboard');
        }}
        className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-red-500 text-white"
      >
        Return to Dashboard
      </button>
    </div>
  );
}
