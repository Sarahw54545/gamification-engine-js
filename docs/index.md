# Gamification Engine (JavaScript)

A backend-driven, event-based gamification engine for awarding **XP, levels, and achievements** in non-game applications.

This engine was originally developed for the **Stellara** personal development platform and has been extracted into a reusable framework designed to be **framework-agnostic**, scalable, and safe for production use.

---

## ✨ What This Engine Does

The gamification engine evaluates user actions as **events** and determines:

- Which achievements are unlocked
- How much XP is awarded
- How a user progresses toward future milestones

All progression logic is handled on the **backend**, making the system resistant to client-side manipulation and easy to rebalance over time.

---

## 🧠 Core Concepts

### Events

The engine reacts to discrete events emitted by the host application, such as:

- `LOGIN_SUCCESS`
- `GOAL_CREATED`
- `GOAL_COMPLETED`

Each event is evaluated against a set of achievement rules provided by the host application.

---

### User State

The host application provides the user’s current progression state, including:

- Total XP
- Activity counters
- Achievement completion state

The engine mutates this state in-memory and returns a summary of progression updates.  
Persistence is intentionally handled **outside** the engine.

---

### Achievement Definitions

Achievements are defined declaratively by the host application and passed into the engine at runtime.

Supported types include:
- **Daily achievements** – unlock once per calendar day
- **Progressive achievements** – unlock across tiered thresholds

This approach allows full control over gamification rules without modifying engine code.

---

## 🔁 Evaluation Flow

A typical evaluation cycle looks like this:

1. The host application updates relevant counters
2. An event is emitted (e.g. goal completed)
3. The engine evaluates progression rules
4. XP and achievement state are updated
5. A progression summary is returned for UI feedback

---

## 📚 Example Integration

An example Express.js integration is included in the repository to demonstrate how the engine is intended to be used from a backend route.

This example shows:
- Loading user state
- Incrementing counters
- Evaluating a gamification event
- Persisting updated progression state

See:  
`examples/express-integration.js`

---

## 🧩 Used In

- **Stellara – Gamified Personal Development App**  
  https://github.com/Sarahw54545/fyp-gamified-personal-development-app

---

## 🛠️ Roadmap

Planned future enhancements include:
- Expanded unit test coverage
- Configurable XP curves
- Optional streak-based mechanics
- TypeScript-first build

---

## 👩‍💻 Author

**Sarah Walsh**  
BSc (Hons) Creative Computing  
Final Year Project – 2026  

---

## 📄 License

MIT