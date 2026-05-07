import { matchesCriteria } from "./criteria.js";
import { ensureAchievementState, isSameDay } from "./utils.js";

export function evaluateGamification({
    userState,
    event,
    achievements,
    today
}) {

    // Initialise local variables to track progress from evaluation cycle
    let xpAwarded = 0;
    const unlockedAchievements = [];
    const progressedAchievements = [];

    // For each achievement
    achievements.forEach((achievement) => {

        // Read current user state for each achievement - If it doesn't already have a user state: create an empty state using ensureAchievementState Util, if it does have a user state: read state progress
        ensureAchievementState(userState, achievement.key);

        // Achievement State = Current user state at the point of reading the userState value
        const achievementState = userState.achievements[achievement.key];

        // -------------------------
        // Daily Achievements - Daily Event Check (Will Only Update Once Per Calendar Day)
        // -------------------------

        if (achievement.type === "daily") {

            const alreadyCompletedToday = achievementState.lastCompletedDate && isSameDay(achievementState.lastCompletedDate, today);

            if (alreadyCompletedToday) {
                return;
            }

            if (matchesCriteria(achievement.criteria, userState, event)) {

                const previousDate = achievementState.lastCompletedDate;
                achievementState.lastCompletedDate = new Date(today);

                userState.totalXp += achievement.xp;
                xpAwarded += achievement.xp;

                unlockedAchievements.push({
                    key: achievement.key,
                    xp: achievement.xp,
                    type: "daily"
                });
            }
        }

        // -------------------------
        // Progressive Achievements
        // -------------------------
        if (achievement.type === "progressive") {

            // Read current value of the counter for the achievement
            const currentValue = matchesCriteria(achievement.criteria, userState, event);

            // Check which tiers have already been completed to prevent awarding XP twice
            achievementState.completedTiers = achievementState.completedTiers || [];

            // For each tier (that hasnt already been completed)
            achievement.tiers.forEach((tier) => {
                // If the current value is above the tier threshold and the tier is not included in the completed tiers, add awarded XP amount + trigger completed event
                if (
                    currentValue >= tier.threshold && !achievementState.completedTiers.includes(tier.threshold)
                ) {
                    achievementState.completedTiers.push(tier.threshold);
                    userState.totalXp += tier.xp;
                    xpAwarded += tier.xp;

                    unlockedAchievements.push({
                        key: achievement.key,
                        tier: tier.threshold,
                        label: tier.label,
                        xp: tier.xp
                    });
                }
            });

            // Check next tier progress
            const nextTier = achievement.tiers.find(
                (tier) => !achievementState.completedTiers.includes(tier.threshold)
            );


            if (nextTier) {
                progressedAchievements.push({
                    key: achievement.key,
                    currentValue: userState.counters[achievement.criteria.event] || 0,
                    nextThreshold: nextTier.threshold
                });
            }
        }
    });

    return {
        xpAwarded,
        totalXp: userState.totalXp,
        unlockedAchievements,
        progressedAchievements
    };
}