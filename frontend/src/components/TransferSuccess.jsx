import { useNavigate } from 'react-router-dom';

export function TransferSuccess() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">Transfer successful!</h1>
      <br />
      <button
        onClick={() => {
          navigate('/dashboard');
        }}
        className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
      >
        Return to Dashboard
      </button>
    </div>
  );
}
