Feature: DAO Member Journey
  As a DAO member
  I want to participate in governance and shape the platform's future
  So that I can contribute to the community and earn rewards

  Background:
    Given I have purchased governance tokens
    And I have completed verification

  Scenario: Entering the DAO
    When I join community channels
    And I review governance rules
    Then I should have access to governance features
    And I should be able to participate in discussions

  Scenario: Participating in governance
    Given I am an active DAO member
    When I review proposals
    And I participate in discussions
    And I cast my votes
    And I submit new proposals
    Then my votes should be recorded
    And my proposals should be visible to other members

  Scenario: Making community impact
    When I help shape platform direction
    And I influence project selection
    And I contribute to improvements
    And I earn rewards
    Then I should see my impact reflected in platform changes
    And I should receive my earned rewards

  Scenario: Tracking governance activities
    Given I have participated in governance
    When I view my voting history
    And I check my proposal success rate
    And I review my community impact
    And I track my reward earnings
    Then I should have a complete record of my activities
    And I should see my accumulated rewards 