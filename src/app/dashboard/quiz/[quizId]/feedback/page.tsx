'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

interface FeedbackPageProps {
 params: { quizId: string };
 searchParams: { score?: string; total?: string };
}

export default function FeedbackPage({ params, searchParams }: FeedbackPageProps) {
  const { quizId } = params;
  const { total } = searchParams;
  const router = useRouter();

  const handleBackToQuizzes = async() => {
    await router.push('/quiz'); // Navigate back to main quiz page
  };

  return (
    <div>
      <h1>Quiz Complete!</h1>
      <p>Your Score: {score}/{total}</p>
      <button onClick={handleBackToQuizzes}>
        Back to Quizzes
      </button>
    </div>
  );
}


