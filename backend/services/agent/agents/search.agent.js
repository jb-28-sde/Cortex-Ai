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
    
    try {
        if (results && Array.isArray(results.results)) {
            safeResults = results.results.slice(0, 3).map(item => ({
                title: item.title,
                content: item.content ? String(item.content).substring(0, 800) + "..." : ""
            }));
        } 
        else if (Array.isArray(results)) {
            safeResults = results.slice(0, 3).map(item => ({
                ...item,
                content: item.content ? String(item.content).substring(0, 800) + "..." : ""
            }));
        } 
        else {
            let textData = typeof results === "string" ? results : JSON.stringify(results);
            safeResults = textData.substring(0, 2500) + "...";
        }
    } catch (err) {
        console.log("Trimming error:", err);
        safeResults = "Details found but text was too large to process.";
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