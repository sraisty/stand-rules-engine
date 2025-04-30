# Sue Raisty – Stand Insurance Take-Home Submission

**Name:** Sue Raisty  
**Email:** <sraisty@gmail.com>  


I wanna work at Stand.  I like what you do, it ties in nicely with my experience in disaster mitigation from OneConcern.  So please give me an offer, okay?  (Unlike a lot of this assignment, this statement is not AI generated).

NOTES:
 I thought deeply about this assignment all week, but I implemented it in a mega-burst on Tuesday, 4/29, starting at around 10:30am - 11am, with a 1hr break, and then 12pm - 4:15pm.  Total: 4 hr 45 min.



 I based it on top of my standard nextjs-sample-repo, that I use all the time.

I didn't finish everything I hoped to:
* I wanted to test the rules more carefully and make sure that they were flexible.
* I wanted to add a persistent data store for the rules and properties
* I wanted to add in an overall property score based on totals from all the various vulnerabilities and mitigations, but that is a bit more sophisticated than this can currently handle.

* I knew I wasn't going to get to endpoints for DELETE / PUT (update).
* I knew I also knew that I was not going to get to a form-based UI for entering observations, nor a nice UI to display the vulnerabilities and mitigations.
* Rule conflict resolution logic
* Rule grouping (regional, structural, vegetation, etc.)
* Multi-observation evaluation history
* Editable rule priorities or weights
* This README is a bit of a mess. I wanted to write a more clear document about the requirements, architecture and implementaiton.
* Dynamic rules on't support Logic (AND / OR / NOT) or transform functions that can use observations as inputs, transform into intermediate values and then evaluate
* No schema validation on Rule Input right now - ran out of time.
* No "saving" the RulesCollection as on X date, (so that we can rollback to the rule set that was active when a particular observation was made.)

ChatGPT was used extensively, but I figured that was the point.

---


# Stand Insurance - Mitigation Evaluation Engine

## Quickstart

```bash
npm install
npm run dev
```

Then open your browser to: [http://localhost:3000](http://localhost:3000)

---

## How to Test Dynamic Rule Evaluation

This process verifies that dynamic rules added through the Admin UI are applied during evaluation.

### Step-by-Step

1. **Go to the Admin Rules Page**  
   Navigate to [`/admin/rules`](http://localhost:3000/admin/rules)

2. **Load a Sample Rule**  
   * Click one of the sample buttons, e.g., _“Load Hydrant Rule”_
   * Click **Submit Rule**
   * The rule will appear in the rule list

3. **Go to the Evaluation Page**  
   Navigate to [`/evaluate`](http://localhost:3000/evaluate)

4. **Load a Sample Observation**  
   * Click the **“Use Sample”** button to populate a default property observation

5. **Edit the Observation to Trigger the Rule**  
   The sample rule already specifies the property has no hydrant. To ensure it matches:

```json
"waterResources": {
  "fireHydrant": {
    "available": false
  }
}
```

6. **Press the Evaluate Button**
7. **View Results**  
   In the right pane, you should see the response that indicates the rule was triggered, including mitigations.

---

## Overview

This project implements a property underwriting evaluation engine focused on fire risk mitigation, based on property observations.

It validates property inputs, applies underwriting risk rules, identifies vulnerabilities, recommends mitigations, and determines insurability (`yes`, `conditionally`, or `no`).

It is fully extensible to cover additional risk domains over time.

---


## Requirements

### Core (Mandatory) Requirements

| Requirement | Status | Notes |
|-------------|--------|-------|
| Process Property Observations | ✅ Fully Met | Deep, flexible schema via Zod; supports nested structure |
| Run Underwriting Rules | ✅ Fully Met | Static + dynamic rules evaluated via shared engine |
| Return Vulnerabilities | ✅ Fully Met | Structured, human-readable output includes description and score |
| Suggest Mitigations | ✅ Fully Met | Each rule has `full` and `bridge` mitigation options |
| Risk Types (Examples Provided) | ✅ Fully Met | Roof, vents, vegetation, etc. modeled and tested |
| Mitigation Semantics (Full vs Bridge) | ✅ Fully Met | Differentiated in UI and output |
| Rule Flexibility (Compound Logic) | ✅ Fully Met | Conditions support nested paths, arrays, operators |
| Point-in-Time Evaluation | ✅ Fully Met | `evaluatedAt` timestamp in all results |
| Human-Readable Output | ✅ Fully Met | Descriptions and IDs visible in evaluation pane |
| README & Architecture | ✅ Fully Met | You’re reading it! |
| Working API | ✅ Fully Met | `/api/evaluate` is live and functional |
| Rules Admin | ✅ Fully Met | Add, delete, test dynamic rules via `/admin/rules` UI |

### Optional / Inferred Requirements

| Optional Requirement | Status | Notes |
|----------------------|--------|-------|
| Extensible Schema | ✅ Fully Met | Zod + nested modeling supports growth |
| Risk Scoring + Insurability | ✅ Fully Met | Classifies property with score and status |
| Re-Evaluation Support | ⚠️ Partially Met | Evaluation is stateless but includes metadata |
| Rule Versioning | ❌ Not Implemented | All rules are current-version only |
| API Decoupling | ✅ Mostly Met | Clean evaluator + matcher + route split |
| Rule Debuggability | ⚠️ Partially Met | Rule IDs + JSON output; no trace UI yet |
| UI Layer | ⚠️ Light UI | Admin and evaluator UIs exist, no property form yet |
| Regional Risk Factors | ✅ Fully Met | Drought and distance modeled |
| Multi-User Roles | ❌ Not in Scope | No auth or user state |
| Mitigation Impact Modeling | ⚠️ Partially Met | Static mitigation scores only |
| Test Coverage | ⚠️ Manual | Evaluated via UI + curl; no Jest tests |

---


## Design Tradeoffs & Architecture Notes


## Features

* Deeply nested, validated observations via Zod
* Rule-based evaluation engine (static + dynamic)
* Live rule editing via UI (admin rules)
* Structured output: risk score, vulnerabilities, mitigations
* Extensible: easily add rules, mitigation types, or new risk domains


### Rule Matching System

To ensure flexibility and extensibility, the rule matching system was inspired by lightweight rule engines like `json-rules-engine`, but implemented with custom logic for deeper domain control.

* The matcher works by converting dot-path conditions (e.g. `structure.roof.class`) into nested lookups.
* It supports equality, array membership, and basic comparison (`lt`, `gt`, etc.).

**Key files:**
* `lib/ruleEngine/dynamicRuleMatcher.ts` — parses and matches rules
* `lib/ruleEngine/riskRules.ts` — applies both static and dynamic rules

### Tradeoffs Considered

| Tradeoff | Decision |
|---------|----------|
| Off-the-shelf rule engine vs custom matcher | Chose custom matcher for control and flexibility |
| Flat vs nested observation schema | Deeply nested, Zod-validated schema for realism |
| Static vs dynamic rules only | Supported both, dynamic rules toggleable for testing |
| JSON rule definition vs hardcoded rules | JSON rules via admin panel for flexibility |
| TypeScript type safety | Strongly typed, especially for schemas and outputs |


---

### Data Models

* **Property Metadata**: propertyId, address, etc.
* **Observation**: structure, vegetation, utilities, water, location
* **Result**: vulnerabilities, risk score, insurability, evaluatedAt



### Supported Static Risk Rules  (EXAMPLES)

In my riskRules.ts, you can see some examples of more sophisticated static rules that this engine can handle.

All the static rules are currently commented out currently to make it easier this product more demoable.


---

## Evaluate Property API

### `POST /api/evaluate`

**Request Body:**

```json
{
  "metadata": { ... },
  "observation": { ... }
}
```

**Response:**

```json
{
  "evaluation": {
    "propertyId": "PROP-001",
    "observationId": "OBS-001",
    "evaluatedAt": "...",
    "rulesetVersion": "v1",
    "totalRiskScore": 22,
    "insurability": "conditionally",
    "vulnerabilities": [ ... ]
  }
}
```

### Future

* Seprate out creating a subject property from applying a dated observation of that property.
* GET, DELETE, PUT for the entire subject property
* POST, GET, PUT, DELETE  /api/evaluate/observation: adding observations to an existing subject property.  Get all observations or just a specific one.


---

#### Testing via CLI

Use the sample input file provided:

```bash
curl -X POST http://localhost:3000/api/evaluate \
  -H "Content-Type: application/json" \
  -d @sample-full-risk-input.json
```


## Admin Rules API

This endpoint allows admin users to manage underwriting rules dynamically.  
All requests are sent to: `/api/admin/rules`

### GET /api/admin/rules

Fetch all currently loaded underwriting rules.

**Response:**

```json
{
  "rules": [ ... ]
}
```

### POST /api/admin/rules

Add a new rule to the system.

Request Body:

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "conditions": {
    "field.path": "value"
  },
  "riskWeight": 1,
  "critical": true,
  "mitigations": [
    {
      "name": "string",
      "type": "full",
      "mitigationValue": 5
    }
  ]
}
```

**Response:**

```json
{
  "message": "Rule added",
  "rule": { ... }
}
```


### PUT /api/admin/rules

Update an existing rule by ID.

Request Body:
```Same format as POST, but the id must match an existing rule.```

Response:

```json
{
  "message": "Rule updated",
  "rule": { ... }
}
```

### DELETE /api/admin/rules

Delete a rule by ID.

Request Body:

```json
{
  "id": "string"
}
```

Response:

```json
{
  "message": "Rule deleted",
  "rule": { ... }
}
```

---

### Future Improvements

* Persist dynamic rules (JSON store or DB)
* Rule versioning + changelogs
* Property revision tracking + comparisons
* Improved UI: create property via form
* Rule testing/validation harness
* Real mitigation impact simulation/optimizer

---

### That's it. Please hire me
