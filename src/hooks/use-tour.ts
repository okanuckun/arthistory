import { useState, useEffect, useCallback } from 'react';

const TOUR_KEY = 'arthistory_tour_completed';

export interface TourStep {
  target: string;        // CSS selector
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const useTour = (steps: TourStep[]) => {
  const [active, setActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const done = localStorage.getItem(TOUR_KEY);
    if (!done) {
      // Delay so DOM settles
      const timer = setTimeout(() => setActive(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const next = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finish();
    }
  }, [currentStep, steps.length]);

  const prev = useCallback(() => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  const finish = useCallback(() => {
    setActive(false);
    setCurrentStep(0);
    localStorage.setItem(TOUR_KEY, 'true');
  }, []);

  const restart = useCallback(() => {
    localStorage.removeItem(TOUR_KEY);
    setCurrentStep(0);
    setActive(true);
  }, []);

  return { active, currentStep, step: steps[currentStep], totalSteps: steps.length, next, prev, finish, restart };
};
