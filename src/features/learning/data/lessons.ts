export type SkillPage = {
  title: string;
  body: string[];
  code?: { language: string; snippet: string };
};

export type Topic = {
  slug: string;
  name: string;
  blurb: string;
  pages: SkillPage[];
};

export type Lesson = {
  slug: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  gradient: string;
  glyph: string;
  topics: Topic[];
};

export const LESSONS: Lesson[] = [
  {
    slug: "frontend-developer",
    title: "Frontend Website Developer",
    description:
      "Learn to build beautiful, modern websites from scratch: structure pages with HTML, style them with CSS, add interactivity with JavaScript, and finally build full apps with Next.js.",
    level: "Beginner",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    glyph: "</>",
    topics: [
      {
        slug: "html",
        name: "HTML",
        blurb: "The structure of every web page.",
        pages: [
          {
            title: "What is HTML?",
            body: [
              "HTML (HyperText Markup Language) is the standard language for describing the structure of a web page. It uses tags to label content: a heading, a paragraph, an image, a link.",
              "Browsers read HTML from top to bottom and render it into the page you see. Web pages are often called documents, and each tag adds meaning to the content.",
              "A minimal HTML document contains a doctype, an <html> element, a <head> section (metadata you don't visibly see) and a <body> (everything visible).",
            ],
            code: {
              language: "html",
              snippet: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>My first paragraph.</p>
  </body>
</html>`,
            },
          },
          {
            title: "Text, Links and Images",
            body: [
              "Most of the web is text. HTML gives you semantic tags for text: <h1>–<h6> for headings, <p> for paragraphs, <strong> and <em> for emphasis.",
              "Links use the <a> tag with an href attribute. Attributes add extra information to elements, like where a link goes or the source of an image.",
              "Images use the <img> tag. Always provide an alt attribute describing the image: it helps screen-reader users and shows when the image fails to load.",
            ],
            code: {
              language: "html",
              snippet: `<h1>Learn HTML</h1>
<p>Read the <a href="https://developer.mozilla.org">MDN docs</a>.</p>
<img src="sunset.jpg" alt="A sunset over the sea">`,
            },
          },
          {
            title: "Forms and Structure",
            body: [
              "Forms collect input from users: sign-up forms, search boxes, checkout pages. They wrap inputs inside a <form> element with labels for accessibility.",
              "Semantic layout tags such as <header>, <nav>, <main>, <section> and <footer> communicate what each part of the page is for.",
              "Semantic HTML matters beyond style: it improves accessibility, search-engine ranking, and makes your CSS and JavaScript much easier to target later.",
            ],
            code: {
              language: "html",
              snippet: `<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required>
  <button type="submit">Sign up</button>
</form>`,
            },
          },
        ],
      },
      {
        slug: "css",
        name: "CSS",
        blurb: "Style and layout for beautiful pages.",
        pages: [
          {
            title: "Styling with CSS",
            body: [
              "CSS (Cascading Style Sheets) controls how HTML looks: colors, fonts, spacing, and overall layout. You write rules that select elements and apply styles to them.",
              "CSS works by a system of specificity: when two rules conflict, the more specific selector wins, and everything else falls back to inheritance and defaults.",
              "You can attach CSS with a <style> tag or, preferably, a separate .css file linked from the <head> so styles can be reused across pages.",
            ],
            code: {
              language: "css",
              snippet: `h1 {
  color: indigo;
  font-family: sans-serif;
}

.card {
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
}`,
            },
          },
          {
            title: "The Box Model and Layout",
            body: [
              "Every element is a box with content, padding, border and margin. Understanding the box model is the key to predicting spacing between elements.",
              "For layout, CSS gives you Flexbox to arrange elements in rows or columns, and Grid to design two-dimensional layouts with tracks and areas.",
              "Use Flexbox for small components like navbars and button rows; use Grid for page-level structure like sidebars beside main content.",
            ],
            code: {
              language: "css",
              snippet: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2rem;
}`,
            },
          },
          {
            title: "Responsive Design",
            body: [
              "Responsive design means one page that works on a phone, a tablet and a desktop. The tool is media queries: rules that apply only when conditions like screen width are met.",
              "Modern practice is mobile-first: write styles for small screens, then use min-width media queries to enhance the layout as space grows.",
              "Relative units (%, rem, vw) and modern functions like clamp() let type and spacing scale fluidly, reducing how many breakpoints you need.",
            ],
            code: {
              language: "css",
              snippet: `.cards {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
            },
          },
        ],
      },
      {
        slug: "javascript",
        name: "JavaScript",
        blurb: "Add interactivity to your pages.",
        pages: [
          {
            title: "JavaScript Basics",
            body: [
              "JavaScript is the programming language of the web. HTML is structure and CSS is style; JavaScript is behavior: what happens when things are clicked, typed and scrolled.",
              "Values have types: strings, numbers, booleans, arrays and objects. Data is stored in variables declared with let or const, and manipulated with functions.",
              "Console logging is your first debugging tool: open browser DevTools, run code, and see what values actually hold.",
            ],
            code: {
              language: "javascript",
              snippet: `const name = "Ada";
let steps = 0;

function greet(person) {
  return \`Hello, \${person}!\`;
}

steps = steps + 1;
console.log(greet(name), steps);`,
            },
          },
          {
            title: "The DOM and Events",
            body: [
              "The browser exposes the page as the DOM (Document Object Model), a tree of elements you can read and change from JavaScript at any time.",
              "Events let you run code in response to user actions: clicks, key presses, form submissions. The addEventListener method connects an event to a callback function.",
              "Change text, toggle classes, and add or remove elements dynamically: this is how menus, tabs, modals and galleries are built.",
            ],
            code: {
              language: "javascript",
              snippet: `const button = document.querySelector("#menu-btn");

button.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});`,
            },
          },
          {
            title: "Async JavaScript and Fetch",
            body: [
              "Modern apps load data in the background using promises and async/await. await pauses a function until data arrives, without freezing the whole page.",
              "The fetch API requests data from a server and returns a promise resolving to a response that you parse as JSON.",
              "Update the UI from that data: render lists, search as you type, or poll for updates. This is the foundation of every modern web app.",
            ],
            code: {
              language: "javascript",
              snippet: `async function loadPosts() {
  const res = await fetch("/api/posts");
  const posts = await res.json();
  renderList(posts);
}`,
            },
          },
        ],
      },
      {
        slug: "nextjs",
        name: "Next.js",
        blurb: "Build fast, full React applications.",
        pages: [
          {
            title: "Why Next.js?",
            body: [
              "Next.js is a framework built on React that handles everything real websites need: routing, rendering on the server, caching, images and bundling.",
              "Pages live in an app directory where the folder structure defines the URL. Each page can run partly on the server and partly in the browser.",
              "You get fast navigation, SEO-friendly pages and large-ecosystem tooling while still writing plain React components.",
            ],
            code: {
              language: "tsx",
              snippet: `// src/app/page.tsx
export default function HomePage() {
  return <h1>Welcome to Next.js</h1>;
}`,
            },
          },
          {
            title: "Routing and Data",
            body: [
              "Dynamic routes like blog/[slug] generate one component per item. Server components can fetch data directly with async functions, then render it.",
              "generateStaticParams pre-builds static pages at deploy time so they load instantly; notFound() renders a friendly 404 for missing items.",
              "Loading and error files let you declare UI states per route, instead of wiring every spinner by hand.",
            ],
            code: {
              language: "tsx",
              snippet: `export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Post({
  params,
}: PageProps<"/blog/[slug]">) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return <article>{post.text}</article>;
}`,
            },
          },
          {
            title: "Ship Your Website",
            body: [
              "Images are served optimized automatically by the next/image component: right formats, sizes and lazy loading out of the box.",
              "Deploy by building the app and hosting it on platforms like Vercel, where every git push creates a live preview build.",
              "From here, connect a database, add authentication and explore streaming UI: you now have the full frontend foundation.",
            ],
            code: {
              language: "bash",
              snippet: `npm run build
npx vercel`,
            },
          },
        ],
      },
    ],
  },
  {
    slug: "intro-to-programming",
    title: "Introduction to Programming",
    description:
      "The perfect first step into code: understand how programs run, store data in variables, control the flow with branches and loops, and organize logic into functions.",
    level: "Beginner",
    gradient: "from-teal-400 via-emerald-500 to-lime-500",
    glyph: "{}",
    topics: [
      {
        slug: "how-programs-run",
        name: "How Programs Run",
        blurb: "Computers follow instructions, literally.",
        pages: [
          {
            title: "Instructions for Humans and Machines",
            body: [
              "A program is a list of instructions executed in order, one line at a time, from top to bottom, by a machine that never gets bored and never guesses.",
              "Computers only understand machine code (simple numeric operations), so we write human-friendly source code that a compiler or interpreter translates for the CPU.",
              "Algorithms are the recipes: precise step-by-step instructions to solve a problem, like sorting a list or finding a word in a dictionary.",
            ],
          },
          {
            title: "Thinking Like a Programmer",
            body: [
              "Programming is decomposition: splitting one huge problem into small problems you can already solve, then gluing the solutions together.",
              "Debugging is the most important skill: when code runs, it did exactly what you said. You learn to read outputs and trace values to find what you actually said.",
              "Practice small: print values, change a number, run again. Fast feedback builds intuition faster than reading long theory.",
            ],
          },
        ],
      },
      {
        slug: "variables-and-types",
        name: "Variables & Types",
        blurb: "Store and label your data.",
        pages: [
          {
            title: "Variables: Named Boxes for Values",
            body: [
              "A variable gives a name to a piece of data so you can refer to it later. Assign with =, which stores the right-hand value into the left-hand name.",
              "Types describe the shape of data: numbers, strings (text), booleans (true/false), lists and more. Each language decides how strictly types are checked.",
              "Good variable names make code self-explanatory: hoursWorked beats h or x in every serious project.",
            ],
            code: {
              language: "python",
              snippet: `name = "Ada"
age = 36
is_developer = True

print(name, age, is_developer)`,
            },
          },
          {
            title: "Operators and Expressions",
            body: [
              "Operators combine values into new ones: + - * / for math, == and != for comparison, and and/or/not for logic.",
              "Expressions always evaluate to one value, which can then be stored, printed or used inside another expression.",
              "Beware of mixing types: adding the string \"5\" to the number 5 behaves differently in each language, and is a classic beginner bug.",
            ],
            code: {
              language: "python",
              snippet: `total = 3 * 7          # 21
greeting = "Hi, " + name
is_valid = age >= 18 and is_developer

print(total, greeting, is_valid)`,
            },
          },
        ],
      },
      {
        slug: "control-flow",
        name: "Control Flow",
        blurb: "Make decisions, repeat actions.",
        pages: [
          {
            title: "Branching with If",
            body: [
              "Programs make decisions with if/else: run some code when a condition is true, run other code when it is false.",
              "Conditions are boolean expressions: age >= 18, password == attempt, score > high_score. Nested ifs answer more complex questions.",
              "Keep conditions simple and readable. Complex boolean expressions are a common source of subtle bugs.",
            ],
            code: {
              language: "python",
              snippet: `if age >= 18:
    print("Access granted")
else:
    print("Sorry, adults only")`,
            },
          },
          {
            title: "Loops: Repeating Work",
            body: [
              "Loops repeat instructions without repeating code. For loops iterate over a sequence; while loops run as long as a condition holds.",
              "Accumulators (a variable updated each iteration) turn a simple loop into useful computation, like summing a list of numbers.",
              "Infinite loops happen when the exit condition never becomes false: always make sure something changes each iteration.",
            ],
            code: {
              language: "python",
              snippet: `total = 0
for score in [72, 88, 91]:
    total = total + score

print("Average:", total / 3)`,
            },
          },
        ],
      },
      {
        slug: "functions",
        name: "Functions",
        blurb: "Reuse and organize your logic.",
        pages: [
          {
            title: "Defining and Calling Functions",
            body: [
              "A function wraps steps in a reusable block with a name. Inputs are parameters; the return value is the result handed back to the caller.",
              "Functions hide complexity behind intention-revealing names: summarize(scores) is easier to read than fifteen tangled lines.",
              "Small functions that do one thing are easiest to test, easiest to debug, and easiest to share between projects.",
            ],
            code: {
              language: "python",
              snippet: `def average(numbers):
    return sum(numbers) / len(numbers)

print(average([72, 88, 91]))`,
            },
          },
          {
            title: "Your First Mini Project",
            body: [
              "Put it together: variables store the data, a loop reads every score, control flow warns on failure, and a function reports the result.",
              "Break the task into named steps first, write one tiny piece at a time, and print values as you go.",
              "From here you are ready for deeper tracks: build a website with the Frontend track, or analyze data with the Data track.",
            ],
            code: {
              language: "python",
              snippet: `def report(scores):
    for s in scores:
        if s < 60:
            print("Warning: low score", s)
    return average(scores)

print(report([72, 88, 91]))`,
            },
          },
        ],
      },
    ],
  },
  {
    slug: "backend-developer",
    title: "Backend Web Developer",
    description:
      "Power servers and APIs: build HTTP servers with Node.js, design REST APIs, persist data in databases, and secure access with authentication.",
    level: "Intermediate",
    gradient: "from-sky-500 via-blue-600 to-indigo-600",
    glyph: "srv",
    topics: [
      {
        slug: "nodejs",
        name: "Node.js",
        blurb: "JavaScript on the server.",
        pages: [
          {
            title: "Running JavaScript Without a Browser",
            body: [
              "Node.js executes JavaScript outside the browser: CLIs, scripts and most importantly HTTP servers that answer requests 24/7.",
              "npm installs packages from a registry of over a million libraries. package.json declares your project's dependencies and scripts.",
              "Node is excellent for I/O-heavy work (databases, files, network) because it handles operations asynchronously without blocking.",
            ],
            code: {
              language: "bash",
              snippet: `npm init -y
npm install express
node server.js`,
            },
          },
          {
            title: "Your First HTTP Server",
            body: [
              "A server listens on a port and responds to requests: browsers, mobile apps and other services are its clients.",
              "With Express you describe routes: a method (GET, POST) plus a path plus a handler that reads the request and writes the response.",
              "Middleware are functions every request passes through: logging, parsing bodies, authentication checks.",
            ],
            code: {
              language: "javascript",
              snippet: `import express from "express";
const app = express();

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(3000);`,
            },
          },
        ],
      },
      {
        slug: "rest-apis",
        name: "REST APIs",
        blurb: "Design APIs other developers love.",
        pages: [
          {
            title: "Resources and HTTP Verbs",
            body: [
              "REST models your app as resources: /posts, /users, /orders. Verbs describe actions: GET reads, POST creates, PUT/PATCH updates, DELETE removes.",
              "Status codes tell clients what happened: 200 OK, 201 Created, 400 bad request, 401 unauthenticated, 404 missing, 500 server error.",
              "JSON is the standard exchange format. Design responses around the data clients need, consistently shaped and named.",
            ],
            code: {
              language: "javascript",
              snippet: `app.post("/posts", async (req, res) => {
  const post = await db.post.create(req.body);
  res.status(201).json(post);
});`,
            },
          },
          {
            title: "Validation and Errors",
            body: [
              "Never trust client input: validate types, lengths and ownership before writing to the database.",
              "Centralize error handling in one middleware so every failure returns the same JSON shape that clients can rely on.",
              "Document your API early: lists of endpoints, examples and error cases make integrations painless.",
            ],
            code: {
              language: "javascript",
              snippet: `app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({
    error: err.message,
  });
});`,
            },
          },
        ],
      },
      {
        slug: "databases",
        name: "Databases",
        blurb: "Make data survive restarts.",
        pages: [
          {
            title: "Relational Basics",
            body: [
              "Databases store data reliably and query it fast. Relational databases organize data into tables of rows and columns with declared types.",
              "SQL is the query language: SELECT reads, INSERT creates, UPDATE modifies, DELETE removes, always filtered with WHERE.",
              "Foreign keys link tables (a post belongs to a user). Normalization removes duplication and keeps data consistent.",
            ],
            code: {
              language: "sql",
              snippet: `CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text TEXT NOT NULL
);

SELECT * FROM posts WHERE user_id = 1;`,
            },
          },
          {
            title: "Modeling an App's Data",
            body: [
              "Start from your features: each noun in your product usually becomes a table, and relations between nouns become link columns or join tables.",
              "Use migrations to change the schema over time in reproducible, reviewable steps that run identically everywhere.",
              "Indexes make common lookups fast: add them on columns that appear in WHERE, JOIN and ORDER BY clauses.",
            ],
            code: {
              language: "sql",
              snippet: `CREATE INDEX idx_posts_user
  ON posts (user_id);`,
            },
          },
        ],
      },
    ],
  },
  {
    slug: "data-basics",
    title: "Data & Python Basics",
    description:
      "Start analyzing real data: learn Python's friendly syntax, compute fast with NumPy, wrangle tables with Pandas, and communicate results with plots.",
    level: "Beginner",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    glyph: "[]",
    topics: [
      {
        slug: "python",
        name: "Python",
        blurb: "The friendliest language to start with.",
        pages: [
          {
            title: "Python in Ten Minutes",
            body: [
              "Python reads almost like English: no semicolons or curly braces, just indentation. This makes it a favorite first language, especially for data work.",
              "Lists, dictionaries and comprehensions let you filter and transform data in one expressive line.",
              "Run scripts with python file.py, or experiment interactively in a REPL or notebook: instant feedback is built into the workflow.",
            ],
            code: {
              language: "python",
              snippet: `temperatures = [21, 24, 19, 25]
hot = [t for t in temperatures if t > 20]

info = {"name": "Ada", "role": "Math"}
print(hot, info["role"])`,
            },
          },
          {
            title: "Functions and Modules",
            body: [
              "Define functions with def. Modules are files you import, and pip installs third-party packages from PyPI.",
              "The ecosystem is Python's superpower: NumPy, Pandas, Matplotlib and scikit-learn cover nearly every data task.",
              "Style matters: small functions, clear names and docstrings make scripts others (including you) can use next month.",
            ],
            code: {
              language: "python",
              snippet: `def average(numbers):
    return sum(numbers) / len(numbers)`,
            },
          },
        ],
      },
      {
        slug: "numpy",
        name: "NumPy",
        blurb: "Fast math on big arrays.",
        pages: [
          {
            title: "Arrays Instead of Loops",
            body: [
              "NumPy's ndarray is a grid of numbers you manipulate all at once. Vectorized operations replace slow Python loops with fast compiled code.",
              "A million-element array: adding one to every element as a NumPy operation takes a blink, not a grind.",
              "Broadcasting applies operations between arrays of different shapes, like adding a row vector to every row of a matrix.",
            ],
            code: {
              language: "python",
              snippet: `import numpy as np

temperatures = np.array([21.4, 24.1, 19.8, 25.3])
print(temperatures.mean(), temperatures.max())

scaled = temperatures * 1.8 + 32  # to Fahrenheit`,
            },
          },
          {
            title: "Slicing and Statistics",
            body: [
              "Slice arrays like Python lists, and in 2D with [row, column] ranges. Slices are views, so they are fast but share memory.",
              "Statistical helpers are built in: mean, median, std, and argmax for finding positions of extremes.",
              "Reshape lets you shift dimensions, e.g. turning a flat list into rows and columns for matrix math.",
            ],
            code: {
              language: "python",
              snippet: `a = np.arange(9).reshape(3, 3)
print(a[:, 0])    # first column
print(a.mean())   # 4.0`,
            },
          },
        ],
      },
      {
        slug: "pandas",
        name: "Pandas",
        blurb: "Spreadsheets with superpowers.",
        pages: [
          {
            title: "DataFrames: Your Data Table",
            body: [
              "A DataFrame is a labeled table: read a CSV with one line and immediately compute over columns, rows and selections.",
              "Select columns like a dictionary, filter rows with boolean masks, and add computed columns in one expression.",
              "groupby splits the table into groups, applies an aggregation per group and combines the results: the workhorse of every report.",
            ],
            code: {
              language: "python",
              snippet: `import pandas as pd

df = pd.read_csv("sales.csv")
big = df[df["amount"] > 1000]
report = df.groupby("city")["amount"].sum()`,
            },
          },
          {
            title: "Cleaning Missing Data",
            body: [
              "Real data has holes: isna finds them and dropna or fillna remove or repair them, column by column or globally.",
              "astype converts types, and dates parse into proper datetime columns which are then sortable and splittable.",
              "Verify cleaning results: compare row counts, spot-check values, and keep transformations in a rerunnable script.",
            ],
            code: {
              language: "python",
              snippet: `df = df.dropna(subset=["email"])
df["signup"] = pd.to_datetime(df["signup"])`,
            },
          },
        ],
      },
    ],
  },
];

export function getLesson(lessonSlug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === lessonSlug);
}

export function getTopic(
  lesson: Lesson,
  topicSlug: string,
): { topic: Topic; index: number } | undefined {
  const index = lesson.topics.findIndex((topic) => topic.slug === topicSlug);
  return index === -1 ? undefined : { topic: lesson.topics[index], index };
}

export function getLessonHref(lesson: Lesson | string): string {
  const slug = typeof lesson === "string" ? lesson : lesson.slug;
  return `/lessons/${slug}`;
}

export function getLearnHref(
  lessonSlug: string,
  topicSlug: string,
  page: number,
): string {
  return `/lessons/${lessonSlug}/learn/${topicSlug}/${page}`;
}
