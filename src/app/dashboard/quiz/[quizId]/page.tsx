"use client"
import {useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/lib/api";
import { cn } from "~/lib/utils";
import { getQuizInfo } from "~/server/wordQuiz";


interface singleQuizDataProps{
  question:string,
  choices:string[],
  correct:string,
  explanation?:string
}

interface questionState{
  selectedAnswer:string,
  isCorrect?:boolean,
  isSubmitted?:boolean
}

export default function QuizPage({ params }: { params: { quizId: string } }) {
  //get the quiz id from the url
  const router = useRouter()
  const { quizId } = params;
  const searchParams = useSearchParams()
  const totalProblems = searchParams.get("totalQuestions")
  const total = totalProblems ? parseInt(totalProblems,10) : 2;
  const wordName = searchParams.get("name") ?? "example"


  //fetch the quiz information from the gemini api / server action 
  const [quizData,setQuizData] = useState<singleQuizDataProps[] | null>(null)
  const [currentIndex,setCurrentIndex] = useState(0)
  const [questionStates, setQuestionStates] = useState<questionState[]>([])

  const saveProgress = api.quiz.ongoingQuizResponse.useMutation()
  const updateQuiz = api.quiz.completeQuiz.useMutation()

  useEffect(()=>{
    if(!wordName ||!total) return;
    async function fetchQuizData() {
     const data = await getQuizInfo(wordName,total) 
     const parsedData = JSON.parse(data) as singleQuizDataProps[]
     setQuizData(parsedData) 
     setQuestionStates(new Array(parsedData.length).fill({selectedAnswer:"",isCorrect:false,isSubmitted:false}))
    }
    void fetchQuizData()
  },[total,wordName])


  const handleAnswerSelect = (choice:string) =>{
    if (questionStates[currentIndex]?.isSubmitted) return; 

    const newState = [...questionStates]
    newState[currentIndex] = {
      ...newState[currentIndex],
      selectedAnswer:choice
    }
    setQuestionStates(newState)
  }

  const handleSubmitAnswer = async() =>{
    if(!quizData || !questionStates[currentIndex]?.selectedAnswer) return;

    const currentQuestion = quizData[currentIndex]
    const userAnswer = questionStates[currentIndex].selectedAnswer
    const isCorrect = userAnswer === currentQuestion?.correct

    //can set scores here if needed

    try {
      await saveProgress.mutateAsync({
        quizId:parseInt(quizId,10),
        question:currentQuestion?.question ?? "",
        choices:currentQuestion?.choices ?? [""],
        userAnswer,
        isCorrect
      })

      if (currentIndex === quizData.length - 1) { // last question 
        // update quizzes table
        await updateQuiz.mutateAsync({quizId:parseInt(quizId,10),totalQuestions:quizData.length})
         router.push(`/dashboard/quiz/${quizId}/feedback?total=${total}`);
      }else{
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1)
        }, 1500);
      }

    } catch (error) {
      console.error("Error saving progress:", error)
    }
  }

  const getChoiceClassName = (choice: string, currentIndex: number) => {
    if (!questionStates[currentIndex]?.isSubmitted) {
      return "hover:bg-gray-100 cursor-pointer"
    }

    const isSelected = questionStates[currentIndex]?.selectedAnswer === choice
    const isCorrect = quizData?.[currentIndex]?.correct === choice

    return cn(
      "transition-colors",
      {
        "bg-green-100 border-green-500": isCorrect,
        "bg-red-100 border-red-500": isSelected && !isCorrect,
        "cursor-not-allowed": true
      }
    )
  }

  if (!quizData) return <div>Loading...</div>

  const currentQuestion = quizData[currentIndex]
  
  return (
    <div>
       <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Quiz: {wordName}</h1>
        <h2 className="text-xl">Question {currentIndex + 1} of {total}</h2>
        {/* <div className="text-sm text-gray-600">Score: {score}/{currentIndex}</div> */}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* quiz interface */}
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {currentQuestion?.question}
            </h3>
        </div>

        <div className="space-y-3">
            {currentQuestion?.choices.map((choice, cindex) => (
              <div
                key={cindex}
                className={cn(
                  "p-3 border rounded-lg",
                  getChoiceClassName(choice, cindex)
                )}
                onClick={() => handleAnswerSelect(choice)}
              >
                <div className="flex items-center">
                  <Input
                    type="radio"
                    id={`choice${cindex}`}
                    name="quiz-answer"
                    value={choice}
                    checked={questionStates[currentIndex]?.selectedAnswer === choice}
                    onChange={() => handleAnswerSelect(choice)}
                    disabled={questionStates[currentIndex]?.isSubmitted}
                    className="mr-3"
                  />
                  <Label htmlFor={`choice${cindex}`}>{choice}</Label>
                </div>
              </div>
            ))}
          </div>
      </div>

      <Button
      onClick={handleSubmitAnswer}
      disabled={(!questionStates[currentIndex]?.selectedAnswer || questionStates[currentIndex]?.isSubmitted ) ?? saveProgress.isPending}
      className="w-full"
      >
        {
          saveProgress.isPending ? "Saving..." : questionStates[currentIndex]?.isSubmitted ? "Answer Submitted" : currentIndex === quizData.length - 1 ? "Finish Quiz" : "Submit Answer"
        }
      </Button>


      {questionStates[currentIndex]?.isSubmitted && (
              <div className={cn(
                "mt-4 p-4 rounded",
                questionStates[currentIndex]?.isCorrect
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              )}>
                {questionStates[currentIndex]?.isCorrect
                  ? "Correct! 🎉"
                  : `Incorrect. The correct answer is: ${currentQuestion?.correct}`}
                {currentQuestion?.explanation && (
                  <p className="mt-2 text-sm">{currentQuestion?.explanation}</p>
                )}
              </div>
            )}

    </div>
  )
}

