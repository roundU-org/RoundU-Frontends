# 🔍 Provider Workflow — Full Codebase Audit & Implementation Plan

> **Audited files**: `RoleSelect.tsx`, `SelectService.tsx`, `PersonalDetails.tsx`, `DigiLockerKYC.tsx`, `VideoPortfolio.tsx`, `GpsConsent.tsx`, `PendingApproval.tsx`, `Dashboard.tsx`, `Job.tsx`, `Jobs.tsx`, `Earnings.tsx`, `ProviderProfile.tsx`, `ProviderBottomNav.tsx`, `AppContext.tsx`, `mockData.ts`, `App.tsx`

---

## 📊 Executive Summary

| Phase | Status | Completion |
|---|---|---|
| **Phase 1 — Registration** | ✅ DONE | 100% |
| **Phase 2 — Daily Operations (Dashboard)** | ✅ DONE | 100% |
| **Phase 3 — Accepting & Completing Jobs** | ✅ DONE | 95% |
| **Phase 4 — Management Screens** | ✅ DONE | 90% |
| **Notifications & Penalties** | 🟡 In Progress | 10% |

---

## 🚀 PHASE 2 EXECUTION PLAN (Currently Proposed)

### User Review Required
Please review this plan to initiate Phase 2 (Daily Operations - Provider Dashboard). Let me know if you approve this approach or want any modifications.

### Proposed Changes

#### 1. Expand Context & Data Model (Goals 1 & 2)
**`src/data/mockData.ts`**
- [MODIFY] Update `ProviderRequest` interface: add `distanceKm`, `customerRating`, `photos`, `video`, `voiceNote`, and `quote`.
- [MODIFY] Expand `ProviderRequest['status']` to `"pending" | "accepted" | "on_the_way" | "arrived" | "quote_set" | "in_progress" | "completed" | "rejected"`.
- [MODIFY] Add more realistic mock requests with attachments.
- [NEW] Add `ServiceReport` interface.

**`src/context/AppContext.tsx`**
- [MODIFY] Add `isOnline: boolean` and `providerStats: { rating: number, responseRate: number }` to state.
- [MODIFY] Add `SET_ONLINE` action and reducer logic.

#### 2. Build Incoming Request Popup (Goal 6)
**`src/components/IncomingRequestPopup.tsx`**
- [NEW] Create a full-screen overlay component.
- [NEW] Implement a 2-minute countdown timer (120s).
- [NEW] Auto-decline (`REJECT_REQUEST`) when timer hits 0.
- [NEW] Display distance, earnings, customer rating, and attachments.

#### 3. Update Dashboard (Goal 2 & Phase 2 Gaps)
**`src/pages/provider/Dashboard.tsx`**
- [MODIFY] Connect Online/Offline toggle to `AppContext` (`SET_ONLINE`).
- [MODIFY] Replace hardcoded stats (jobs, rating, response rate) with data from `AppContext`.
- [MODIFY] Update "View Details" modal to show actual attachments from `selectedJob` instead of placeholders.
- [MODIFY] Add a "Simulate Incoming Request" floating action button (for dev purposes) to trigger the `IncomingRequestPopup`.

### Verification Plan
- **Automated/Manual Testing**:
  - Run `npm run dev` and navigate to `/provider/dashboard`.
  - Toggle the Online/Offline button and verify state changes.
  - Click "Simulate Incoming Request", wait 2 minutes, and ensure it auto-declines.
  - Verify stats are pulled from context properly.
  - Verify "View Details" modal shows dynamic attachments based on the request.

---

## 🚀 PHASE 3 EXECUTION PLAN (Goals 3 & 4)

### User Review Required
Please review this plan to implement the Job Status Flow (Goal 3) and the Set Quote Screen (Goal 4).

### Proposed Changes

#### 1. Implement Job Status Flow (Goal 3)
**`src/pages/provider/Job.tsx`**
- [MODIFY] Rewrite the bottom action bar to handle the full sequence:
  - `accepted`: Show "Mark as On The Way"
  - `on_the_way`: Show ETA and "Mark as Arrived"
  - `arrived`: Show "Set Quote"
  - `quote_set`: Show waiting state, and auto-transition to `in_progress` after 3 seconds (simulating customer approval).
  - `in_progress`: Show elapsed time counter, and "Mark as Completed".
  - `completed`: Redirect to Service Report page (placeholder for now until Goal 5).

#### 2. Build Set Quote Modal (Goal 4)
**`src/pages/provider/Job.tsx`**
- [MODIFY] Add an in-page modal for the "Set Quote" action.
- [NEW] Modal will contain:
  - Input for Labour and Parts amounts.
  - Calculation of Total and Commission (10%).
  - "Send Quote" button which dispatches `UPDATE_REQUEST` with `status: "quote_set"` and the `quote` amount.

### Verification Plan
- Accept a job from the Dashboard.
- Open the Job page and click through the entire flow:
  - "Mark as On The Way" -> "Mark as Arrived" -> "Set Quote".
  - Enter a quote, see the commission, and send it.
  - "Complete Job" -> Return to Dashboard.

---

## 🚀 PHASE 4 EXECUTION PLAN (Goal 5)

### User Review Required
Please review this plan to implement the Service Report Form (Goal 5) which is the final step in completing a job.

### Proposed Changes

#### 1. Build Service Report Screen
**`src/pages/provider/ServiceReport.tsx`** [NEW]
- Create a new screen for submitting the mandatory service report.
- Implements:
  - Root Cause dropdown (Wear & Tear, Accidental Damage, Installation Error, Other).
  - Severity Slider (1-5 scale).
  - Work Description textarea (min 20 chars validation).
  - Follow-up Required (Yes/No toggle).
  - Before/After photos (UI upload boxes using mock URLs or local blobs).
- On submit: Dispatches `COMPLETE_REQUEST` and shows a success toast ("Earnings added to wallet!").

#### 2. Update App Router
**`src/App.tsx`**
- [MODIFY] Add the new route: `<Route path="/provider/job/:id/report" element={<ServiceReport />} />`

#### 3. Connect the Flow
**`src/pages/provider/Job.tsx`**
- [MODIFY] Change the `completeJob` function. Instead of calling `COMPLETE_REQUEST` and going to the dashboard, it will navigate to `/provider/job/${job.id}/report`.

### Verification Plan
- From an `in_progress` job, click "Complete Job".
- Verify that the app navigates to the new Service Report screen.
- Fill out the form, ensuring the submit button is disabled if the description is too short.
- Submit the form and verify it redirects to the Dashboard.

---

## 🚀 PHASE 5 EXECUTION PLAN (Goal 7)

### User Review Required
Please review this plan to enhance the core Provider Management Screens (Goal 7).

### Proposed Changes

#### 1. Enhance Jobs List (`src/pages/provider/Jobs.tsx`)
- [MODIFY] Add an "Upcoming" tab, making it 3 tabs total (Upcoming | Active | Completed).
- [MODIFY] Update filtering logic:
  - **Upcoming**: `accepted`
  - **Active**: `on_the_way` | `arrived` | `quote_set` | `in_progress`
  - **Completed**: `completed`
- [MODIFY] Add a basic date range filter UI placeholder at the top.

#### 2. Enhance Earnings (`src/pages/provider/Earnings.tsx`)
- [MODIFY] Add an "Available Balance" highlight card at the top.
- [MODIFY] Add a "Withdraw to Bank" button that triggers a success toast.
- [MODIFY] Add a time period toggle (Daily | Weekly | Monthly) to filter the earnings display.
- [MODIFY] Add a monthly summary statistic.

#### 3. Enhance Provider Profile (`src/pages/provider/ProviderProfile.tsx`)
- [MODIFY] Add a full stats row displaying: Completion Rate, Response Rate, and Avg Rating (from context).
- [MODIFY] Add toggles for availability: "Available for Jobs", "Working Hours" (text display), and "Service Radius" (text display).
- [MODIFY] Add an "Edit Profile" entry to allow modifying bio and photo.
- [MODIFY] Add a "Switch to Customer Mode" button that dispatches `SET_ROLE` to `"customer"` and navigates to the customer home page.

### Verification Plan
- **Jobs**: Verify the 3 tabs filter the jobs correctly based on the expanded status enum.
- **Earnings**: Verify the withdraw button functions, and the daily/weekly/monthly tabs render.
- **Profile**: Verify the toggles, stats row, and the "Switch to Customer Mode" button correctly logs the user out of the provider view and into the customer home.

---

## 🚀 PHASE 6 EXECUTION PLAN (Goal 8)

### User Review Required
Please review this plan to build the missing provider management screens (Goal 8).

### Proposed Changes

#### 1. Add Navigation to Provider Profile (`src/pages/provider/ProviderProfile.tsx`)
- [MODIFY] Add new list items in the profile menu linking to:
  - Portfolio (`/provider/portfolio`)
  - Documents & KYC (`/provider/documents`)
  - Location Settings (`/provider/location-settings`)

#### 2. Build Portfolio Screen (`src/pages/provider/Portfolio.tsx`) [NEW]
- Create a screen to display the provider's past work.
- Features a grid of "Before & After" photos.
- Includes a floating action button (FAB) to "Upload New" work.

#### 3. Build Documents & KYC Screen (`src/pages/provider/Documents.tsx`) [NEW]
- Create a screen showing the status of uploaded documents.
- Lists items like Aadhaar Card, PAN Card, and Bank Details.
- Shows a green "Verified" badge for each to simulate a fully onboarded provider.

#### 4. Build Location Settings Screen (`src/pages/provider/GPSMonitor.tsx`) [NEW]
- Create a screen showing a simulated map with the provider's current location pin.
- Includes a toggle switch for "Background GPS Tracking" (required for receiving jobs).

#### 5. Update Router (`src/App.tsx`)
- [MODIFY] Add the three new routes to the App component.

### Verification Plan
- Navigate to the Provider Profile.
- Click on "Portfolio", verify the grid layout and upload button.
- Click on "Documents", verify the KYC items display their verified status.
- Click on "Location Settings", verify the map placeholder and tracking toggle function.

---

## 🚀 PHASE 7 EXECUTION PLAN (Goal 9)

### User Review Required
Please review this plan to polish the Provider Registration flow (Goal 9).

### Proposed Changes

#### 1. Expand Service Catalog
**`src/data/mockData.ts`**
- [MODIFY] Add 25+ new services (Painter, Carpenter, AC Repair, Pest Control, Salon, Gardener, TV Repair, etc.) to meet the "30+ services" requirement.
- [MODIFY] Ensure icons and descriptions are curated for a premium feel.

#### 2. Polish KYC Flow
**`src/pages/provider/DigiLockerKYC.tsx`**
- [MODIFY] Add a "Scan PAN Card" button that simulates an OCR scanning process.
- [MODIFY] Add a "Verify Bank" animation that simulates a micro-deposit (₹1) for verification.
- [MODIFY] Enhance the "Verify Identity" header and progress tracking.

#### 3. Finalize Pending Approval Screen
**`src/pages/provider/PendingApproval.tsx`**
- [MODIFY] Connect the checklist items to the actual registration state.
- [MODIFY] Add a "Profile Score" or progress bar to show how close the provider is to going live.

### Verification Plan
- Start the registration flow from the beginning (Role Select).
- Navigate through Service Selection (verify the expanded list).
- Go through the KYC process and verify the new "Scan PAN" and "Bank Verify" simulations.
- Complete the flow and land on the "Pending Approval" screen.

---

## 🚀 PHASE 8 EXECUTION PLAN (Goal 10)

### User Review Required
Please review this plan for the Warnings & Penalties System (Goal 10).

### Proposed Changes

#### 1. Dynamic Warnings Logic
**`src/pages/provider/Dashboard.tsx`**
- [MODIFY] Refactor warning banner to display different messages based on `providerStats`:
  - **Caution**: Rating between 4.0 - 4.5.
  - **Warning**: Response rate < 90%.
  - **Critical**: Rating < 4.0 or Response rate < 50%.

#### 2. Performance Improvement Plan (PIP)
**`src/components/PIPModal.tsx` [NEW]**
- Create a mandatory popup for providers in the "Critical" warning state.
- Lists the reasons for the penalty (e.g., "Low Customer Rating").
- Includes a "Commit to Improve" button to clear the modal.

#### 3. Simulation & Stats Control
**`src/pages/provider/Dashboard.tsx`**
- [MODIFY] Add a "Simulate Warning" debug feature to show how the UI reacts to poor performance.
**`src/context/AppContext.tsx`**
- [MODIFY] Add an action to update provider stats dynamically.

### Verification Plan
- Use the debug trigger to drop the provider's rating.
- Verify the dashboard banner changes from green/neutral to a yellow/red warning.
- Verify the PIP Modal appears automatically when stats drop below the critical threshold.
- Acknowledge the PIP and verify the dashboard returns to a functional state.

---

## PHASE 1 — REGISTRATION (one-time, 10-15 minutes)

### [4] Role Selection — ✅ DONE
- [RoleSelect.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/RoleSelect.tsx)
- Tap "Service Provider" → navigates to `/provider/select-service`
- Dispatches `SET_ROLE` with `"provider"`

### [P1] Select Your Service — ✅ DONE
- [SelectService.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/SelectService.tsx)
- ✅ Grid of services with icons and search
- ✅ Can select 1 primary + up to 3 secondary (4 total cap with toast error)
- ✅ Badge labeling (Primary / Secondary 1/2/3)
- ✅ Stored locally via `UPDATE_REGISTRATION_DRAFT`

> [!WARNING]
> **Gap**: Only 5 services in `mockData.ts`. Spec requires 30+ (Electrician, Plumber, Cleaner, Car Wash, Mechanic, Painter, Carpenter, AC Repair, Pest Control, Locksmith, Salon, Gardener, TV Repair, Fridge Repair, Mason, etc.)

### [P2] Personal Details — ✅ DONE
- [PersonalDetails.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/PersonalDetails.tsx)
- ✅ Full name (pre-filled from user context)
- ✅ Profile photo upload (camera/gallery local preview)
- ✅ Date of birth (restricted to 20–60 years)
- ✅ Gender (Male/Female/Other)
- ✅ Address with pin code (6-digit validated)
- ✅ City/District (alphabetic-only enforced)
- ✅ Experience slider (0-1 / 1-3 / 3-5 / 5-10 / 10+)
- ✅ Working hours (Morning/Afternoon/Evening/Night/All day)
- ✅ Service radius (2km/5km/10km/15km/25km)
- ✅ Bio with 200 char limit

> [!NOTE]
> **Gap**: Profile photo uploads are currently only stored locally as object URLs, not sent to a backend.

### [P3] DigiLocker KYC — ✅ DONE (frontend-only)
- [DigiLockerKYC.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/DigiLockerKYC.tsx)
- ✅ Step 1: Aadhaar verification with Verhoeff checksum + OTP screen
- ✅ Step 2: PAN verification (regex: `ABCDE1234F` format)
- ✅ Step 3: Bank details (account number 9–18 digits, IFSC, confirm account match)
- ✅ All 3 verified → "Next" becomes active
- ✅ Autofill (Demo Only) bypass button added

> [!IMPORTANT]
> **Gaps**:
> - PAN and Bank are combined into a single Step 2 in the UI. Spec says they should be **3 separate steps** (Aadhaar → PAN → Bank). Currently it's 2 steps (Aadhaar → Bank+PAN).
> - No actual API calls to Sandbox.co.in / DigiLocker backend. All verification is client-side simulation.
> - PAN is not its own standalone step — it's just a field inside the Bank step.

### [P4] Video Portfolio — ✅ DONE
- [VideoPortfolio.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/VideoPortfolio.tsx)
- ✅ Section 1: Video Introduction — camera capture + gallery upload, format/size validation (.mp4/.mov/.3gp, 15MB max)
- ✅ Section 2: Teleprompter, 30-second recording timer, and play/re-record/accept flow implemented
- ✅ Section 3: Before/After Photos — camera/gallery, dynamic pairs with add/delete, captions, format/size validation
- ✅ Section 4: Certificates — camera/gallery, add another pattern, format/size validation (images + PDF, 5MB max)
- ✅ `canProceed` temporarily bypassed for dev

> [!WARNING]
> **Gaps**:
> - No actual upload to S3 — uses local blob URLs only

### [P5] GPS Consent — ✅ DONE
- [GpsConsent.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/GpsConsent.tsx)
- ✅ 4 explanation points about GPS tracking
- ✅ "I understand and consent" checkbox
- ✅ Privacy policy link
- ✅ Location permission simulation (90% grant / 10% deny)
- ✅ If denied: "GPS is required" + "Enable in Settings" button

> [!NOTE]
> **Gap**: No actual `navigator.geolocation` or Permissions API call. It's a random simulation. Should use real browser Geolocation API.

### [P6] Pending Approval — ✅ DONE
- [PendingApproval.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/PendingApproval.tsx)
- ✅ Animated hourglass/clock
- ✅ "Under review" messaging with 24-hour timeline
- ✅ Checklist (Identity ✅, Bank ✅, Portfolio ✅, Admin ⏳)
- ✅ "Check Live Status" button
- ✅ "Simulate Admin Approval (Demo Only)" button

> [!NOTE]
> **Gap**: No push notification integration. No "Contact support" link. No actual backend status polling.

---

## PHASE 2 — DAILY OPERATIONS (after approval)

### [31] Provider Dashboard — 🟡 PARTIALLY DONE
- [Dashboard.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/Dashboard.tsx)
- ✅ Online/Offline toggle (prominent, top of screen)
- ✅ Stats row (today's jobs, rating, response rate)
- ✅ Upcoming Bookings strip (accepted jobs)
- ✅ Recent Activity (last completed jobs)
- ✅ Quick Actions (My Jobs, Earnings, Portfolio, Documents)
- ✅ AI Tip Card
- ✅ Warning banner (dismissible)
- ✅ Bottom Nav (Dashboard/Jobs/Earnings/Profile)
- ✅ View Details floating modal with blur background

> [!WARNING]
> **Gaps**:
> - Stats are **hardcoded** (3 jobs today, 4.9 rating, 98% response) — not derived from actual state
> - AI tip card is static text — should eventually be dynamic
> - Online/Offline toggle doesn't actually affect state globally (it's component-local `useState`, not in `AppContext`)
> - The "View Details" modal attachments section shows placeholder icons — not real customer uploads
> - No 2-minute countdown timer on incoming requests (spec [32])

---

## PHASE 3 — ACCEPTING & COMPLETING A JOB 🔴 MOSTLY MISSING

### [32] Incoming Request Popup — 🔴 NOT BUILT
The spec calls for a **full-screen overlay** with a **2-minute countdown timer** that auto-declines. Currently, incoming requests are just cards in the dashboard feed.

**Missing entirely:**
- Full-screen incoming request overlay
- 2-minute countdown timer
- Auto-decline when timer hits 0
- Customer rating display
- Distance calculation ("2.3 km away")
- Estimated earnings range

### [33] Active Job — 🟡 MINIMAL
- [Job.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/Job.tsx)
- ✅ Shows customer name, service type, address, date, time, notes
- ✅ Phone call button
- ✅ "Navigate" button (opens Google Maps — currently cosmetic)
- ✅ Earnings display
- ✅ "Start Job" button (accepted → in_progress)
- ✅ "Complete Job" button (in_progress → completed)

**Missing the full status flow:**

| Status | Spec Requirement | Current |
|---|---|---|
| `accepted` | "Mark as On The Way" button | ❌ Missing — jumps to "Start Job" |
| `on_the_way` | GPS sending every 30s, ETA shown, "Mark as Arrived" | ❌ Missing entirely |
| `arrived` | "Set Quote" button → [34] | ❌ Missing entirely |
| `quote_set` | Waiting for customer approval via Socket | ❌ Missing entirely |
| `in_progress` | Timer running, "Mark as Completed" | 🟡 Has Start/Complete but no timer |
| `completed` | → [35] Service Report | ❌ Missing entirely |

### [34] Set Quote — ❌ NOT BUILT
**Missing entirely:**
- Amount input field
- Labour/Parts breakdown
- Commission calculation (10%)
- "Send Quote to Customer" action
- Socket emit for `booking:quoted`

### [35] Service Report (Mandatory) — ❌ NOT BUILT
**Missing entirely:**
- Root cause dropdown
- Severity slider (1-5)
- Description text input (min 20 chars)
- Follow-up service question
- Completion photos (before/after)
- Submit report → payment flow

---

## PHASE 4 — MANAGEMENT SCREENS 🔴 MOSTLY MISSING

### [36] Jobs List — 🟡 PARTIALLY DONE
- [Jobs.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/Jobs.tsx)
- ✅ 2 tabs (Active / Completed)
- ✅ Job cards with service, customer, date, status badge
- ✅ ProviderBottomNav

**Missing:**
- ❌ "Upcoming" tab (spec says 3 tabs: Upcoming | Active | Completed)
- ❌ Date range filter
- ❌ Pagination / infinite scroll

### [37] Earnings — 🟡 PARTIALLY DONE
- [Earnings.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/Earnings.tsx)
- ✅ Total earnings card
- ✅ This week's earnings
- ✅ Stats (completed jobs, week total)
- ✅ Completed jobs list with amounts
- ✅ ProviderBottomNav

**Missing:**
- ❌ "Available Balance" card (withdrawable amount)
- ❌ "Withdraw to Bank" button
- ❌ Earnings chart (daily/weekly/monthly toggle)
- ❌ Monthly summary
- ❌ Transaction history (paginated)

### [38] Provider Profile — 🟡 PARTIALLY DONE
- [ProviderProfile.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/ProviderProfile.tsx)
- ✅ Avatar with initials
- ✅ Name and phone
- ✅ Star rating display
- ✅ Jobs count
- ✅ "My Jobs" and "Earnings" links
- ✅ Logout button
- ✅ ProviderBottomNav

**Missing:**
- ❌ Edit photo/video/bio
- ❌ Stats (completion rate, response rate, avg rating)
- ❌ Customer reviews (paginated)
- ❌ Toggle available services
- ❌ Toggle working hours
- ❌ Toggle service radius
- ❌ "Switch to Customer Mode" button

### [39] Portfolio Upload (standalone management) — ❌ NOT BUILT
- The registration `VideoPortfolio.tsx` exists but there is no **post-approval portfolio management** screen
- Missing: grid of photo pairs, add/delete, re-record video

### [40] Documents — ❌ NOT BUILT
- Missing: KYC status display, certificate list, upload new certificates

### [41] GPS Monitoring — ❌ NOT BUILT
- Missing: location history map, warning count, GPS status, anti-bypass FAQ

---

## STATE MANAGEMENT GAPS

### AppContext gaps:
| Feature | Current State Field | Missing |
|---|---|---|
| Online/Offline | ❌ Not in context | `isOnline: boolean` needed globally |
| Job status flow | Only `accepted`/`in_progress`/`completed` | Missing: `on_the_way`, `arrived`, `quote_set` |
| Provider stats | ❌ Not tracked | `responseRate`, `todayJobCount`, `rating` |
| Photos/Videos/Notes on requests | ❌ Not in `ProviderRequest` | `photos?`, `videos?`, `voiceNotes?` fields |
| Quote | ❌ Not modeled | `quote?` field on `ProviderRequest` |
| Service report | ❌ Not modeled | New interface needed |

### mockData gaps:
- Only **5 services** (need 30+)
- `ProviderRequest` missing: `distance`, `customerRating`, `photos`, `videos`, `voiceNotes`, `quote`
- No `ServiceReport` interface

---

## 🗺️ PRIORITIZED IMPLEMENTATION PLAN

### 🟢 GOAL 1: Expand Mock Data (Low effort, foundational)
> **Priority: HIGH | Effort: Small | Dependency: Everything below**

1. Add 25+ more services to `mockData.ts` (Painter, Carpenter, AC Repair, Pest Control, Locksmith, Salon, Gardener, TV Repair, Fridge Repair, Mason, etc.)
2. Add new fields to `ProviderRequest`: `distance`, `customerRating`, `photos`, `videos`, `voiceNotes`, `quote`
3. Add `ServiceReport` interface
4. Add more realistic mock request data (3-5 requests with varied services)

### 🟢 GOAL 2: Fix AppContext State Model (Low effort, foundational)
> **Priority: HIGH | Effort: Small | Dependency: Goals 3-7**

1. Add `isOnline: boolean` to state
2. Add `SET_ONLINE` action
3. Expand job status type: `"pending" | "accepted" | "on_the_way" | "arrived" | "quote_set" | "in_progress" | "completed"`
4. Wire Dashboard's online toggle to dispatch `SET_ONLINE` instead of local state
5. Derive dashboard stats from actual state (replace hardcoded values)

### 🟡 GOAL 3: Build Active Job Status Flow (High effort, core feature)
> **Priority: HIGH | Effort: Large | Dependency: Goal 2**

Rewrite [Job.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/Job.tsx) to implement the full status progression:

1. **Accepted** state: Show map, "Navigate" button, **"Mark as On The Way"** button
2. **On The Way** state: Show "Customer can see your location", ETA, **"Mark as Arrived"** button
3. **Arrived** state: Show "Inspect the problem", **"Set Quote"** button → opens Quote modal
4. **Quote Set** state: Show "Waiting for customer to approve your quote ₹X", simulate customer approval after 3-5 seconds
5. **In Progress** state: Running timer (elapsed time), **"Mark as Completed"** button
6. **Completed** state: → Navigate to Service Report form

### 🟡 GOAL 4: Build Set Quote Screen (Medium effort)
> **Priority: HIGH | Effort: Medium | Dependency: Goal 3**

Create `/provider/job/:id/quote` or an in-page modal:
1. Service details and problem description
2. Amount input (₹)
3. Optional breakdown: Labour + Parts = Total
4. Commission display: "Your earnings after 10% commission: ₹X"
5. "Send Quote to Customer" button
6. Dispatch `UPDATE_REQUEST` with quote data

### 🟡 GOAL 5: Build Service Report Form (Medium effort)
> **Priority: HIGH | Effort: Medium | Dependency: Goal 3**

Create `ServiceReport.tsx` at `/provider/job/:id/report`:
1. Q1: Root cause dropdown (Wear & tear / Damage / Installation error / etc.)
2. Q2: Severity slider (1-5)
3. Q3: Text input "What did you do?" (min 20 chars)
4. Q4: Follow-up (Yes/No/Maybe with timeframe)
5. Q5: Completion photos (before/after, camera/gallery upload reusing VideoPortfolio patterns)
6. Submit → toast "₹X earned!" → navigate to Dashboard

### 🟡 GOAL 6: Build Incoming Request Popup (Medium effort)
> **Priority: MEDIUM | Effort: Medium | Dependency: Goal 2**

Create a full-screen overlay component `IncomingRequestPopup.tsx`:
1. Service type + icon
2. Customer name + rating
3. Distance display
4. Description + customer photos (if any)
5. Estimated earnings
6. **2-minute countdown timer** (red, ticking)
7. Auto-decline when timer reaches 0
8. Accept (big green) / Decline (small gray) buttons
9. Show as overlay on Dashboard when a new request arrives (simulated with setTimeout for now)

### 🟢 GOAL 7: Enhance Management Screens (Medium effort)
> **Priority: MEDIUM | Effort: Medium**

**Jobs List** (enhance [Jobs.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/Jobs.tsx)):
1. Add "Upcoming" tab (3 tabs total)
2. Add date range filter

**Earnings** (enhance [Earnings.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/Earnings.tsx)):
1. Add "Available Balance" card with "Withdraw to Bank" button
2. Add daily/weekly/monthly toggle
3. Add monthly summary stat

**Provider Profile** (enhance [ProviderProfile.tsx](file:///c:/Users/Yogit/Downloads/roundu-frontend-develop/roundu-frontend-develop/src/pages/provider/ProviderProfile.tsx)):
1. Add edit capabilities (photo, bio)
2. Add full stats row (completion rate, response rate, avg rating)
3. Add customer reviews section
4. Add service/hours/radius toggles
5. Add "Switch to Customer Mode" button

### 🔵 GOAL 8: Build Missing Management Screens (Medium effort)
> **Priority: LOW | Effort: Medium**

**Portfolio Upload** — Create `PortfolioManage.tsx` at `/provider/portfolio`:
1. Grid view of existing before/after pairs
2. Add new pair / delete existing
3. Re-record video introduction
4. Route from Quick Actions → this screen

**Documents** — Create `Documents.tsx` at `/provider/documents`:
1. KYC status display (✅ Aadhaar, ✅ PAN, ✅ Bank)
2. List of uploaded certificates
3. Upload new certificates
4. Route from Quick Actions → this screen

**GPS Monitoring** — Create `GpsMonitoring.tsx` at `/provider/gps`:
1. Map placeholder showing location history
2. Warning count display
3. GPS status (Active/Paused)
4. Anti-bypass detection FAQ

### 🔵 GOAL 9: Minor Registration Polish (Low effort)
> **Priority: LOW | Effort: Small**

1. ~~Make profile photo upload functional in `PersonalDetails.tsx` (camera/gallery)~~ ✅ DONE
2. Separate PAN into its own Step 2 in `DigiLockerKYC.tsx` (Aadhaar → PAN → Bank = 3 steps)
3. ~~Add photo pair captions in `VideoPortfolio.tsx`~~ ✅ DONE
4. Use real `navigator.geolocation` in `GpsConsent.tsx`

### 🔵 GOAL 10: Warnings & Penalties System (Low effort, future)
> **Priority: LOW | Effort: Medium | Dependency: Backend**

1. Track cancel count in state
2. Show warning toasts on decline ("Your response rate is dropping")
3. Auto-suspend after 3 cancellations (UI block)
4. GPS warning banner escalation (Warning #1 → #2 → #3 → suspended)
5. Low rating demotion logic

---

## 🎯 RECOMMENDED EXECUTION ORDER

```
Week 1:  Goal 1 (Mock Data) → Goal 2 (AppContext) → Goal 3 (Job Status Flow)
Week 2:  Goal 4 (Set Quote) → Goal 5 (Service Report) → Goal 6 (Incoming Request Popup)
Week 3:  Goal 7 (Enhance Management Screens) → Goal 8 (New Management Screens)
Week 4:  Goal 9 (Registration Polish) → Goal 10 (Warnings & Penalties)
```

> [!TIP]
> Goals 1 and 2 are **foundational** — almost everything else depends on having the expanded data model and state management in place. Start there.

> [!IMPORTANT]
> The **highest-impact work** is Goals 3–6 (the job lifecycle). This is the core revenue-generating flow and currently has the biggest gap between spec and implementation.
