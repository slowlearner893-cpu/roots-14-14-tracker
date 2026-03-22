import React, { useState } from "react";

const milestones = [
  {
    phase: "Phase 1 – Product Design",
    done: true,
    items: [
      { label: "Problem identified: the all-or-nothing trap", owner: "Both", checked: true },
      { label: "Market validated: yoga apps deliver content, not consistency", owner: "Both", checked: true },
      { label: "Product designed: 14/14 method, two-format strategy", owner: "Both", checked: true },
      { label: 'Positioning locked: "consistency creator" framing', owner: "Both", checked: true },
      { label: "Mentorship ladder mapped ($47 → $197 → $380 → $580/mo → $1,900/mo)", owner: "Both", checked: true },
      { label: "Terms agreed: deferred $10K CAD build fee", owner: "Both", checked: true },
      { label: "Product brief written (v5)", owner: "Christopher", checked: true },
    ],
  },
  {
    phase: "Phase 2 – Content Build",
    done: false,
    items: [
      { label: "14-day email course written (Days 1–14)", owner: "Christopher", checked: false },
      { label: "Integration guide written (Days 15–28)", owner: "Christopher", checked: false },
      { label: "Video content recorded (14 daily practices, ~14 min each)", owner: "Rama", checked: false },
      { label: "Workbook designed (PDF)", owner: "Christopher", checked: false },
      { label: "Email course set up in Kit (sequences, tags, automation)", owner: "Christopher", checked: false },
      { label: "Sales page written and published", owner: "Christopher", checked: false },
      { label: "Payment link / checkout configured", owner: "Rama", checked: false },
    ],
  },
  {
    phase: "Phase 3 – Launch Prep",
    done: false,
    items: [
      { label: "Pre-sell sequence written (5 emails)", owner: "Christopher", checked: false },
      { label: "Waitlist / interest list built", owner: "Both", checked: false },
      { label: "Launch date confirmed", owner: "Both", checked: false },
      { label: "Cohort version scoped ($197)", owner: "Both", checked: false },
    ],
  },
  {
    phase: "Phase 4 – Post-Launch",
    done: false,
    items: [
      { label: "Revenue milestone: $1,000 CAD", owner: "Both", checked: false },
      { label: "Revenue milestone: $5,000 CAD", owner: "Both", checked: false },
      { label: "Revenue milestone: $10,000 CAD (build fee triggered)", owner: "Both", checked: false },
      { label: "Cohort v1 delivered", owner: "Rama", checked: false },
      { label: "Upsell to $380 roadmap activated", owner: "Both", checked: false },
    ],
  },
];

const funnelTiers = [
  { price: "$47", name: "14-14 Email Course", desc: "Entry point" },
  { price: "$197", name: "Live Cohort", desc: "Accountability + community" },
  { price: "$380", name: "Roadmap Session", desc: "1:1 strategy" },
  { price: "$580/mo", name: "Guidance", desc: "Ongoing support" },
  { price: "$1,900/mo", name: "Full Mentorship", desc: "Complete transformation" },
];

const ownerBadge = (owner) => {
  const colors = {
    Christopher: "bg-amber-900/50 text-amber-300 border border-amber-700/50",
    Rama: "bg-green-900/50 text-green-300 border border-green-700/50",
    Both: "bg-stone-700/50 text-stone-300 border border-stone-600/50",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colors[owner] || colors.Both}`}>
      {owner}
    </span>
  );
};

const phaseFromRevenue = (revenue, milestoneData) => {
  const phase2Done = milestoneData[1]?.items.every((i) => i.checked);
  const phase3Done = milestoneData[2]?.items.every((i) => i.checked);
  if (revenue >= 10000) return "Post-Launch";
  if (phase3Done) return "Live";
  if (phase2Done) return "Launch Prep";
  return "Active Build";
};

export default function RootsTracker() {
  const [revenue, setRevenue] = useState(0);
  const [allMilestones, setAllMilestones] = useState(milestones);
  const [notes, setNotes] = useState(
    "Parked until May/June 2026. Re-entry: upload 14-14-reentry-prompt-v3.md and 14-14-yoga-habit-product-brief-v5.docx to resume."
  );

  const triggered = revenue >= 10000;
  const progress = Math.min((revenue / 10000) * 100, 100);
  const phase = phaseFromRevenue(revenue, allMilestones);

  const toggleItem = (phaseIdx, itemIdx) => {
    setAllMilestones((prev) => {
      const next = prev.map((p, pi) => {
        if (pi !== phaseIdx) return p;
        return {
          ...p,
          items: p.items.map((item, ii) => {
            if (ii !== itemIdx) return item;
            return { ...item, checked: !item.checked };
          }),
        };
      });
      return next;
    });
  };

  const formatCAD = (val) =>
    new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-stone-100 font-sans">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">

        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl sm:text-6xl font-light tracking-[0.25em] text-amber-500">
            ROOTS
          </h1>
          <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto italic leading-relaxed">
            "Anyone can give you a yoga video. Only a consistency creator gives you a yoga practice."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-stone-500 text-sm">
            <span>Christopher <span className="text-stone-600">·</span> Views to Value</span>
            <span className="hidden sm:inline text-stone-700">×</span>
            <span>Rama <span className="text-stone-600">·</span> Becoming Balance</span>
          </div>
          <div className="inline-block mt-2">
            <span className="text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-stone-700 text-stone-400 bg-stone-800/50">
              {phase}
            </span>
          </div>
        </header>

        {/* Revenue Trigger Tracker */}
        <section className={`rounded-2xl p-6 sm:p-8 border ${triggered ? "bg-amber-950/30 border-amber-700/50" : "bg-stone-800/50 border-stone-700/40"}`}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-medium tracking-wide text-stone-200 mb-1">
                Build Fee Trigger
              </h2>
              <p className="text-stone-500 text-sm">
                Christopher gets paid after Rama does.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">
                Target: $10,000 CAD
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-500 text-lg">$</span>
                <input
                  type="number"
                  min="0"
                  value={revenue}
                  onChange={(e) => setRevenue(Math.max(0, Number(e.target.value)))}
                  className="bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-2xl font-light text-stone-100 w-36 text-right focus:outline-none focus:border-amber-600 transition-colors"
                />
                <span className="text-stone-500 text-sm">CAD</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-4 bg-stone-900 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${triggered ? "bg-amber-500" : "bg-green-700"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-stone-500">
            <span>{formatCAD(revenue)} earned</span>
            <span>{progress.toFixed(1)}%</span>
          </div>

          {triggered && (
            <div className="mt-5 p-4 bg-amber-900/30 border border-amber-700/40 rounded-xl text-center">
              <p className="text-2xl mb-1">🎉</p>
              <p className="text-amber-300 font-medium">Fee Triggered!</p>
              <p className="text-amber-400/70 text-sm mt-1">
                Christopher's $10,000 CAD build fee is now payable.
              </p>
            </div>
          )}
        </section>

        {/* Main grid: Milestones + Funnel side by side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Milestones — takes 2 cols */}
          <section className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-medium tracking-wide text-stone-200">
              Product Build Milestones
            </h2>
            {allMilestones.map((phase, phaseIdx) => {
              const completed = phase.items.filter((i) => i.checked).length;
              const total = phase.items.length;
              return (
                <div
                  key={phase.phase}
                  className="bg-stone-800/50 border border-stone-700/40 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-stone-300 tracking-wide">
                      {phase.phase}
                    </h3>
                    <span className="text-xs text-stone-500">
                      {completed}/{total}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {phase.items.map((item, itemIdx) => (
                      <label
                        key={itemIdx}
                        className="flex items-start gap-3 group cursor-pointer py-1"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItem(phaseIdx, itemIdx)}
                          className="mt-0.5 h-4 w-4 rounded border-stone-600 bg-stone-900 text-amber-500 focus:ring-amber-600 focus:ring-offset-0 accent-amber-600 cursor-pointer flex-shrink-0"
                        />
                        <span
                          className={`text-sm leading-relaxed ${item.checked ? "text-stone-500 line-through" : "text-stone-300"}`}
                        >
                          {item.label}
                        </span>
                        <span className="ml-auto flex-shrink-0">
                          {ownerBadge(item.owner)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Funnel — takes 1 col */}
          <section className="space-y-6">
            <h2 className="text-lg font-medium tracking-wide text-stone-200">
              Mentorship Ladder
            </h2>
            <div className="space-y-3">
              {funnelTiers.map((tier, idx) => {
                const widths = ["w-full", "w-[88%]", "w-[76%]", "w-[64%]", "w-[52%]"];
                return (
                  <div key={idx} className="flex justify-center">
                    <div
                      className={`${widths[idx]} bg-stone-800/50 border border-stone-700/40 rounded-xl p-4 text-center transition-all hover:border-stone-600/60`}
                    >
                      <div className="text-amber-500 font-medium text-lg mb-0.5">
                        {tier.price}
                      </div>
                      <div className="text-stone-200 text-sm font-medium">
                        {tier.name}
                      </div>
                      <div className="text-stone-500 text-xs mt-0.5">
                        {tier.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="text-center pt-2">
                <span className="text-stone-600 text-xs tracking-wider">▼</span>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4">
              <h2 className="text-lg font-medium tracking-wide text-stone-200 mb-3">
                Notes / Next Actions
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="w-full bg-stone-900 border border-stone-700/40 rounded-xl px-4 py-3 text-sm text-stone-300 leading-relaxed resize-y focus:outline-none focus:border-amber-600/50 transition-colors placeholder-stone-600"
                placeholder="Log next actions here..."
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-stone-800 text-center space-y-1">
          <p className="text-stone-600 text-xs tracking-wider">
            Velocity → Views to Value
          </p>
          <p className="text-stone-700 text-xs">
            Built by Christopher for Rama. Zero risk to launch.
          </p>
        </footer>
      </div>
    </div>
  );
}
