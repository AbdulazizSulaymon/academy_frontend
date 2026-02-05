import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import {
  Test,
  Question,
  UserTestResult,
  TestStatus,
  QuestionType,
  UserAnswerInput,
} from '@src/api/academy-types';

// ============================================================
// HOOKS FOR TEST SYSTEM
// ============================================================

export interface UseTestOptions {
  onSuccess?: (result: UserTestResult) => void;
  onError?: (error: Error) => void;
}

// Start a new test attempt
export const useStartTest = (options: UseTestOptions = {}) => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ testId, userId }: { testId: string; userId: string }) => {
      // Get previous attempts count
      const { data: previousAttempts } = await api.apis.UserTestResult.findMany({
        where: { testId, userId },
      });

      const attemptNumber = (previousAttempts?.data?.data?.length || 0) + 1;

      // Create new test result
      const { data } = await api.apis.UserTestResult.createOne({
        data: {
          userId,
          testId,
          attemptNumber,
          status: 'IN_PROGRESS',
          score: 0,
          correctAnswers: 0,
          totalQuestions: 0,
          points: 0,
          passed: false,
        },
      });

      return data;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['user-test-results'] });
      options.onSuccess?.(result);
    },
    onError: options.onError,
  });
};

// Submit answer to a question
export const useSubmitAnswer = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userTestResultId,
      questionId,
      selectedOptions,
      textAnswer,
      timeSpent,
    }: {
      userTestResultId: string;
      questionId: string;
      selectedOptions?: string[];
      textAnswer?: string;
      timeSpent?: number;
    }) => {
      // Check if answer already exists
      const { data: existingAnswer } = await api.apis.UserAnswer.findOne({
        where: {
          userTestResultId_questionId: {
            userTestResultId,
            questionId,
          },
        },
      });

      const answerData = {
        userTestResultId,
        questionId,
        selectedOptions: selectedOptions ? JSON.stringify(selectedOptions) : undefined,
        textAnswer,
        timeSpent,
        isCorrect: undefined, // Will be calculated by backend
        pointsEarned: 0, // Will be calculated by backend
      };

      if (existingAnswer?.data) {
        // Update existing answer
        const { data } = await api.apis.UserAnswer.updateOne({
          where: { id: existingAnswer.data.id },
          data: answerData,
        });
        return data;
      } else {
        // Create new answer
        const { data } = await api.apis.UserAnswer.createOne({
          data: answerData,
        });
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-answers'] });
    },
  });
};

// Submit complete test
export const useSubmitTest = (options: UseTestOptions = {}) => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userTestResultId }: { userTestResultId: string }) => {
      // Calculate results (backend will handle this)
      const { data } = await api.instance.post('/api/test/submit', {
        userTestResultId,
      });

      return data;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['user-test-results'] });
      queryClient.invalidateQueries({ queryKey: ['user-test-result', result.id] });
      options.onSuccess?.(result);
    },
    onError: options.onError,
  });
};

// Custom hook for taking a test
export const useTestTaking = (testId: string, userId: string, enabled = true) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string[]>>(new Map());
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const api = useApi();

  // Fetch test with questions
  const { data: testData, isLoading: isLoadingTest } = useQuery({
    queryKey: ['test', testId],
    queryFn: async () => {
      const { data } = await api.apis.Test.findOne({
        where: { id: testId },
        include: {
          questions: {
            include: {
              options: {
                orderBy: { order: 'asc' },
              },
            },
            orderBy: { order: 'asc' },
          },
        },
      });
      return data;
    },
    enabled: enabled && !!testId,
  });

  // Fetch current attempt or start new one
  const { data: currentResult, isLoading: isLoadingResult } = useQuery({
    queryKey: ['current-test-attempt', testId, userId],
    queryFn: async () => {
      const { data } = await api.apis.UserTestResult.findFirst({
        where: {
          testId,
          userId,
          status: 'IN_PROGRESS',
        },
        orderBy: { attemptNumber: 'desc' },
      });
      return data;
    },
    enabled: enabled && !!testId && !!userId,
  });

  const test = testData?.data as Test;
  const questions = test?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Initialize timer
  useEffect(() => {
    if (test?.duration && currentResult?.data) {
      const startedAt = new Date(currentResult.data.startedAt).getTime();
      const durationMs = test.duration * 60 * 1000;
      const endTime = startedAt + durationMs;
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(remaining);
    }
  }, [test?.duration, currentResult?.data]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Auto-submit when time expires
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, isSubmitted]);

  // Save answer
  const saveAnswer = useCallback(
    async (questionId: string, selectedOptions: string[]) => {
      setAnswers((prev) => new Map(prev).set(questionId, selectedOptions));

      if (currentResult?.data) {
        // Save to backend
        await fetch('/api/user-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userTestResultId: currentResult.data.id,
            questionId,
            selectedOptions,
          }),
        });
      }
    },
    [currentResult?.data],
  );

  // Navigate questions
  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [questions.length]);

  // Submit test
  const { mutate: submitTest, isPending: isSubmitting } = useSubmitTest({
    onSuccess: () => {
      setIsSubmitted(true);
    },
  });

  const handleSubmit = useCallback(() => {
    if (currentResult?.data) {
      submitTest({ userTestResultId: currentResult.data.id });
    }
  }, [currentResult?.data, submitTest]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Check if question is answered
  const isQuestionAnswered = (questionId: string) => {
    return answers.has(questionId);
  };

  // Get answered count
  const answeredCount = answers.size;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return {
    // Data
    test,
    questions,
    currentQuestion,
    currentQuestionIndex,
    currentResult: currentResult?.data,
    answers,

    // Computed
    answeredCount,
    progress,
    timeRemaining,
    isSubmitted,

    // Loading states
    isLoading: isLoadingTest || isLoadingResult,
    isSubmitting,

    // Actions
    saveAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    goToQuestion,
    handleSubmit,

    // Helpers
    formatTime,
    isQuestionAnswered,
  };
};

// Hook to get user's test history
export const useTestHistory = (userId: string, testId?: string) => {
  const api = useApi();

  return useQuery({
    queryKey: ['test-history', userId, testId],
    queryFn: async () => {
      const { data } = await api.apis.UserTestResult.findMany({
        where: {
          userId,
          ...(testId && { testId }),
        },
        include: {
          test: true,
        },
        orderBy: { startedAt: 'desc' },
      });
      return data;
    },
    enabled: !!userId,
  });
};

// Hook to get test results by ID
export const useTestResult = (resultId: string, enabled = true) => {
  const api = useApi();

  return useQuery({
    queryKey: ['user-test-result', resultId],
    queryFn: async () => {
      const { data } = await api.apis.UserTestResult.findOne({
        where: { id: resultId },
        include: {
          test: {
            include: {
              questions: {
                include: {
                  options: true,
                },
              },
            },
          },
          answers: {
            include: {
              question: {
                include: {
                  options: true,
                },
              },
            },
          },
        },
      });
      return data;
    },
    enabled: enabled && !!resultId,
  });
};
