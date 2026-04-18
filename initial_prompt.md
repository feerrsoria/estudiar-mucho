The app name is Estudiar-Mucho.
It's a web app.
The stack will be Next.js, react fiber, material ui, tailwind. Firebase for authentication and Firestore for database. Supabase for bucket. Additional libs can be added if needed.

Features, a pdf,txt,ppx presentation files or any text file can be uploaded to the website. The website interacts with Vertex AI to take either the full book or selected chapters, pages or sections (prompted by the user at uploading the file, if not provided it's full file) then it will create questions and answers of important information, with a title related to the theme, it can include a subtitle for clarification, and the page where it has been encountered.

With the questions and answers the view will be a bottom bar with small rectangle 3D cards that can be flip on one side it has the questions with title and subtitle and in the other side it has the answer. The page is displayed on both sides on one of the bottom corners.

The user can select a card and put it in the middle of the screen in a larger size. The bottom bar selector has to be horizontally scrollable, it has to avoid N+1 queries and high load on database.

The user can save their cards in their profile if he will be prompt to sign in, the original file is not preserved. The user can have many cards collections.
The question and answer has to be in the same language as the file unless other language is specified in the prompt.

The color pallete has to be a scale of grays and blues. 
