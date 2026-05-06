# Gamification Engine (JavaScript)

A backend‑driven, event‑based gamification engine for awarding **XP, levels, and achievements** in non‑game applications.

This library was developed as part of the [Stellara Personal Development Platform](https://github.com/Sarahw54545/fyp-gamified-personal-development-app) and is designed to be **framework‑agnostic**, reusable, and resistant to common progression exploits.

---

## ✨ Features

- Event‑based gamification evaluation
- Daily and progressive achievements
- XP‑driven level progression
- Backend‑authoritative logic (no frontend duplication)
- Calendar‑safe daily achievement handling
- Framework‑agnostic (Express, Fastify, etc.)

---

## 🧠 Design Philosophy

This engine is designed around the principle that **gamification logic should live on the backend**, not the frontend.

Key goals:
- Single source of truth for progression
- Prevent client‑side exploitation
- Support consistent behaviour across triggers
- Allow future rebalancing without UI changes

The engine evaluates user actions as **events** and updates progression state accordingly.

---

## 📦 Installation

```bash
npm install gamification-engine-js
```

## 🔧 Core Concepts

### Events

Gamification is triggered by discrete events, such as:
- `LOGIN_SUCCESS`
- `GOAL_CREATED`
- `GOAL_COMPLETED`

These events are passed into the engine along with the user’s current progression state.

---

### User State

The engine operates on a `userState` object provided by the host application.

This object represents the user’s current progression and includes:
- User identifier
- Total XP
- Activity counters
- Achievement completion state

The engine mutates this state, and the host application is responsible for persisting it.

---

## 🏆 Achievement Definitions

Achievements are defined declaratively and evaluated centrally.

Each achievement specifies:
- A unique key
- Type (`daily` or `progressive`)
- Title and description
- Triggering event
- XP reward

Daily achievements are restricted to one unlock per calendar day, while progressive achievements unlock across tiered thresholds.

---

## 🛡️ Daily Achievement Safety

Daily achievements are evaluated using **calendar‑day comparison**, rather than timestamps, to ensure:
- One unlock per day
- Timezone‑safe behaviour
- Idempotent evaluation

This prevents common issues such as duplicate daily unlocks or time‑based drift.

---

## 🧪 Persistence Responsibility

This library is **stateless** and does not persist data.

The host application is responsible for:
- Loading user progression state
- Invoking the gamification engine
- Persisting updated counters, achievements, and XP

This design keeps the engine:
- Framework‑agnostic
- Testable
- Easy to integrate into existing systems

---

## 📚 Example Integration

An example Express.js integration is provided in the `examples` directory, demonstrating:
- Loading user state from a database
- Evaluating gamification events
- Persisting updated progression state

---

## 🔗 Used In

- **Stellara – Gamified Personal Development App**  
  https://github.com/Sarahw54545/fyp-gamified-personal-development-app

---

## 🛠️ Roadmap

Planned enhancements include:
- Unit test coverage
- TypeScript definitions
- Configurable XP curves
- Optional streak‑based mechanics

---

## 👩‍💻 Author

**Sarah Walsh**  
BSc (Hons) Creative Computing  
Final Year Project – 2026  

---

## 📄 License

MIT
