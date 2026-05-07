/**
 * Calculate user level using quadratic XP progression.
 *
 * XP required for next level:
 *   baseXP * (level)^2
 *
 * Level 1 starts at 0 XP.
 * 
 * baseXP = Base XP Scaling Constant
 */

// Defaults to 50 (customisable)
export function calculateLevel(totalXp, baseXp = 50) {

    // Initialise at Level 1 with 0 XP
    let level = 1;
    let xpGained = 0;

    while (true) {
        // Calculated based on quadratic formula (baseXP * (level)^2)
        const xpForNextLevel = baseXp * Math.pow(level, 2);

        // If the user doesn't have enough XP earned to go to the next level, stop
        if (totalXp < xpGained + xpForNextLevel) {
            break;
        }

        // Add XP Gained to the XP Amount Needed for the Next Level and Increase Level By 1
        xpGained += xpForNextLevel;
        level++;
    }

    return level;
}

export function xpForNextLevel(level, baseXp = 50) {
  return baseXp * Math.pow(level, 2);
}