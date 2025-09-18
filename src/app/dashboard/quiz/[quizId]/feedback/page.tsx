'use client'
import { ArrowLeft, LoaderCircle, Trophy, Target, Clock, RefreshCw, Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
// import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import { Progress } from '~/components/ui/progress';
import { Toaster } from '~/components/ui/sonner';
import { api } from '~/lib/api';

interface FeedbackPageProps {
  params: Promise<{ quizId: string }>
}

interface QuizResult {
  id: number;
  userId: string;
  wordId: number;
  createdAt: Date;
  completedAt: Date | null;
  result: "success" | "failure" | "null" | null;
  feedback: string;
  suggestion: string;
  score: number;
  totalQuestions: number;
}

export default function FeedbackPage({ params }: FeedbackPageProps) {
  const unwrappedParams = React.use(params);
  const quizId = parseInt(unwrappedParams.quizId, 10);
  const searchParams = useSearchParams();
  const word = searchParams.get("word");
  const router = useRouter();

  const { data, isLoading, error } = api.quiz.getQuizDetails.useQuery({
    quizId
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <LoaderCircle className="size-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your quiz results...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Something went wrong</h1>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => router.push('/dashboard/quiz')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quizzes
          </Button>
        </div>
      </div>
    );
  }

  // Handle no data
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Quiz not found</h1>
          <p className="text-muted-foreground">The quiz results could not be loaded.</p>
          <Button onClick={() => router.push('/dashboard/quiz')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quizzes
          </Button>
        </div>
      </div>
    );
  }

  const report = data[0];
  
  // Calculate time taken
  const getTimeTaken = () => {
    if (!report?.createdAt || !report?.completedAt) return { minutes: 0, seconds: 0 };
    
    const startTime = new Date(report.createdAt);
    const endTime = new Date(report.completedAt);
    const timeDiff = endTime.getTime() - startTime.getTime();
    
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    return { minutes, seconds };
  };

  const { minutes, seconds } = getTimeTaken();
  const scorePercentage = report ? Math.round((report.score / report.totalQuestions) * 100) : 0;
  const isSuccess = report?.result === "success";
  
  // Get performance level
  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: "Excellent", color: "text-green-600", icon: Trophy };
    if (percentage >= 75) return { level: "Good", color: "text-blue-600", icon: Star };
    if (percentage >= 60) return { level: "Fair", color: "text-yellow-600", icon: Target };
    return { level: "Needs Improvement", color: "text-red-600", icon: Target };
  };

  const performance = getPerformanceLevel(scorePercentage);
  const PerformanceIcon = performance.icon;

  const handleBackToQuizzes = () => {
    router.push('/dashboard/quiz');
  };

  const handleRetryQuiz = () => {
    router.push(`/dashboard/quiz/start?word=${encodeURIComponent(word ?? '')}`);
  };

  return (
    <main className="container mx-auto p-6 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          {isSuccess ? (
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
              <Target className="w-8 h-8 text-yellow-600" />
            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
        {word && (
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="text-lg px-3 py-1">
              📚 {word}
            </Badge>
          </div>
        )}
      </div>

      {/* Results Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Score Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PerformanceIcon className="w-5 h-5" />
              Your Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-3xl font-bold">
                {report?.score ?? 0}/{report?.totalQuestions ?? 0}
              </div>
              <Progress value={scorePercentage} className="h-2" />
              <div className="flex items-center justify-between text-sm">
                <span className={`font-medium ${performance.color}`}>
                  {performance.level}
                </span>
                <span className="text-muted-foreground">
                  {scorePercentage}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Time Taken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {minutes > 0 && `${minutes}m `}{seconds}s
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {minutes > 0 ? `${minutes} minutes and ${seconds} seconds` : `${seconds} seconds`}
            </p>
          </CardContent>
        </Card>

        {/* Performance Card */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Questions</span>
                <span className="font-medium">{report?.totalQuestions ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Correct</span>
                <span className="font-medium text-green-600">{report?.score ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Incorrect</span>
                <span className="font-medium text-red-600">
                  {(report?.totalQuestions ?? 0) - (report?.score ?? 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Section */}
      {(report?.feedback ?? report?.suggestion) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Feedback & Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {report.feedback && (
              <div>
                <h4 className="font-medium mb-2">Feedback</h4>
                <p className="text-muted-foreground">{report.feedback}</p>
              </div>
            )}
            {report.suggestion && (
              <>
                {report.feedback && <Separator />}
                <div>
                  <h4 className="font-medium mb-2">Suggestions</h4>
                  <p className="text-muted-foreground">{report.suggestion}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleBackToQuizzes} variant="outline" size="lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>
        
        {word && (
          <Button onClick={handleRetryQuiz} size="lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>

      <Toaster />
    </main>
  );
}