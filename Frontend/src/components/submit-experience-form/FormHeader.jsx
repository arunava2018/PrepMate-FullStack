import { Share2 } from 'lucide-react';

const FormHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-primary/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
        <Share2 className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Share Your Interview Experience
      </h2>
      <p className="text-muted-foreground text-sm max-w-md mx-auto">
        Your insights help thousands of students prepare better. Fill out the details below to contribute to the community.
      </p>
    </div>
  );
};

export default FormHeader;
