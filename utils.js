export function isSameDay(dateA, dateB) {
  if (!dateA || !dateB) return false;

  const a = new Date(dateA);
  const b = new Date(dateB);

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}



// If a particular achievement doesnt have a state, assign an empty state object
export function ensureAchievementState(state, key) {
  if (!state.achievements[key]) {
    state.achievements[key] = {
      completedTiers: [],
      lastCompletedDate: null
    };
  }
}
