Feature: Investor Journey
  As an investor
  I want to discover, research, and invest in projects
  So that I can grow my portfolio and participate in project governance

  Background:
    Given I am on the platform homepage
    And I have a cryptocurrency wallet

  Scenario: Discovering and browsing projects
    When I browse featured projects
    And I view project categories
    Then I should see a list of available projects
    And each project should display basic information

  Scenario: Researching a project
    Given I have selected a project to research
    When I read the project documentation
    And I review the team information
    And I analyze the financial projections
    And I check community engagement
    Then I should have enough information to make an investment decision

  Scenario: Making an investment
    Given I have decided to invest in a project
    When I connect my cryptocurrency wallet
    And I select an investment amount
    And I review the terms and conditions
    And I complete the investment transaction
    Then my investment should be recorded
    And I should receive a confirmation

  Scenario: Tracking investment and participating in governance
    Given I have made an investment
    When I track my investment performance
    And I receive regular updates
    And I participate in project governance
    And I access exclusive content
    Then I should be able to monitor my investment progress
    And I should have voting rights in project decisions 