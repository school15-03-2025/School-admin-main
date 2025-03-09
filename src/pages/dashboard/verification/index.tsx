import { NextPage } from 'next';
import styles from "./index.module.css"; 

const Verification: NextPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="w-full max-w-lg p-16 rounded-2xl shadow-md bg-black/20 border border-black">
        <h2 className="text-4xl font-bold text-center text-white-700 mb-3 poppins-semibold">Verification !</h2>
        <p className="text-xs text-center text-black mt-1">We have sent you a 5 digit verification code on.</p>
        <p className="text-xs text-center text-black font-semibold mb-8 mt-3">abc@gmail.com</p>
        <form className="space-y-4">
          <div className={`flex ${styles.otpScreen}`}>
            <input
              type="number"
              required
              className="px-4 py-3 m-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={0}
              max={1}
              placeholder="0"
            />
            <input
              type="number"
              required
              className="px-4 py-3 m-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={0}
              max={1}
              placeholder="0"
            />
            <input
              type="number"
              required
              className="px-4 py-3 m-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={0}
              max={1}
              placeholder="0"
            />
            <input
              type="number"
              required
              className="px-4 py-3 m-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={0}
              max={1}
              placeholder="0"
            />
            <input
              type="number"
              required
              className="px-4 py-3 m-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={0}
              max={1}
              placeholder="0"
            />
            <input
              type="number"
              required
              className="px-4 py-3 m-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={0}
              max={1}
              placeholder="0"
            />
          </div>
          <div className='text-center'>
            <button className="text-white px-8 py-2 mt-8 text-lg relative clip-button">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
