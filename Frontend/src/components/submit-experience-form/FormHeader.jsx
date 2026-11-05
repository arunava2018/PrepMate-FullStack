const FormHeader = () => {
  return (
    <header className="mb-8 max-w-2xl">
      <p className="mb-3 text-sm text-[#5e554a] dark:text-[#aaa398]">PrepMate · Community</p>
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-[#1f1b16] dark:text-[#efe9de] sm:text-4xl">
        Share an interview experience
      </h1>
      <p className="mt-3 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
        Add the role, interview details, and notes that may help another candidate prepare. Submissions are reviewed before they appear in the public collection.
      </p>
    </header>
  );
};

export default FormHeader;
