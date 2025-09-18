"use client";
import { LoaderCircle, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { api } from "~/lib/api";
import { cn } from "~/lib/utils";
import { getQuizInfo } from "~/server/wordQuiz";

// Types
interface singleQuizDataProps {
  question: string;
  choices: string[];
  correct: string;
  explanation?: string;
}

interface questionState {
  selectedAnswer: string;
  isCorrect?: boolean;
  isSubmitted?: boolean;
}

// Main component
export default function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const quizId = unwrappedParams.quizId;

  const searchParams = useSearchParams();
  const totalProblems = searchParams.get("totalQuestions");
  const total = totalProblems ? parseInt(totalProblems, 10) : 2;
  const wordName = searchParams.get("name") ?? "example";

  const [quizData, setQuizData] = useState<singleQuizDataProps[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState<questionState[]>([]);
  const [score, setScore] = useState(0);

  const saveProgress = api.quiz.ongoingQuizResponse.useMutation();
  const updateQuiz = api.quiz.completeQuiz.useMutation();

  useEffect(() => {
    if (!wordName || !total) return;
    async function fetchQuizData() {
      const data = await getQuizInfo(wordName, total);
      const parsedData = JSON.parse(data) as singleQuizDataProps[];
      setQuizData(parsedData);
      setQuestionStates(
        new Array(parsedData.length).fill({
          selectedAnswer: "",
          isCorrect: false,
          isSubmitted: false,
        })
      );
    }
    void fetchQuizData();
  }, [total, wordName]);

  const handleAnswerSelect = (choice: string) => {
    if (questionStates[currentIndex]?.isSubmitted) return;
    const newState = [...questionStates];
    newState[currentIndex] = {
      ...newState[currentIndex],
      selectedAnswer: choice,
    };
    setQuestionStates(newState);
  };

  const handleSubmitAnswer = async () => {
    if (!quizData || !questionStates[currentIndex]?.selectedAnswer) return;

    const currentQuestion = quizData[currentIndex];
    const userAnswer = questionStates[currentIndex].selectedAnswer;
    const isCorrect = userAnswer === currentQuestion?.correct;

    // Update score if correct
    const updatedStates = [...questionStates];

    updatedStates[currentIndex] = {
      ...updatedStates[currentIndex],
      selectedAnswer:updatedStates[currentIndex]?.selectedAnswer ?? "",
      isSubmitted: true,
      isCorrect,
    };
    setQuestionStates(updatedStates);
    if (isCorrect) setScore((prev) => prev + 1);

    try {
      await saveProgress.mutateAsync({
        quizId: parseInt(quizId, 10),
        question: currentQuestion?.question ?? "",
        choices: currentQuestion?.choices ?? [""],
        userAnswer,
        isCorrect,
      });

      // If last question, finalize
      if (currentIndex === quizData.length - 1) {
        await updateQuiz.mutateAsync({
          quizId: parseInt(quizId, 10),
          totalQuestions: quizData.length,
        });
        setTimeout(() => {
          router.push(`/dashboard/quiz/${quizId}/feedback?word=${wordName}&total=${total}`);
        }, 1300);
      } else {
        // Show result then next
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 1300);
      }
    } catch (error) {
      // Consider adding a toast or visible error message here
      console.error("Error saving progress:", error);
    }
  };

  const getChoiceClassName = (choice: string) => {
    const currentState = questionStates[currentIndex];
    if (!currentState?.isSubmitted) {
      return "hover:bg-gray-100 cursor-pointer";
    }
    const isSelected = currentState?.selectedAnswer === choice;
    const isCorrect = quizData?.[currentIndex]?.correct === choice;
    return cn("transition-colors", {
      "bg-green-100 border-green-500": isCorrect,
      "bg-red-100 border-red-500": isSelected && !isCorrect,
      "cursor-not-allowed": true,
    });
  };

  // Loading state
  if (!quizData)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
        <span className="ml-3 text-muted-foreground">Loading quiz...</span>
      </div>
    );

  const currentQuestion = quizData[currentIndex];

  return (
    <div className="container mx-auto p-5">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-1">Quiz: {wordName}</h1>
        <h2 className="text-xl mb-1">
          Question {currentIndex + 1} / {total}
        </h2>
        <div className="text-md text-gray-500 font-semibold">
          Score: {score} / {currentIndex + 1}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            {currentQuestion?.question}
          </h3>
        </div>

        <div className="space-y-3">
          {currentQuestion?.choices.map((choice, idx) => (
            <div
              key={idx}
              className={`p-3 border rounded-lg ${
                getChoiceClassName(choice)
              }`}
              onClick={() => handleAnswerSelect(choice)}
            >
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  value={choice}
                  checked={questionStates[currentIndex]?.selectedAnswer === choice}
                  onChange={() => handleAnswerSelect(choice)}
                  disabled={questionStates[currentIndex]?.isSubmitted}
                  className="mr-3"
                />
                <Label>{choice}</Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSubmitAnswer}
        disabled={
          (!questionStates[currentIndex]?.selectedAnswer ||
            questionStates[currentIndex]?.isSubmitted) ??
          saveProgress.isPending
        }
        className="w-full mt-5"
      >
        {saveProgress.isPending
          ? "Saving..."
          : questionStates[currentIndex]?.isSubmitted
          ? "Answer Submitted"
          : currentIndex === quizData.length - 1
          ? "Finish Quiz"
          : "Submit Answer"}
      </Button>

      {questionStates[currentIndex]?.isSubmitted && (
        <div
          className={cn(
            "mt-4 p-4 rounded",
            questionStates[currentIndex]?.isCorrect
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          )}
        >
          {questionStates[currentIndex]?.isCorrect
            ? "Correct! 🎉"
            : `Incorrect. The correct answer is: ${currentQuestion?.correct}`}
          {currentQuestion?.explanation && (
            <p className="mt-2 text-sm">{currentQuestion?.explanation}</p>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/quiz")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Quit Quiz
        </Button>
      </div>
    </div>
  );
}
