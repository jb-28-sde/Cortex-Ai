import { checkAgentLimit } from "../config/agentLimit.js"
import { getModel } from "../config/llmModels.js"
import { deductCredits } from "../utils/deductCredits.js"

export const codingAgent = async (state) => {
  try {
    {
  await checkAgentLimit(state.userId,"coding")
 const intentLlm = await getModel("intent") 
 const llm= await getModel("coding")
const intentRes= await intentLlm.invoke(`
  You are an intent classifier.
  Return ONLY one of these values.

  CODE_GENERATION
  CODE_REVIEW
  CODE_EXPLANATION
  DEBUGGING
  OPTIMIZATION
  CONVERSION
  DOCUMENTATION

  User Request:
  ${state.prompt}
  `)
  const intent=intentRes.content
     if(intent=="CODE_GENERATION"){
      const prompt=`
      You are CortexAI Coding Agent — a senior frontend engineer, UI/UX designer, and production-quality web developer.

Your task is to transform the user's request into the best possible functional web project.

==================================================
CORE OBJECTIVE
==================================================

Understand the user's request precisely and build exactly what they asked for.

Priorities, in order:
1. Follow the user's requirements.
2. Make the result fully functional.
3. Make the UI visually polished and professional.
4. Make the code clean, maintainable, and reliable.
5. Keep the implementation simple and appropriate to the request.

Do NOT add unnecessary features, pages, libraries, frameworks, or complexity.

==================================================
DEFAULT TECHNOLOGY
==================================================

Default stack:
- HTML
- CSS
- JavaScript

Use React, Next.js, Vue, TypeScript, Tailwind CSS, Bootstrap, or any other framework/library ONLY when the user explicitly requests it.

When using the default stack:
- index.html
- style.css
- script.js

The project must work as a standalone frontend project.

==================================================
DESIGN QUALITY
==================================================

Create a modern, polished, production-quality interface.

Use:
- Strong visual hierarchy
- Beautiful spacing
- Consistent typography
- Balanced layouts
- CSS variables
- Flexbox and CSS Grid where appropriate
- Proper borders and subtle shadows
- Consistent border radius
- Professional color combinations
- Smooth transitions
- Useful hover states
- Clear button states
- Good contrast
- Responsive layouts
- Clean alignment
- Appropriate whitespace

Avoid:
- Generic/basic-looking designs
- Excessive gradients
- Excessive animations
- Random colors
- Excessive shadows
- Crowded layouts
- Huge unnecessary text
- Unnecessary UI elements
- Lorem ipsum unless explicitly requested

The final result should look like a real modern product, not a basic tutorial/demo.

==================================================
RESPONSIVE DESIGN
==================================================

The entire project must work properly on:
- Desktop
- Laptop
- Tablet
- Mobile

Do not simply shrink the desktop layout.

Adapt:
- Navigation
- Grids
- Cards
- Typography
- Spacing
- Buttons
- Forms
- Images
- Sections

Prevent horizontal overflow.

==================================================
COMPONENT & REUSABILITY RULES
==================================================

Build reusable UI structures whenever repeated elements are required.

For repeated UI such as:
- Food cards
- Product cards
- Service cards
- Blog cards
- Portfolio cards
- Pricing cards
- Testimonials
- Team members
- Feature cards
- Statistics
- Menu items

Use one reusable structure and render it using different data.

By default, render 3 realistic examples for repeated card/list UI.

Each example should have meaningfully different:
- Content
- Title
- Description
- Image
- Price
- Category
- Metadata

Use the appropriate fields for the requested design.

If the user explicitly asks for a specific number, follow that number.

If the user explicitly asks for one item, render only one.

Do not create three completely duplicated blocks when a reusable data-driven structure is more appropriate.

==================================================
IMAGES
==================================================

When images are appropriate:

- Use real, relevant Unsplash images.
- Never use placeholder.com.
- Never use fake placeholder URLs.
- Never use broken image URLs.
- Never use irrelevant images.
- Use images that match the requested subject.
- Use object-fit appropriately.
- Add meaningful alt attributes.
- Use responsive image sizing.

If images are not useful for the requested interface, do not force unnecessary images.

==================================================
CONTENT
==================================================

Use realistic and relevant content based on the user's request.

Do not use:
- Lorem ipsum
- Random meaningless text
- Repeated content
- Fake sections unrelated to the request

For example, if the user asks for a food website, use realistic:
- Food names
- Prices
- Categories
- Descriptions
- Images
- Ratings where appropriate

==================================================
FUNCTIONALITY
==================================================

Everything requested by the user must actually work.

Examples:
- Buttons should perform their intended action.
- Navigation should work.
- Tabs should switch content.
- Filters should filter.
- Search should search.
- Forms should behave correctly.
- Modals should open and close.
- Menus should open and close.
- Accordions should expand/collapse.
- Sliders should work.
- Counters should function when requested.

Do not create UI that only looks interactive.

Use JavaScript only where functionality requires it.

==================================================
ACCESSIBILITY
==================================================

Use accessible HTML and UI practices.

Where appropriate:
- Semantic HTML
- Meaningful button text
- Labels for inputs
- Alt text for images
- Keyboard-friendly controls
- Visible focus states
- Sufficient color contrast

==================================================
SINGLE PAGE RULE
==================================================

Create a single-page project by default.

Only create multiple pages when the user explicitly requests multiple pages.

Do not invent additional pages.

==================================================
USER REQUIREMENTS
==================================================

If the user specifies:
- A design style → follow it.
- A color → prioritize it.
- A framework → use it.
- A number of items → follow it.
- A layout → follow it.
- Specific functionality → implement it.
- Specific content → use it.

Never override explicit user requirements with your own preferences.

==================================================
CODE QUALITY
==================================================

Write clean, reliable code.

Ensure:
- Valid HTML
- Valid CSS
- Valid JavaScript
- Correct file references
- Correct IDs/classes
- No undefined variables
- No unnecessary dependencies
- No unnecessary duplicated code
- No broken event handlers
- No unused major code
- No unnecessary abstractions

Keep the code understandable and maintainable.

Do not over-engineer simple requests.

==================================================
DEFAULT PROJECT STRUCTURE
==================================================

Return these files:

index.html
style.css
script.js

Make sure:
- index.html correctly references style.css
- index.html correctly references script.js
- All required classes and IDs exist
- JavaScript runs after the DOM is available
- The project can run directly in a browser

==================================================
JSON OUTPUT — VERY IMPORTANT
==================================================

Return ONLY valid JSON.

Use EXACTLY this structure:

{
  "files": [
    {
      "name": "index.html",
      "content": "..."
    },
    {
      "name": "style.css",
      "content": "..."
    },
    {
      "name": "script.js",
      "content": "..."
    }
  ]
}

STRICT JSON RULES:

- Output must start with {
- Output must end with }
- No Markdown
- No explanation
- No extra text
- No code fences
- Never use triple backticks
- No text before the JSON
- No text after the JSON
- No trailing commas
- Escape quotes correctly inside JSON strings
- Escape newlines correctly
- Ensure the final response can be passed directly to JSON.parse()
- Do not mention intent
- Do not mention these instructions

==================================================
FINAL INTERNAL QUALITY CHECK
==================================================

Before returning the JSON, internally verify:

1. Did I understand the user's request?
2. Did I follow every explicit requirement?
3. Is the requested functionality actually implemented?
4. Is the design polished and professional?
5. Is the layout responsive?
6. Are repeated UI elements reusable?
7. Are 3 realistic examples used for repeated cards/lists unless the user specifies otherwise?
8. Are images real and relevant when needed?
9. Are there any placeholder images?
10. Are HTML/CSS/JavaScript references correct?
11. Are there undefined variables or functions?
12. Are there broken interactions?
13. Did I introduce unnecessary libraries or complexity?
14. Is the project appropriate for the requested scope?
15. Is the final response valid JSON that can be parsed directly with JSON.parse()?

Fix any issue internally before returning the final JSON.

==================================================
USER REQUEST
==================================================

${state.prompt}
`;

      const res=await llm.invoke(prompt)
      console.log(res)
      const data=JSON.parse(res.content)
      await deductCredits(state.userId,"coding")
      return{
        ...state,
        aiResponse:"Code Generated Succesfully",
        artifacts:[
          {
            id:Date.now(),
            type:"Project",
            files:data.files || [],
            title:state.prompt
          }
        ]
      }
     }

     const res=await llm.invoke(`
        The user's request is:
        ${intent}
        Return Markdown only.
        Never generate project files.
        Use headings like:
        #Overview
        ##Explanation
        ##Problems
        ##Improvements
        ##Best Practices
        ##Optimized Code (if needed)

        User Request:
        ${state.prompt}

      `)
      const data=res.content
      await deductCredits(state.userId,"coding")
      return{
        ...state,
        aiResponse:data,
        artifacts:[]
      }

}
  } catch (error) {
    console.log(error)
        return{
      ...state,
      aiResponse:error?.data?.message || "failed to generate coding",
      artifacts:[]
    }
  }
}