// Check Criteria Depending on the Achievement Type
export function matchesCriteria(criteria, userState, event) {
  
    switch (criteria.type) {

    // Achievements that have to reach a certain number / completed multiple times e.g. Completed Goals = 10 (Check count of current user state vs criteria count)
    case "counter":
      return userState.counters[event.type] || 0;

    // Achievements that are triggered by a particular event e.g. logging in (Check event result vs criteria to mark event as completed)
    case "event":
      return event.type === criteria.event;

    // Level Up - Check Total XP
    case "total":
      return userState.totalXp;

    // If criteria for goal doesn't match any of the above options return error feedback
    default:
      throw new Error(`Unknown criteria type: ${criteria.type}`);
  }
}