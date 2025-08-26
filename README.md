# WordGrind

## Landing Page
- [ ]- think of logo 

## Core functionalities 

26 Tue
- [X]- logout btn in sidebar>navuser (a proper user procedure to get every datail about the user , check better auth docs)
- [ ]- work on quiz/ practice functionlity 
- [ ]- Create tRPC endpoints for generating quizzes (e.g., multiple-choice from user's vocab). Implement scoring and update progress.
- [ ]- Users view their words lists but style it proper to within the viewport (data table)
- [ ]- Users can edit and make learned true (click on a word , open it on a modal , edit it and save it )
- [ ]- work on quiz page -> give options of words from db -> use that to info to create quizzes (send custom system input one from word input and other from quiz to separate their queries) -> questions range for quiz feature -> feedback on quiz 
- [ ]- record a demo video and update the landing page with demo video
- [ ]- Use tools like Google Forms for quick feedback.
- [ ]- work on user profile
- [ ]- gotta implement this Add a simple model to track learned words and streaks(words with learned true display them). Display progress on the calender (simple way to do it is by small boxes fill with color if learned a new word on that day each box is day and have months something like that , everything based on user data)
 
 27 Wed (No college just ship the app at any cost)
- [ ]- proper authenticaiton with better auth with polar integration (VERIFY PAYMENT OF BACKEND) also login with email using magic link 
- [ ]- if user cookie is detected then no need to show landing page redirect back to dashboard
- [ ]- Set up Resend for daily vocab reminders or quiz prompts. Trigger emails on events like signup or streak milestones.
- [ ]- Integrate Polar. Set up webhooks and tRPC for subscription checks. Fix pricing only one $9.99 plan
- [ ]- Manual tests for auth, quizzes, and emails. Fix bugs.
- [ ]- error mangement - sentry 
- [ ]- quick  analytics - posthog setup
- [ ]- redis, upstash (rate limitting). Add rate limiting, input validation in tRPC, and basic CORS. Test for common vulnerabilities (e.g., SQL injection via Drizzle).
- [ ]- Check safety and security 
- [ ]- set up schema.org 
- [ ]- get landing page links working -> get wordgrind and login -> update the content on hero page (check my history of perplexity)
- [ ]- Launch the APP
- [ ]- start marketting the app: reddit , x , linkedIn, hacker news distribution is the key


- [ ]- additional features to work on : llm suggestions after quiz a analysis , chat with an llm vercel ai sdk , speech to text conversation and one to one call   with aiusing the word you are learning, learderboard