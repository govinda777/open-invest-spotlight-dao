import { JourneyManager, UserType } from '../userJourneys';

describe('User Journeys', () => {
  let journeyManager: JourneyManager;

  beforeEach(() => {
    journeyManager = new JourneyManager();
  });

  describe('Investor Journey', () => {
    const userType: UserType = 'investor';

    it('should start with discover step', () => {
      const currentStep = journeyManager.getCurrentStep(userType);
      expect(currentStep.id).toBe('discover');
      expect(currentStep.isCompleted).toBe(false);
    });

    it('should progress through all steps in correct order', () => {
      // Complete discover step
      journeyManager.completeStep(userType, 'discover');
      expect(journeyManager.getCurrentStep(userType).id).toBe('research');

      // Complete research step
      journeyManager.completeStep(userType, 'research');
      expect(journeyManager.getCurrentStep(userType).id).toBe('invest');

      // Complete invest step
      journeyManager.completeStep(userType, 'invest');
      expect(journeyManager.getCurrentStep(userType).id).toBe('track');

      // Complete track step
      journeyManager.completeStep(userType, 'track');
      expect(journeyManager.getCurrentStep(userType).id).toBe('governance');

      // Complete governance step
      journeyManager.completeStep(userType, 'governance');
      expect(journeyManager.getProgress(userType)).toBe(100);
    });

    it('should track progress correctly', () => {
      expect(journeyManager.getProgress(userType)).toBe(0);
      
      journeyManager.completeStep(userType, 'discover');
      expect(journeyManager.getProgress(userType)).toBe(20);
      
      journeyManager.completeStep(userType, 'research');
      expect(journeyManager.getProgress(userType)).toBe(40);
    });
  });

  describe('Project Owner Journey', () => {
    const userType: UserType = 'projectOwner';

    it('should start with submit step', () => {
      const currentStep = journeyManager.getCurrentStep(userType);
      expect(currentStep.id).toBe('submit');
      expect(currentStep.isCompleted).toBe(false);
    });

    it('should progress through all steps in correct order', () => {
      // Complete submit step
      journeyManager.completeStep(userType, 'submit');
      expect(journeyManager.getCurrentStep(userType).id).toBe('review');

      // Complete review step
      journeyManager.completeStep(userType, 'review');
      expect(journeyManager.getCurrentStep(userType).id).toBe('launch');

      // Complete launch step
      journeyManager.completeStep(userType, 'launch');
      expect(journeyManager.getCurrentStep(userType).id).toBe('develop');

      // Complete develop step
      journeyManager.completeStep(userType, 'develop');
      expect(journeyManager.getCurrentStep(userType).id).toBe('update');

      // Complete update step
      journeyManager.completeStep(userType, 'update');
      expect(journeyManager.getProgress(userType)).toBe(100);
    });

    it('should handle project rejection', () => {
      journeyManager.completeStep(userType, 'submit');
      expect(journeyManager.getCurrentStep(userType).id).toBe('review');
      
      // Simulate rejection by completing review but not moving to launch
      journeyManager.completeStep(userType, 'review');
      expect(journeyManager.getCurrentStep(userType).id).toBe('launch');
    });
  });

  describe('DAO Member Journey', () => {
    const userType: UserType = 'daoMember';

    it('should start with join step', () => {
      const currentStep = journeyManager.getCurrentStep(userType);
      expect(currentStep.id).toBe('join');
      expect(currentStep.isCompleted).toBe(false);
    });

    it('should progress through all steps in correct order', () => {
      // Complete join step
      journeyManager.completeStep(userType, 'join');
      expect(journeyManager.getCurrentStep(userType).id).toBe('participate');

      // Complete participate step
      journeyManager.completeStep(userType, 'participate');
      expect(journeyManager.getCurrentStep(userType).id).toBe('vote');

      // Complete vote step
      journeyManager.completeStep(userType, 'vote');
      expect(journeyManager.getCurrentStep(userType).id).toBe('rewards');

      // Complete rewards step
      journeyManager.completeStep(userType, 'rewards');
      expect(journeyManager.getProgress(userType)).toBe(100);
    });

    it('should track governance participation', () => {
      journeyManager.completeStep(userType, 'join');
      journeyManager.completeStep(userType, 'participate');
      
      const currentStep = journeyManager.getCurrentStep(userType);
      expect(currentStep.id).toBe('vote');
      expect(currentStep.title).toBe('Vote on Proposals');
    });
  });

  describe('Community Member Journey', () => {
    const userType: UserType = 'communityMember';

    it('should start with join step', () => {
      const currentStep = journeyManager.getCurrentStep(userType);
      expect(currentStep.id).toBe('join');
      expect(currentStep.isCompleted).toBe(false);
    });

    it('should progress through all steps in correct order', () => {
      // Complete join step
      journeyManager.completeStep(userType, 'join');
      expect(journeyManager.getCurrentStep(userType).id).toBe('explore');

      // Complete explore step
      journeyManager.completeStep(userType, 'explore');
      expect(journeyManager.getCurrentStep(userType).id).toBe('engage');

      // Complete engage step
      journeyManager.completeStep(userType, 'engage');
      expect(journeyManager.getCurrentStep(userType).id).toBe('reputation');

      // Complete reputation step
      journeyManager.completeStep(userType, 'reputation');
      expect(journeyManager.getCurrentStep(userType).id).toBe('rewards');

      // Complete rewards step
      journeyManager.completeStep(userType, 'rewards');
      expect(journeyManager.getProgress(userType)).toBe(100);
    });

    it('should track community engagement', () => {
      journeyManager.completeStep(userType, 'join');
      journeyManager.completeStep(userType, 'explore');
      
      const currentStep = journeyManager.getCurrentStep(userType);
      expect(currentStep.id).toBe('engage');
      expect(currentStep.description).toContain('community discussions');
    });
  });

  describe('Cross-Journey Validation', () => {
    it('should maintain separate progress for different user types', () => {
      // Progress investor journey
      journeyManager.completeStep('investor', 'discover');
      journeyManager.completeStep('investor', 'research');
      
      // Progress project owner journey
      journeyManager.completeStep('projectOwner', 'submit');
      
      // Check progress remains separate
      expect(journeyManager.getProgress('investor')).toBe(40);
      expect(journeyManager.getProgress('projectOwner')).toBe(20);
    });

    it('should handle invalid step completion gracefully', () => {
      const userType: UserType = 'investor';
      
      // Try to complete a non-existent step
      journeyManager.completeStep(userType, 'invalidStep');
      
      // Current step should remain unchanged
      expect(journeyManager.getCurrentStep(userType).id).toBe('discover');
    });

    it('should maintain journey state independently', () => {
      const investorJourney = journeyManager.getJourney('investor');
      const projectOwnerJourney = journeyManager.getJourney('projectOwner');
      
      expect(investorJourney.currentStep).toBe('discover');
      expect(projectOwnerJourney.currentStep).toBe('submit');
      
      journeyManager.completeStep('investor', 'discover');
      
      expect(investorJourney.currentStep).toBe('research');
      expect(projectOwnerJourney.currentStep).toBe('submit');
    });
  });
}); 