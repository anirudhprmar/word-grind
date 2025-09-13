# WordGrind

## Core functionalities

- [ ]- if not paid then pop up to pay , just like /pricing page put up subscribe now and block access to dashboard pages and on sign up link them to payment not dashboard if already paid then redirect to dashboard
- [ ]- save correct amount of money rn in db its 999 instead of 9.99
- [ ]- show all the quizes that were created
- [X]- no toast on adding new word
- [ ]- if duplicate words are added then handle that with toast
- [ ]- trpc for change name in setttings page
- [ ]- loading states also fix loaders make them center
- [ ]- / conv can be made like pricing page blur
- [ ]- Also google oauth settings update
- [ ]- quick  analytics - posthog setup -20min
- [ ]- redis, upstash (rate limitting). Add rate limiting, input validation in tRPC, and basic CORS. Test for common vulnerabilities (e.g., SQL injection via Drizzle).- 1-2hr
- [ ]- Check safety and security -1.5hr (server vs client component check with ai , don't query the db on client components, i've done that which i need to fix like getting list of words on client componenet, do all these on server side, rate limitter)
- [ ]- set up schema.org - 20min
- [ ]- get landing page links working -> get wordgrind and login -> update the content on hero page (check my history of perplexity) -20mi
- [ ]- send email when purchase 
- [ ]- clean ui button , bg etc, i think use tweak cn and generate a new theme and use that
- [ ]- set up dark mode: 10min
- [ ]- record a demo video and update the landing page with demo video - 20 min
- [ ]- Launch the APP - 30 min
- [ ]- Use tools like Google Forms for quick feedback. -5min
- [ ]- start marketting the app: reddit , x , linkedIn, hacker news distribution is the key - 1.5 hr

______

- [ ]- gotta implement this Add a simple model to track learned words and streaks(words with learned true display them). Display progress on the calender (simple way to do it is by small boxes fill with color if learned a new word on that day each box is day and have months something like that , everything based on user data) - 30min

- [ ]- additional features to work on : llm suggestions after quiz a analysis , chat with an llm vercel ai sdk , speech to text conversation and one to one call   with aiusing the word you are learning, learderboard