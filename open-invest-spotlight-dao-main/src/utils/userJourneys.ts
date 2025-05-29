// Types for user journeys
export type UserType = 'investor' | 'projectOwner' | 'daoMember' | 'communityMember';

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  nextSteps: string[];
}

export interface UserJourney {
  userType: UserType;
  currentStep: string;
  steps: Record<string, JourneyStep>;
  completedSteps: string[];
}

// Journey definitions
const investorJourney: UserJourney = {
  userType: 'investor',
  currentStep: 'discover',
  completedSteps: [],
  steps: {
    discover: {
      id: 'discover',
      title: 'Discover Platform',
      description: 'Browse and explore available projects',
      isCompleted: false,
      nextSteps: ['research'],
    },
    research: {
      id: 'research',
      title: 'Research Projects',
      description: 'Analyze project details and documentation',
      isCompleted: false,
      nextSteps: ['invest'],
    },
    invest: {
      id: 'invest',
      title: 'Make Investment',
      description: 'Connect wallet and complete investment',
      isCompleted: false,
      nextSteps: ['track'],
    },
    track: {
      id: 'track',
      title: 'Track Investment',
      description: 'Monitor investment performance',
      isCompleted: false,
      nextSteps: ['governance'],
    },
    governance: {
      id: 'governance',
      title: 'Participate in Governance',
      description: 'Vote and participate in project decisions',
      isCompleted: false,
      nextSteps: [],
    },
  },
};

const projectOwnerJourney: UserJourney = {
  userType: 'projectOwner',
  currentStep: 'submit',
  completedSteps: [],
  steps: {
    submit: {
      id: 'submit',
      title: 'Submit Project',
      description: 'Create and submit project documentation',
      isCompleted: false,
      nextSteps: ['review'],
    },
    review: {
      id: 'review',
      title: 'Community Review',
      description: 'Project goes through community review process',
      isCompleted: false,
      nextSteps: ['launch'],
    },
    launch: {
      id: 'launch',
      title: 'Launch Campaign',
      description: 'Start fundraising campaign',
      isCompleted: false,
      nextSteps: ['develop'],
    },
    develop: {
      id: 'develop',
      title: 'Project Development',
      description: 'Execute project development plan',
      isCompleted: false,
      nextSteps: ['update'],
    },
    update: {
      id: 'update',
      title: 'Progress Updates',
      description: 'Share regular progress with community',
      isCompleted: false,
      nextSteps: [],
    },
  },
};

const daoMemberJourney: UserJourney = {
  userType: 'daoMember',
  currentStep: 'join',
  completedSteps: [],
  steps: {
    join: {
      id: 'join',
      title: 'Join DAO',
      description: 'Acquire governance tokens and join DAO',
      isCompleted: false,
      nextSteps: ['participate'],
    },
    participate: {
      id: 'participate',
      title: 'Participate in Governance',
      description: 'Engage in DAO governance activities',
      isCompleted: false,
      nextSteps: ['vote'],
    },
    vote: {
      id: 'vote',
      title: 'Vote on Proposals',
      description: 'Review and vote on DAO proposals',
      isCompleted: false,
      nextSteps: ['rewards'],
    },
    rewards: {
      id: 'rewards',
      title: 'Receive Rewards',
      description: 'Earn rewards for participation',
      isCompleted: false,
      nextSteps: [],
    },
  },
};

const communityMemberJourney: UserJourney = {
  userType: 'communityMember',
  currentStep: 'join',
  completedSteps: [],
  steps: {
    join: {
      id: 'join',
      title: 'Join Community',
      description: 'Create profile and join community',
      isCompleted: false,
      nextSteps: ['explore'],
    },
    explore: {
      id: 'explore',
      title: 'Explore Platform',
      description: 'Browse and learn about projects',
      isCompleted: false,
      nextSteps: ['engage'],
    },
    engage: {
      id: 'engage',
      title: 'Engage in Discussions',
      description: 'Participate in community discussions',
      isCompleted: false,
      nextSteps: ['reputation'],
    },
    reputation: {
      id: 'reputation',
      title: 'Build Reputation',
      description: 'Earn reputation through contributions',
      isCompleted: false,
      nextSteps: ['rewards'],
    },
    rewards: {
      id: 'rewards',
      title: 'Earn Rewards',
      description: 'Receive rewards for community participation',
      isCompleted: false,
      nextSteps: [],
    },
  },
};

// Journey manager class
export class JourneyManager {
  private journeys: Record<UserType, UserJourney>;

  constructor() {
    this.journeys = {
      investor: JSON.parse(JSON.stringify(investorJourney)),
      projectOwner: JSON.parse(JSON.stringify(projectOwnerJourney)),
      daoMember: JSON.parse(JSON.stringify(daoMemberJourney)),
      communityMember: JSON.parse(JSON.stringify(communityMemberJourney)),
    };
  }

  getJourney(userType: UserType): UserJourney {
    return this.journeys[userType];
  }

  getCurrentStep(userType: UserType): JourneyStep {
    const journey = this.journeys[userType];
    return journey.steps[journey.currentStep];
  }

  completeStep(userType: UserType, stepId: string): void {
    const journey = this.journeys[userType];
    const step = journey.steps[stepId];

    if (!step) {
      return; // Invalid step, do nothing
    }

    if (step.nextSteps.length > 0) {
      journey.currentStep = step.nextSteps[0];
    }
    step.isCompleted = true;
    journey.completedSteps.push(stepId);
  }

  getProgress(userType: UserType): number {
    const journey = this.journeys[userType];
    const totalSteps = Object.keys(journey.steps).length;
    const completedSteps = journey.completedSteps.length;
    return Math.round((completedSteps / totalSteps) * 100);
  }
}

// Example usage:
/*
const journeyManager = new JourneyManager();

// Get a user's journey
const investorJourney = journeyManager.getJourney('investor');

// Get current step
const currentStep = journeyManager.getCurrentStep('investor');

// Complete a step
journeyManager.completeStep('investor', 'discover');

// Get progress
const progress = journeyManager.getProgress('investor');
*/ 