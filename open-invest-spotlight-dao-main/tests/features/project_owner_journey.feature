Feature: Project Owner Journey
  As a project owner
  I want to submit, launch, and develop my project
  So that I can receive funding and engage with the community

  Background:
    Given I am a registered project owner
    And I have prepared my project documentation

  Scenario: Submitting a project
    When I create my project profile
    And I upload project documentation
    And I set funding goals
    And I define tokenomics
    Then my project should be submitted for review
    And I should receive a submission confirmation

  Scenario: Going through the review process
    Given my project is under review
    When the community provides feedback
    And the technical review is conducted
    And due diligence is performed
    And the approval voting takes place
    Then I should be notified of the review outcome
    And I should receive detailed feedback if rejected

  Scenario: Launching the campaign
    Given my project is approved
    When I prepare marketing materials
    And I engage with the community
    And I conduct investor outreach
    And I host AMA sessions
    Then my campaign should be visible to potential investors
    And I should be able to track campaign metrics

  Scenario: Managing project development
    Given my project is funded
    When I provide regular updates
    And I track milestones
    And I collect community feedback
    And I participate in governance
    Then I should maintain transparency with investors
    And I should be able to demonstrate progress 