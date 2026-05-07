/**
 * Example Express.js integration for the Gamification Engine.
 *
 * This file demonstrates:
 *  - Loading user progression state
 *  - Evaluating a gamification event
 *  - Persisting updated state
 *
 * NOTE:
 * This example is intentionally simplified.
 * Database queries are represented as placeholders.
 */

import { evaluateGamification } from "../src/index.js";

// Example achievement definitions (provided by host app)
const achievements = [
  {
    key: "DAILY_ACTIVITY",
    type: "daily",
    title: "Daily Momentum",
    description: "Complete a goal today",
    criteria: {
      type: "event",
      event: "GOAL_COMPLETED"
    },
    xp: 10
  },
  {
    key: "GOAL_COMPLETION",
    type: "progressive",
    title: "Goal Getter",
    description: "Complete goals to progress",
    criteria: {
      type: "counter",
      event: "GOAL_COMPLETED"
    },
    tiers: [
      { threshold: 1, xp: 50, label: "First Step" },
      { threshold: 10, xp: 200, label: "Getting Serious" }
    ]
  }
];

// Example route handler
export async function completeGoal(req, res) {
  const userId = req.user.id;
  const today = new Date();

  // 1. Load user state from persistence layer
  const userState = {
    userId,
    totalXp: 120,
    counters: {
      GOAL_COMPLETED: 5
    },
    achievements: {
      DAILY_ACTIVITY: {
        completedTiers: [],
        lastCompletedDate: null
      },
      GOAL_COMPLETION: {
        completedTiers: [1],
        lastCompletedDate: null
      }
    }
  };

  // 2. Increment counters BEFORE evaluation
  userState.counters.GOAL_COMPLETED =
    (userState.counters.GOAL_COMPLETED || 0) + 1;

  // 3. Evaluate gamification
  const result = evaluateGamification({
    userState,
    event: { type: "GOAL_COMPLETED" },
    achievements,
    today
  });

  // 4. Persist updated state (pseudo‑code)
  // await saveUserState(userState);

  // 5. Return feedback to frontend
  res.json({
    success: true,
    gamification: result
  });
}