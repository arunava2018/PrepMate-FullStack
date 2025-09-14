import { useState, useEffect } from "react";
import { getSubjects } from "@/db/apiSubjects";
import { fetchSubtopics } from "@/db/apiSubtopic";
import { fetchQuestions } from "@/db/apiQuestion";
import Loader from "@/components/Loader";
import UpdateQuestionModal from "@/components/Admin Control/UpdateQuestionModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, BookOpen, Edit3, Search, Filter, FileText } from "lucide-react";

export default function UpdateQuestionPage() {
  const [subjects, setSubjects] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState(null);   // subjectId
  const [selectedSubtopic, setSelectedSubtopic] = useState(null); // subtopicId

  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load subjects once
  useEffect(() => {
    getSubjects()
      .then((res) => setSubjects(res))
      .catch((err) => console.error("Error loading subjects:", err));
  }, []);

  // Load subtopics when subject changes
  useEffect(() => {
    if (!selectedSubject) {
      setSubtopics([]);
      setSelectedSubtopic(null);
      return;
    }

    setLoading(true);
    fetchSubtopics({ subjectId: selectedSubject }) // ✅ now using subjectId
      .then((res) => setSubtopics(res))
      .catch((err) => console.error("Error loading subtopics:", err))
      .finally(() => setLoading(false));
  }, [selectedSubject]);

  // Load questions when subtopic changes
  useEffect(() => {
    if (!selectedSubtopic) {
      setQuestions([]);
      return;
    }

    setLoading(true);
    fetchQuestions(selectedSubtopic) // ✅ already using subtopicId
      .then((res) => setQuestions(res))
      .catch((err) => console.error("Error loading questions:", err))
      .finally(() => setLoading(false));
  }, [selectedSubtopic]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Update Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select a subject and subtopic to view and edit questions
          </p>
        </div>

        {/* Filter Controls */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-yellow-200 dark:border-yellow-800/50 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <Filter className="w-5 h-5 text-yellow-600" />
              Filter Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subject Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-yellow-600" />
                  Subject
                </label>
                <div className="relative">
                  <select
                    value={selectedSubject ?? ""}
                    onChange={(e) => setSelectedSubject(e.target.value || null)}
                    className="w-full appearance-none 
                               bg-white dark:bg-gray-800 
                               border border-gray-300 dark:border-gray-600 
                               rounded-xl px-4 py-3 pr-10 
                               text-gray-700 dark:text-gray-300 
                               focus:outline-none focus:ring-2 focus:ring-yellow-500 
                               focus:border-transparent transition-all"
                  >
                    <option value="">Select Subject</option>
                    {subjects?.map((subj) => (
                      <option key={subj.id} value={subj.id}>
                        {subj.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Subtopic Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-600" />
                  Subtopic
                </label>
                <div className="relative">
                  <select
                    value={selectedSubtopic ?? ""}
                    onChange={(e) => setSelectedSubtopic(e.target.value || null)}
                    disabled={!subtopics.length}
                    className="w-full appearance-none 
                               bg-white dark:bg-gray-800 
                               border border-gray-300 dark:border-gray-600 
                               rounded-xl px-4 py-3 pr-10 
                               text-gray-700 dark:text-gray-300 
                               focus:outline-none focus:ring-2 focus:ring-yellow-500 
                               focus:border-transparent transition-all 
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Subtopic</option>
                    {subtopics?.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Stats */}
            {questions.length > 0 && (
              <div className="flex items-center gap-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                    Found {questions.length} question{questions.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8">
            <Loader />
          </div>
        )}

        {/* Questions List */}
        {questions.length > 0 && !loading && (
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <FileText className="w-5 h-5 text-yellow-600" />
                Questions ({questions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {questions.map((q, index) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all group"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 dark:text-gray-200 font-medium line-clamp-2">
                          {q.question_text}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedQuestion(q);
                        setIsModalOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {questions.length === 0 && !loading && selectedSubtopic && (
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
            <CardContent className="py-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No Questions Found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                No questions available for the selected subtopic.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {!selectedSubject && (
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-2xl shadow-lg">
            <CardContent className="py-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Get Started
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                Select a subject from the dropdown above to view available subtopics and questions.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal */}
      <UpdateQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={selectedQuestion}
      />
    </div>
  );
}
