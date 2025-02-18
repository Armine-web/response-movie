class QuizApi {
    constructor() {
      this.baseUrl = "http://localhost:3001";
    }
  
    async getQuestions() {
      try {
        const response = await fetch(
          `${this.baseUrl}/questions`
        );
        const data = await response.json();
        return {
          success: response.status === 200,
          data,
          error: response.status !== 200 ? response.error: null,
        };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    }

  }
  
  export const quizApi = new QuizApi();
  
  