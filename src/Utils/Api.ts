// api.ts

import axios from "axios";

// Base URL for API endpoints
const BASE_URL = "https://voyegerz.pythonanywhere.com";

// Function to fetch questions for assessment 1st endpoint
export async function fetchAssessmentQuestions(): Promise<string[]> {
  try {
    const response = await axios.get(`${BASE_URL}/ask_question`);
    if (response.status === 200) {
      // Assuming the API returns an array of questions as strings
      return response.data;
    }
    throw new Error("Failed to fetch assessment questions");
  } catch (error) {
    throw new Error("Failed to fetch assessment questions");
  }
}

// Function to process assessment results and obtain classification 2nd endpoint
export async function processAssessmentResults(
  results: string
): Promise<string> {
  try {
    // Assuming the API endpoint for processing responses is correct
    const response = await axios.post(`${BASE_URL}/process_response`, {
      response: results,
    });

    return response.data.constitution;
  } catch (error) {
    throw new Error("Failed to process assessment results");
  }
}

// Function to fetch responses for user questions 3rd endpoint
export async function fetchUserResponse(userInput: string): Promise<string> {
  try {
    const response = await axios.post(`${BASE_URL}/predict`, {
      user_input: userInput,
    });

    if (response.status === 200) {
      // Assuming the API returns a response string
      return response.data.response;
    }
    throw new Error("Failed to fetch user response");
  } catch (error) {
    throw new Error("Failed to fetch user response");
  }
}

// Function to calculate the percentages of vata, pitta, and kapha
export function calculatePercentages(classification: string[]): {
  vata: number;
  pitta: number;
  kapha: number;
} {
  const total = classification.length;
  const vataCount = classification.filter((type) => type === "Vata").length;
  const pittaCount = classification.filter((type) => type === "Pitta").length;
  const kaphaCount = classification.filter((type) => type === "Kapha").length;

  const vataPercentage = (vataCount / total) * 100;
  const pittaPercentage = (pittaCount / total) * 100;
  const kaphaPercentage = (kaphaCount / total) * 100;

  return {
    vata: vataPercentage,
    pitta: pittaPercentage,
    kapha: kaphaPercentage,
  };
}
