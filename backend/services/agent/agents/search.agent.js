import { checkAgentLimit } from "../config/agentLimit.js"
import { searchTool } from "../config/tavily.js"
import { deductCredits } from "../utils/deductCredits.js"

export const searchAgent = async (state) => {
 try {
    await checkAgentLimit(state.userId,"search")
   const results=await searchTool.invoke({
    query:state.prompt
   })
   await deductCredits(state.userId,"search")
   console.log(results)
   
    let safeResults = results;
    if (Array.isArray(results)) {
        safeResults = results.slice(0, 3).map(item => ({
            ...item,
            content: item.content ? item.content.substring(0, 800) + "..." : ""
        }));
    } else if (typeof results === "string") {
        safeResults = results.substring(0, 3000) + "...";
    }
    
    return {
      ...state,
      searchResults: safeResults, 
      images: results.images || [] }

   // return{
   //  ...state,
   //   searchResults:results,
   //    images:results.images 
   //   }
    }
  catch (error) {
    console.log(error)
        return{
      ...state,
      searchResults:[],
      images:[],
      aiResponse:error?.data?.message || "failed to search"
    }
 } 
}