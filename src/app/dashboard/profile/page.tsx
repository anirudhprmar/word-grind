"use client"
import { LoaderCircle, Settings2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import SessionInfo from "~/app/_components/SessionInfo"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
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

export default function UserProfile() {

    const [user, setUser] = useState<User | null>(null);
      

     useEffect(() => {
        async function fetchUser() {
          const session = await authClient.getSession();
            if (session.data?.user) {
            setUser(session.data.user)
          }
        }
        void fetchUser()
     },[])   

         const { data , isLoading,error  } = api.quiz.listQuizzes.useQuery({
            userId: user?.id ?? "",
          });

          
          if (isLoading) {
            return (  <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>)

          }
          if(error){
            toast.error( `${error.message}`)
          }

          const quizList:QuizProps[] = data ?? []
          console.log("quiz list",quizList)
  
  return (
    <div>
      <div className=" mx-10 pt-10">
        <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings2 className="h-5 w-5" />
                        Profile Analysis
                      </CardTitle>
                      <CardDescription>
                        Complete Analysis of Performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={ user?.image ?? ""} /> 
                          {/* image preview in src  */}
                          <AvatarFallback>
                            {user?.name ?? ""
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        </div>

                        <div>
                          {JSON.stringify(quizList)}
                        </div>
                    </CardContent>
        </Card>
      </div>
    </div>
  )
}
