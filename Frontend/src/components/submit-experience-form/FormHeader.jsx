import { Share2 } from 'lucide-react';

const FormHeader = () => {
  return (
    <div className="text-center mb-6">
      <div className="w-10 h-10 bg-yellow-400 rounded-lg mx-auto mb-3 flex items-center justify-center">
        <Share2 className="w-5 h-5 text-white" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Share Your Interview Experience
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Help others by sharing your insights
      </p>
    </div>
  );
};

export default FormHeader;
