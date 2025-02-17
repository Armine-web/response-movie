class QuizApi {
    constructor() {
      this.baseUrl = "http://localhost:3001/questions";
    }
  
    async getQuestions() {
      try {
        const response = await fetch(
          `${this.baseUrl}/questions`
        );
        const data = await response.json();
        return {
          success: data.state === 200,
          data,
          error: data.state !== 200 ? data.error.message : null,
        };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    }

  }
  
  export const quizApi = new QuizApi();
  
  