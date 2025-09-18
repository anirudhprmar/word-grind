"use client"
import { LoaderCircle, Settings2, Trophy, Target, BookOpen, Calendar, TrendingUp, Award, Clock, Brain } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"
import { Separator } from "~/components/ui/separator"
import { api } from "~/lib/api"
import { authClient } from "~/lib/auth-client"

interface QuizProps {
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

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface WordStats {
  total: number;
  learned: number;
  unlearned: number;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const session = await authClient.getSession();
      if (session.data?.user) {
        setUser(session.data.user);
      }
    }
    void fetchUser();
  }, []);

  const { data: quizData, isLoading: quizLoading, error: quizError } = api.quiz.listQuizzes.useQuery({
    userId: user?.id ?? "",
  });

  const { data: wordData, isLoading: wordLoading, error: wordError } = api.word.listWords.useQuery({
    userId: user?.id ?? "",
  });

  if (quizLoading || wordLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
        <span className="ml-3 text-muted-foreground">Loading your profile...</span>
      </div>
    );
  }

  if (quizError || wordError) {
    toast.error(`${quizError?.message ?? wordError?.message}`);
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Something went wrong</h1>
          <p className="text-muted-foreground">{quizError?.message?? wordError?.message}</p>
        </div>
      </div>
    );
  }

  const quizList: QuizProps[] = quizData ?? [];
  const wordList = wordData ?? [];

  // Calculate statistics
  const totalQuizzes = quizList.length;
  const completedQuizzes = quizList.filter(q => q.completedAt !== null).length;
  const successfulQuizzes = quizList.filter(q => q.result === "success").length;
  const averageScore = quizList.length > 0 
    ? Math.round(quizList.reduce((sum, quiz) => sum + quiz.score, 0) / quizList.length * 100) / 100
    : 0;
  const totalQuestionsAnswered = quizList.reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
  const totalCorrectAnswers = quizList.reduce((sum, quiz) => sum + quiz.score, 0);
  const overallAccuracy = totalQuestionsAnswered > 0 
    ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100)
    : 0;

  // Word statistics
  const wordStats: WordStats = {
    total: wordList.length,
    learned: wordList.filter(w => w.learned === true).length,
    unlearned: wordList.filter(w => w.learned !== true).length,
  };

  const learningProgress = wordStats.total > 0 
    ? Math.round((wordStats.learned / wordStats.total) * 100)
    : 0;

  // Recent activity (last 5 quizzes)
  const recentQuizzes = quizList
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Performance level
  const getPerformanceLevel = (accuracy: number) => {
    if (accuracy >= 90) return { level: "Expert", color: "text-green-600", bgColor: "bg-green-100" };
    if (accuracy >= 75) return { level: "Advanced", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (accuracy >= 60) return { level: "Intermediate", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "Beginner", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const performance = getPerformanceLevel(overallAccuracy);

  // Calculate streak (consecutive successful quizzes)
  const calculateStreak = () => {
    let streak = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < quizList.length; i++) {
      if (quizList[i]?.result === "success") {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  // Average time per quiz (mock calculation)
  const averageTimePerQuiz = Math.floor(Math.random() * 5) + 2; // 2-7 minutes (placeholder)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Profile Overview
          </CardTitle>
          <CardDescription>
            Your complete vocabulary learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.image ?? ""} />
              <AvatarFallback className="text-2xl">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <Badge variant="secondary" className={`${performance.bgColor} ${performance.color}`}>
                {performance.level} Learner
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Words</p>
                <p className="text-2xl font-bold">{wordStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Words Mastered</p>
                <p className="text-2xl font-bold">{wordStats.learned}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Quiz Accuracy</p>
                <p className="text-2xl font-bold">{overallAccuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{currentStreak}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Words Learned</span>
                <span>{wordStats.learned}/{wordStats.total}</span>
              </div>
              <Progress value={learningProgress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1">
                {learningProgress}% of vocabulary mastered
              </p>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Learned</p>
                <p className="text-xl font-bold text-green-600">{wordStats.learned}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-xl font-bold text-yellow-600">{wordStats.unlearned}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Quiz Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Quizzes</p>
                <p className="text-xl font-bold">{totalQuizzes}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-bold">{completedQuizzes}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-xl font-bold text-green-600">
                  {totalQuizzes > 0 ? Math.round((successfulQuizzes / totalQuizzes) * 100) : 0}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-xl font-bold">{averageScore}</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Overall Accuracy</p>
              <Progress value={overallAccuracy} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1">
                {totalCorrectAnswers} correct out of {totalQuestionsAnswered} questions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your last 5 quiz attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentQuizzes.length > 0 ? (
            <div className="space-y-3">
              {recentQuizzes.map((quiz, index) => (
                <div key={quiz.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      quiz.result === "success" ? "bg-green-500" : "bg-red-500"
                    }`} />
                    <div>
                      <p className="font-medium">Quiz #{quiz.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{quiz.score}/{quiz.totalQuestions}</p>
                    <Badge variant={quiz.result === "success" ? "default" : "destructive"}>
                      {quiz.result === "success" ? "Passed" : "Failed"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No quiz activity yet</p>
              <p className="text-sm text-muted-foreground">Start your first quiz to see your progress here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements & Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="font-medium">Streak Master</p>
              <p className="text-sm text-muted-foreground">
                {currentStreak} quiz{currentStreak !== 1 ? 'es' : ''} in a row
              </p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Vocabulary Builder</p>
              <p className="text-sm text-muted-foreground">
                {wordStats.total} words collected
              </p>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium">Accuracy Expert</p>
              <p className="text-sm text-muted-foreground">
                {overallAccuracy}% overall accuracy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}