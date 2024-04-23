import { useState, cloneElement, ReactElement } from 'react';

export const useMultiStepForm = (
  steps: ReactElement[],
  register: any,
  errors: any,
  next: any,
  watch: Function,
  getValues: Function
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const goBack = () => {
    setCurrentStepIndex((index) => {
      if (index >= steps.length - 1) return index;
      return index + 1;
    });
  };
  const goNext = () => {
    setCurrentStepIndex((index) => {
      if (index <= 0) {
        return 0;
      }
      return index - 1;
    });
  };
  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    step: cloneElement(steps[currentStepIndex], {
      register: register,
      errors: errors,
      next: next,
      watch: watch,
      getValues: getValues
    }),
    steps,
    goTo,
    isCompleted,
    setIsCompleted,
    goBack,
    goNext,
  };
};
