# Product Requirements Document (PRD): Architecture Blueprints & Executive Portfolio Page

---

## 1. Document Overview

* **Document Owner:** Mahendra
* **Current Role:** Senior Engineering Manager, HashedIn by Deloitte
* **Target Audience:** Executive Recruiters, VPs/CTOs (Director/VP AI Roles), Enterprise Advisory Leads
* **Target Deliverable:** Customization of `portfolio.html` and `portfolio-details.html` within the Kelly Bootstrap 5 template.

---

## 2. Problem Statement & Strategic Objective

* **Problem:** Standard developer portfolios show raw code repositories, toy apps, and screenshots of UI layouts. Executive search committees (Director/VP level) look for **architectural trade-offs, engineering governance, cost/latency economics, and enterprise business impact**.
* **Objective:** Repurpose the visual "gallery" layout of the Kelly template into an **Enterprise Architecture Showcase**. Provide defensible, clean-room proof of deep GenAI/LLM expertise and 15-year engineering rigor without violating Deloitte/client NDAs or Outside Business Activity (OBA) policies.

---

## 3. Core Personas & User Journeys

```
                    ┌────────────────────────────────────────────────────────┐
                    │                      Visitor Flow                      │
                    └──────────────────────────┬─────────────────────────────┘
                                               │
                                               ▼
                    ┌────────────────────────────────────────────────────────┐
                    │    portfolio.html: Architecture Grid (Filterable)      │
                    │   [All]  [Agentic Systems]  [LLMOps/RAG]  [Scale/Org]  │
                    └──────────────────────────┬─────────────────────────────┘
                                               │
                                               │ Clicks Case Study Card
                                               ▼
                    ┌────────────────────────────────────────────────────────┐
                    │   portfolio-details.html: Executive Architecture Doc   │
                    │   • System Topology (Diagram)                          │
                    │   • Problem Context & Technical Bottlenecks            │
                    │   • Architectural Trade-offs                           │
                    │   • Production Metrics & Measurable Impact             │
                    └────────────────────────────────────────────────────────┘
```

* **Persona A: Executive Technical Recruiter / Talent Partner**
  * *Goal:* Verify candidate has authentic, enterprise-scale engineering leadership and recent production AI execution.
  * *Journey:* Lands on `/portfolio.html`, filters by category, scans the headline metrics and role scope in under 45 seconds.

* **Persona B: CTO / VP of Engineering (Hiring Manager)**
  * *Goal:* Gauge candidate’s technical judgment, architectural maturity, and risk mitigation strategies.
  * *Journey:* Clicks into a deep-dive (`portfolio-details.html`), reviews the system topology diagram, evaluates why specific frameworks (e.g., state graphs vs. autonomous loops) were selected.

---

## 4. Functional Specifications

### 4.1 Filter Taxonomies (`portfolio.html`)

Replace Kelly's default filters (`*`, `.filter-app`, `.filter-product`, `.filter-branding`) with engineering domains:

| Filter ID | Label | Intent |
| --- | --- | --- |
| `*` | **All Systems** | Comprehensive view of all architecture initiatives. |
| `.filter-agent` | **Agentic AI & Orchestration** | State machines, multi-agent frameworks, deterministic tool use. |
| `.filter-rag` | **Enterprise Retrieval & LLMOps** | Hybrid search, vector indexing, semantic caching, latency budgets. |
| `.filter-infra` | **Enterprise Scale & Governance** | High-throughput distributed backends, AI guardrails, cost/token controls. |

### 4.2 Card Components (`portfolio.html`)

Each card in the Bootstrap grid must contain:

1. **Visual Asset:** A crisp, minimalist system architecture diagram (SVG or WebP exported from Mermaid/Excalidraw).
2. **Metadata Pill:** Domain category tag (e.g., `LangGraph / Redis / FastAPI`).
3. **Card Title:** Executive system designation (e.g., *Deterministic Multi-Agent Reconciliation Engine*).
4. **Impact Subtitle:** One-line business metric (e.g., *Cut manual reconciliation cycles by 65% across distributed silos*).
5. **Action:** Deep link pointing to `portfolio-details-[slug].html`.

---

## 5. Blueprint Content Specifications (`portfolio-details.html`)

Every case study page follows an executive 4-part architectural blueprint template:

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Case Study Title]                                                     │
│ Role: Architecture Strategy & Pod Delivery  |  Scope: Enterprise Core │
├────────────────────────────────────────────────────────────────────────┤
│ [System Architecture Topology Diagram]                                │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Business & Technical Context                                        │
│    • Legacy problem statement and operational latency bottlenecks.    │
│                                                                        │
│ 2. Architectural Decisions & Trade-offs                                │
│    • Technology selections, framework trade-offs, and design patterns. │
│                                                                        │
│ 3. Engineering Challenges & Mitigations                                │
│    • Non-determinism, rate limits, schema enforcement, latency budgets.│
│                                                                        │
│ 4. Measurable Outcomes & Metrics                                       │
│    • Quantifiable operational gains, cost savings, and SLA compliance. │
└────────────────────────────────────────────────────────────────────────┘
```

### Initial Three Production Case Studies to Implement:

#### Study 1: Deterministic Multi-Agent Workflow Engine (`.filter-agent`)
* **Core Problem:** Unstructured enterprise document reconciliation was prone to human audit latency and data fragmentation.
* **Architecture:** State-machine-based execution graph (LangGraph pattern) with schema-validated agent nodes and isolated tool environments over open-ended autonomous loops.
* **Key Challenges:** Eliminating cyclic infinite loops and enforcing strict JSON output validation.
* **Metrics:** 65% cycle time reduction; zero unhandled schema degradation errors.

#### Study 2: High-Throughput Enterprise RAG with Semantic Caching (`.filter-rag`)
* **Core Problem:** Knowledge retrieval over 10M+ technical documents incurred prohibitive API token costs and variable query latencies.
* **Architecture:** Sparse-dense hybrid search (BM25 + Dense Embeddings) with a two-tier semantic cache (Redis) and reranking model.
* **Key Challenges:** Cold-start latency spikes and cache invalidation policies for updating documents.
* **Metrics:** 42% reduction in recurring token expenditures; sub-400ms P95 query response time.

#### Study 3: Enterprise AI Governance, Guardrails & LLMOps Pipeline (`.filter-infra`)
* **Core Problem:** Preventing sensitive enterprise data leakage (PII/IP) and mitigating model hallucinations in client-facing environments.
* **Architecture:** Asynchronous pre/post-execution proxy layer executing input sanitization, dynamic prompt guardrails, and telemetry evaluation tracking (OpenTelemetry).
* **Key Challenges:** Minimizing proxy evaluation latency without degrading safety thresholds.
* **Metrics:** 100% compliance adherence with zero outbound PII leakage across internal multi-tenant pods.

---

## 6. Corporate Policy & Compliance Guardrails

To strictly safeguard your position at HashedIn by Deloitte:

* **The "Clean-Room" Rule:** No Deloitte client names, internal platform code names, or proprietary revenue amounts. Refer only to generic enterprise environments (e.g., *"Global Financial Services Workflow"* or *"Multi-Tenant Knowledge Discovery Platform"*).
* **Role Representation:** Label your role as **"Architectural Strategy & Delivery Oversight"** or **"Senior Engineering Manager (Delivery Lead)"** to reflect leadership without implying sole individual contributor attribution.
* **No Contract Booking Links:** Ensure `portfolio-details.html` links directly back to `contact.html` for *"Executive Networking & Technical Discussions"*, completely omitting any freelance rate cards or contracting language.

---

## 7. Implementation Roadmap & Milestones

* **Milestone 1: Visual Asset Production**
  * Generate 3 standardized architecture SVGs using Excalidraw or draw.io (dark charcoal lines, clean tech iconography).

* **Milestone 2: Template Structure Cleanup**
  * Remove Kelly’s lightbox plugin (`glightbox`) that triggers photo-viewing popups; make thumbnail cards link directly to HTML detail pages.
  * Update category filters in `portfolio.html`.

* **Milestone 3: Detail Pages Deployment**
  * Create `portfolio-details-agents.html`, `portfolio-details-rag.html`, and `portfolio-details-governance.html` populated with the structured 4-part copy.

* **Milestone 4: Verification & Sign-Off**
  * Run a full compliance scan against all case studies to verify zero proprietary references. Test responsive layout on desktop, tablet, and mobile.
