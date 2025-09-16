# WordGrind
for dev: user ngrok to properly go through the app flow (webhooks to work)
## Core functionalities


- [X]- set up dark mode: 10min
breadcrumb
- [ ]- / conv can be made like pricing page blur also make the quiz page look good when there are no words also on dashboard input settimout and run a list of words as suggestions
- [ ]- if duplicate words are added then handle that with toast (gives a trpc error)
- [ ]- trpc for change name in setttings page and invalidate it (check the need for usertrpc)
- [ ]- Make quiz smooth (too much loading, questions change , transitition to next question is not smooth)
- [ ]- User profile with quiz data and profile analysis
- [ ]- gotta implement this Add a simple model to track learned words and streaks(words with learned true display them). Display progress on the calender (simple way to do it is by small boxes fill with color if learned a new word on that day each box is day and have months something like that , everything based on user data) - 30min

- [ ]- Check safety and security -1.5hr (server vs client component check with ai , don't query the db on client components, i've done that which i need to fix like getting list of words on client componenet, do all these on server side, rate limitter)
- [ ]- set up schema.org - 20min
- [ ]- get landing page links working -> get wordgrind and login -> update the content on hero page (check my history of perplexity) -20mi
- [ ]- send email when purchase 

- [ ]- record a demo video and update the landing page with demo video - 20 min
- [ ]- Use tools like Google Forms for quick feedback. -5min
- [ ]- start marketting the app: reddit , x , linkedIn, hacker news distribution is the key - 1.5 hr

______

- [ ] - upstash redis Caching 
- [ ]- additional features to work on : llm suggestions after quiz a analysis , chat with an llm vercel ai sdk , speech to text conversation and one to one call   with aiusing the word you are learning, learderboard