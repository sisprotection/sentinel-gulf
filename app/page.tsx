'use client'

import { useMemo, useState } from 'react'
import { Activity, ArrowRight, Check, CircleAlert, Cpu, Gauge, House, LockKeyhole, Radar, ShieldCheck, Sun, Wind, Zap } from 'lucide-react'

type Exposure = 'low' | 'moderate' | 'elevated' | 'critical'

const roofOptions = ['Architectural asphalt', 'Metal standing seam', 'Tile / concrete', 'Flat membrane']
const ageOptions = ['0–5 years', '6–15 years', '16–25 years', '25+ years']

function getExposure(roof: string, age: string, solar: boolean, zone: string): Exposure {
  let score = 0
  if (roof === 'Tile / concrete') score += 2
  if (roof === 'Flat membrane') score += 1
  if (age === '16–25 years') score += 1
  if (age === '25+ years') score += 2
  if (solar) score += 1
  if (zone === 'Coastal / barrier island') score += 2
  if (zone === 'Open waterfront') score += 3
  if (score >= 6) return 'critical'
  if (score >= 4) return 'elevated'
  if (score >= 2) return 'moderate'
  return 'low'
}

export default function Page() {
  const [roof, setRoof] = useState(roofOptions[0])
  const [age, setAge] = useState(ageOptions[1])
  const [zone, setZone] = useState('Inland / suburban')
  const [solar, setSolar] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const exposure = useMemo(() => getExposure(roof, age, solar, zone), [roof, age, solar, zone])
  const score = { low: 18, moderate: 42, elevated: 67, critical: 91 }[exposure]
  const status = { low: 'WITHIN PARAMETERS', moderate: 'MONITOR CONDITIONS', elevated: 'ACTION ADVISED', critical: 'IMMEDIATE REVIEW' }[exposure]

  return (
    <main className="min-h-screen bg-[#0b0d0d] text-[#e7b85d] selection:bg-[#e7b85d] selection:text-[#0b0d0d]">
      <header className="fixed inset-x-0 top-0 z-20 border-b border-[#bd8b35]/70 bg-[#0b0d0d]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-4 font-mono text-[10px] tracking-[0.2em] sm:px-8">
          <div className="flex items-center gap-3"><LockKeyhole className="size-3 text-[#dcae55]" /><span>SECURED BY SERPENT SYSTEMS // PERIMETER LOCKED</span></div>
          <span className="hidden text-[#778073] sm:inline">NODE 03 / GULF COAST</span>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-24 sm:px-8">
        <section className="grid gap-10 border-b border-[#bd8b35]/50 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-[#87917d]"><span className="size-2 animate-pulse bg-[#e7b85d]" /> LIVE ASSESSMENT TERMINAL // V1.4.7</div>
            <h1 className="max-w-4xl font-mono text-4xl font-bold uppercase leading-[0.95] tracking-[-0.06em] text-[#f0cc7b] sm:text-6xl lg:text-8xl">Sentinel Gulf<br /><span className="text-[#b8c0aa]">Storm Hardening</span></h1>
            <p className="mt-7 max-w-xl font-mono text-sm leading-7 text-[#899487]">Local infrastructure consultation for homeowners on the Gulf perimeter. Run a private exposure check for roofing assemblies and solar arrays before the next pressure event.</p>
          </div>
          <div className="relative border border-[#bd8b35]/70 bg-[#101512] p-5 font-mono text-xs text-[#899487]">
            <div className="absolute -left-px -top-px size-3 border-l border-t border-[#f0cc7b]" /><div className="absolute -bottom-px -right-px size-3 border-b border-r border-[#f0cc7b]" />
            <div className="mb-6 flex items-center justify-between border-b border-[#bd8b35]/30 pb-3"><span className="flex items-center gap-2"><Radar className="size-4 text-[#e7b85d]" /> LOCAL TELEMETRY</span><span className="text-[#6d786d]">POLLING</span></div>
            <div className="grid grid-cols-2 gap-y-4"><span>WIND FIELD</span><strong className="text-right text-[#dcae55]">ACTIVE / 78 MPH</strong><span>BARO TREND</span><strong className="text-right text-[#dcae55]">1003 HPA ↓</strong><span>RAIN LOAD</span><strong className="text-right text-[#dcae55]">MODERATE</strong><span>LAST SYNC</span><strong className="text-right text-[#dcae55]">09:41:22 CST</strong></div>
          </div>
        </section>

        <section className="grid gap-8 py-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="border border-[#bd8b35]/70 bg-[#0f1311] p-5 sm:p-8">
            <div className="mb-8 flex items-start justify-between border-b border-[#bd8b35]/30 pb-5"><div><p className="font-mono text-[10px] tracking-[0.25em] text-[#778073]">INPUT MODULE 01</p><h2 className="mt-2 flex items-center gap-3 font-mono text-xl uppercase text-[#f0cc7b]"><House className="size-5" /> Structure profile</h2></div><span className="font-mono text-xs text-[#778073]">LOCAL STATE ONLY</span></div>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="font-mono text-xs text-[#899487]">ROOF ASSEMBLY<select value={roof} onChange={(e) => setRoof(e.target.value)} className="console-select">{roofOptions.map((o) => <option key={o}>{o}</option>)}</select></label>
              <label className="font-mono text-xs text-[#899487]">INSTALL AGE<select value={age} onChange={(e) => setAge(e.target.value)} className="console-select">{ageOptions.map((o) => <option key={o}>{o}</option>)}</select></label>
              <label className="font-mono text-xs text-[#899487] sm:col-span-2">EXPOSURE ZONE<select value={zone} onChange={(e) => setZone(e.target.value)} className="console-select"><option>Inland / suburban</option><option>Coastal / barrier island</option><option>Open waterfront</option></select></label>
            </div>
            <button type="button" onClick={() => setSolar(!solar)} className={`mt-7 flex w-full items-center justify-between border px-4 py-4 text-left font-mono text-xs transition-colors ${solar ? 'border-[#e7b85d] bg-[#2a2112]/60 text-[#f0cc7b]' : 'border-[#bd8b35]/40 text-[#778073]'}`}><span className="flex items-center gap-3"><Sun className="size-4" /> ROOFTOP SOLAR ARRAY DETECTED</span><span className={`flex size-5 items-center justify-center border ${solar ? 'border-[#e7b85d] bg-[#e7b85d] text-[#0b0d0d]' : 'border-[#778073]'}`}>{solar && <Check className="size-3" />}</span></button>
            <button type="button" onClick={() => setSubmitted(true)} className="mt-8 flex w-full items-center justify-between bg-[#dcae55] px-5 py-4 font-mono text-xs font-bold tracking-[0.15em] text-[#0b0d0d] transition hover:bg-[#f0cc7b]"><span>{submitted ? 'SCAN COMPLETE // PROFILE UPDATED' : 'RUN EXPOSURE SCAN'}</span><ArrowRight className="size-4" /></button>
          </div>

          <div className="border border-[#bd8b35]/70 bg-[#111613] p-5 sm:p-8">
            <div className="mb-8 flex items-center justify-between border-b border-[#bd8b35]/30 pb-5"><div><p className="font-mono text-[10px] tracking-[0.25em] text-[#778073]">OUTPUT MODULE 02</p><h2 className="mt-2 flex items-center gap-3 font-mono text-xl uppercase text-[#f0cc7b]"><Gauge className="size-5" /> Exposure index</h2></div><Activity className="size-5 text-[#87917d]" /></div>
            <div className="flex items-center gap-7"><div className="relative flex size-36 shrink-0 items-center justify-center rounded-full border-[10px] border-[#2a342b]" style={{ background: `conic-gradient(#dcae55 ${score}%, #2a342b 0)` }}><div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#111613]"><strong className="font-mono text-4xl text-[#f0cc7b]">{score}</strong><span className="font-mono text-[9px] text-[#778073]">/ 100</span></div></div><div><p className="font-mono text-[10px] tracking-[0.2em] text-[#778073]">CURRENT SIGNAL</p><p className="mt-2 font-mono text-lg font-bold text-[#e7b85d]">{status}</p><p className="mt-3 font-mono text-xs leading-5 text-[#899487]">Roof + solar profile recalculated locally from your selected conditions.</p></div></div>
            <div className="mt-9 grid gap-3 font-mono text-xs"><div className="flex justify-between border-t border-[#bd8b35]/25 pt-3"><span className="text-[#778073]">WIND UPLIFT RISK</span><span className="text-[#e7b85d]">{exposure === 'low' ? 'LOW' : exposure === 'moderate' ? 'MEDIUM' : 'HIGH'}</span></div><div className="flex justify-between border-t border-[#bd8b35]/25 pt-3"><span className="text-[#778073]">SOLAR RACK LOAD</span><span className="text-[#e7b85d]">{solar ? 'ENABLED' : 'N/A'}</span></div><div className="flex justify-between border-t border-[#bd8b35]/25 pt-3"><span className="text-[#778073]">RECOMMENDATION</span><span className="text-right text-[#e7b85d]">{exposure === 'critical' ? 'FIELD REVIEW' : 'PRE-STORM CHECK'}</span></div></div>
          </div>
        </section>

        <section className="grid gap-5 border-t border-[#bd8b35]/50 pt-8 sm:grid-cols-3">
          <div className="flex gap-4 border border-[#bd8b35]/40 bg-[#101512] p-5"><ShieldCheck className="mt-1 size-5 shrink-0 text-[#e7b85d]" /><div><h3 className="font-mono text-sm uppercase text-[#f0cc7b]">Roof tie-downs</h3><p className="mt-2 font-mono text-xs leading-5 text-[#778073]">Verify clips, straps, and edge zones before wind events exceed design limits.</p></div></div>
          <div className="flex gap-4 border border-[#bd8b35]/40 bg-[#101512] p-5"><Zap className="mt-1 size-5 shrink-0 text-[#e7b85d]" /><div><h3 className="font-mono text-sm uppercase text-[#f0cc7b]">Solar isolation</h3><p className="mt-2 font-mono text-xs leading-5 text-[#778073]">Map rapid shutdown access and array attachment points for responders.</p></div></div>
          <div className="flex gap-4 border border-[#bd8b35]/40 bg-[#101512] p-5"><Wind className="mt-1 size-5 shrink-0 text-[#e7b85d]" /><div><h3 className="font-mono text-sm uppercase text-[#f0cc7b]">Consultation ready</h3><p className="mt-2 font-mono text-xs leading-5 text-[#778073]">Bring this local profile to a licensed inspector for field verification.</p></div></div>
        </section>
        <footer className="mt-10 flex flex-col gap-3 border-t border-[#bd8b35]/30 pt-5 font-mono text-[10px] tracking-[0.15em] text-[#657064] sm:flex-row sm:justify-between"><span>SENTINEL GULF // PRIVATE DIAGNOSTIC CONSOLE</span><span className="flex items-center gap-2"><CircleAlert className="size-3" /> NOT A STRUCTURAL ENGINEERING REPORT</span></footer>
      </div>
    </main>
  )
}

function CpuMark() { return <Cpu className="size-4" /> }
