import { useEffect, useState } from 'react'
import { defaultScripts, leads, objections, outcomeLabels, outcomes, regions } from './scripts'
import './App.css'

const LOGS_KEY = 'voxflow-call-history'
const EDITS_KEY = 'voxflow-script-edits'

const readStored = (key, fallback) => {
  const saved = window.localStorage.getItem(key)
  return saved ? JSON.parse(saved) : fallback
}

function Icon({ name, size = 16 }) {
  const paths = {
    play: <path d="m6 4 14 8-14 8V4Z" />,
    pause: <><path d="M8 5v14" /><path d="M16 5v14" /></>,
    reset: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>,
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    back: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.7L8.1 11a16 16 0 0 0 4.9 4.9l1.8-1.9a2 2 0 0 1 1.7-.6l2.8.5a2 2 0 0 1 1.7 2Z" /></>,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function getRebuttal(regionId, id) {
  const localized = {
    france: {
      time: ['Respecter le moment', '« Je comprends tout à fait, je vous appelle peut-être au mauvais moment. » « Préférez-vous que je vous rappelle demain matin ou en fin de semaine ? »'],
      email: ['Faire un envoi utile', '« Bien sûr. Pour ne vous envoyer que des informations pertinentes, quelle est votre priorité du moment ? » « Je vous prépare un message concis et ne vous relancerai que si cela vous convient. »'],
      budget: ['Revenir à la valeur', '« C’est tout à fait légitime, l’investissement doit être justifié. » « Serait-il utile d’évaluer d’abord le temps ou le coût de votre organisation actuelle ? »'],
      number: ['Répondre avec transparence', '« C’est une question tout à fait légitime. Vos coordonnées professionnelles figurent dans nos informations de contact destinées aux entreprises. » « Je peux noter votre préférence et m’assurer que vous ne soyez plus contacté. »'],
    },
    switzerland: {
      time: ['Respecter le moment', '« Je comprends très bien, je vous appelle peut-être à un moment peu opportun. » « Préféreriez-vous que je vous rappelle demain matin ou un peu plus tard cette semaine ? »'],
      email: ['Faire un envoi utile', '« Bien volontiers. Pour vous transmettre uniquement ce qui pourrait vous être utile, quelle est votre priorité actuellement ? » « Je vous adresserai un message succinct, sans relance si vous le préférez. »'],
      budget: ['Revenir à la valeur', '« Je comprends, l’investissement doit bien entendu être justifié. » « Serait-il utile d’examiner d’abord le temps ou les coûts liés à votre processus actuel ? »'],
      number: ['Répondre avec transparence', '« C’est une question tout à fait légitime. Vos coordonnées professionnelles figurent dans nos informations de contact d’entreprise. » « Je peux noter votre souhait et veiller à ce que vous ne soyez plus contacté. »'],
    },
    belgium: {
      time: ['Respecter le moment', '« Je comprends, je vous appelle sans doute au mauvais moment. » « Vous préférez que je vous rappelle demain matin ou un peu plus tard dans la semaine ? »'],
      email: ['Faire un envoi utile', '« Bien sûr. Pour vous envoyer quelque chose qui vous concerne, c’est quoi votre priorité pour le moment ? » « Je vous prépare un mail court, et je ne vous relance que si ça vous convient. »'],
      budget: ['Revenir à la valeur', '« C’est normal, il faut que l’investissement en vaille la peine. » « Est-ce que ça vous aiderait de regarder d’abord le temps ou les frais que prend votre organisation actuelle ? »'],
      number: ['Répondre avec transparence', '« C’est une question tout à fait légitime. Vos coordonnées professionnelles apparaissent dans nos informations de contact pour les entreprises. » « Je peux noter votre demande et faire en sorte qu’on ne vous rappelle plus. »'],
    },
    luxembourg: {
      time: ['Respecter le moment', '« Je comprends parfaitement, je vous appelle peut-être à un moment qui ne vous convient pas. » « Souhaiteriez-vous que je vous rappelle demain matin ou plus tard cette semaine ? »'],
      email: ['Faire un envoi utile', '« Bien entendu. Afin de vous adresser uniquement des informations pertinentes, quelle est votre priorité actuelle ? » « Je vous prépare un message succinct et ne vous relancerai qu’à votre convenance. »'],
      budget: ['Revenir à la valeur', '« Je comprends, l’investissement doit bien entendu être justifié. » « Serait-il utile d’évaluer d’abord le temps ou les coûts que représente votre fonctionnement actuel ? »'],
      number: ['Répondre avec transparence', '« C’est une question tout à fait légitime. Vos coordonnées professionnelles figurent dans nos informations de contact destinées aux entreprises. » « Je peux noter votre demande et veiller à ce que vous ne soyez plus contacté. »'],
    },
    english: {
      time: ['Respect the moment', '“I completely understand — I may have caught you at a busy time.” “Would tomorrow morning or later this week suit you better for a quick call?”'],
      email: ['Make it relevant', '“Of course. So I only send what is useful, may I ask what your main priority is right now?” “I’ll keep it brief and only follow up if that works for you.”'],
      budget: ['Explore the value', '“That’s fair — the investment needs to make sense.” “Would it help to first look at the time or cost your current process takes?”'],
      number: ['Be transparent', '“That’s a reasonable question. Your business contact details were listed as a professional contact in our outreach records.” “I’m happy to note your preference and make sure we don’t contact you again.”'],
    },
  }
  return localized[regionId][id]
}

function Header({ mode, setMode, view, setView }) {
  return (
    <header className="topbar">
      <a className="brand" href="#" onClick={(event) => event.preventDefault()} aria-label="VoxFlow home">
        <span className="brand-mark">v.</span>
        <span>voxflow</span>
      </a>
      <div className="campaign-switch" aria-label="Campaign mode">
        <button className={mode === 'b2b' ? 'selected' : ''} onClick={() => setMode('b2b')}>B2B Outreach</button>
        <button className={mode === 'b2c' ? 'selected' : ''} onClick={() => setMode('b2c')}>B2C Survey</button>
      </div>
      <nav className="main-nav" aria-label="Main navigation">
        {[
          ['workspace', 'Workspace'],
          ['analytics', 'Analytics'],
          ['editor', 'Script editor'],
        ].map(([id, label]) => (
          <button key={id} className={view === id ? 'active' : ''} onClick={() => setView(id)}>{label}</button>
        ))}
      </nav>
      <div className="topbar-user">
        <span className="online-dot" />
        <span>Camille Martin</span>
        <span className="user-avatar">CM</span>
      </div>
    </header>
  )
}

function Timer({ seconds, running, setRunning, onReset }) {
  const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <section className="timer-section">
      <div className="timer-heading">
        <span className="eyebrow">CALL DURATION</span>
        {running && <span className="live-indicator"><i /> LIVE</span>}
      </div>
      <div className="timer-value">{time}</div>
      <div className="timer-controls">
        <button className="timer-control primary-control" onClick={() => setRunning(!running)} aria-label={running ? 'Pause timer' : 'Start timer'}>
          <Icon name={running ? 'pause' : 'play'} size={15} />
          <span>{running ? 'Pause' : 'Start'}</span>
        </button>
        <button className="timer-control reset-control" onClick={onReset} aria-label="Reset timer">
          <Icon name="reset" size={15} />
          <span>Reset</span>
        </button>
      </div>
    </section>
  )
}

function RegionSelector({ region, onSelect }) {
  return (
    <section className="region-section">
      <span className="eyebrow">REGION & DIALECT</span>
      <div className="region-list">
        {regions.map((item) => (
          <button key={item.id} className={`region-row ${region === item.id ? 'chosen' : ''}`} onClick={() => onSelect(item.id)}>
            <span className="region-code">{item.flag}</span>
            <span className="region-copy"><strong>{item.label}</strong><small>{item.detail}</small></span>
            {region === item.id && <span className="region-check"><Icon name="check" size={13} /></span>}
          </button>
        ))}
      </div>
    </section>
  )
}

function ProspectCard({ lead, current, onNext }) {
  const regionLabel = regions.find((item) => item.id === lead.region)?.label
  return (
    <section className="prospect-section">
      <div className="prospect-heading">
        <span className="eyebrow">UP NEXT <span className="queue-count">{String(current + 1).padStart(2, '0')} / 06</span></span>
        <button className="text-button next-lead" onClick={onNext}>Next <Icon name="arrow" size={13} /></button>
      </div>
      <div className="prospect-card">
        <div className="prospect-person">
          <div className={`prospect-avatar ${lead.color}`}>{lead.initials}</div>
          <div className="prospect-name"><strong>{lead.name}</strong><span>{lead.title}</span></div>
        </div>
        <div className="prospect-details">
          <div><span>COMPANY</span><strong>{lead.company}</strong></div>
          <div><span>LOCATION</span><strong>{lead.city}, {regionLabel}</strong></div>
          <div><span>PHONE</span><strong className="phone-number">{lead.phone}</strong></div>
        </div>
        <a className="call-link" href={`tel:${lead.phone.replaceAll(' ', '')}`}><Icon name="phone" size={14} /> Call prospect</a>
      </div>
    </section>
  )
}

function Workspace({
  region, setRegion, lead, leadIndex, onNextLead, seconds, running, setRunning, onResetTimer,
  node, nodeIndex, nodeCount, onChooseResponse, canGoBack, onBack, onResetScript, notes, setNotes, onLogCall,
  openObjection, setOpenObjection, mode,
}) {
  return (
    <>
      <div className="page-intro workspace-intro">
        <div>
          <div className="intro-kicker"><span className="eyebrow">CALL WORKSPACE</span><span className="intro-dot">·</span><span className="eyebrow">SESSION 01</span></div>
          <h1>Good morning, Camille<span className="period">.</span></h1>
          <p>A little structure. A more thoughtful conversation.</p>
        </div>
        <div className="session-meta">
          <span className="session-meta-label">TODAY’S SESSION</span>
          <strong>Outbound · {mode === 'b2b' ? 'B2B' : 'B2C'}</strong>
          <span className="session-meta-time"><Icon name="clock" size={13} /> Tuesday, 17 November</span>
        </div>
      </div>

      <div className="workspace-grid">
        <aside className="left-panel panel">
          <RegionSelector region={region} onSelect={setRegion} />
          <ProspectCard lead={lead} current={leadIndex} onNext={onNextLead} />
          <Timer seconds={seconds} running={running} setRunning={setRunning} onReset={onResetTimer} />
          <div className="privacy-note"><span className="privacy-mark">i</span><span>Call details stay on this device.</span></div>
        </aside>

        <main className="script-panel panel" key={`${region}-${mode}-${node.id}`}>
          <div className="script-topline">
            <span className="eyebrow">LIVE SCRIPT</span>
            <span className="script-step">STEP {String(nodeIndex + 1).padStart(2, '0')} <span>OF</span> {String(nodeCount).padStart(2, '0')}</span>
          </div>
          <div className="progress-track"><span style={{ width: `${((nodeIndex + 1) / nodeCount) * 100}%` }} /></div>
          <div className="script-copy">
            <div className="stage-label"><span>{String(nodeIndex + 1).padStart(2, '0')}</span><i />{node.stage}</div>
            <p className="script-prompt">{node.prompt}</p>
          </div>
          <div className="responses-area">
            <span className="eyebrow">WHAT DID THEY SAY?</span>
            <div className="response-list">
              {node.responses.map((response, index) => (
                <button className="response-button" key={`${node.id}-${response.label}`} onClick={() => onChooseResponse(response.next)}>
                  <span className="response-number">{String(index + 1).padStart(2, '0')}</span>
                  <span>{response.label}</span>
                  <Icon name="arrow" size={15} />
                </button>
              ))}
            </div>
          </div>
          <div className="script-footer">
            <button className="text-button" onClick={onBack} disabled={!canGoBack}><Icon name="back" size={14} /> Back</button>
            <button className="text-button reset-script" onClick={onResetScript}>Reset conversation</button>
            <span className="script-footer-tip"><Icon name="spark" size={14} /> Take your time</span>
          </div>
          <div className="disposition">
            <div className="disposition-heading">
              <span className="eyebrow">WRAP UP</span>
              <span className="disposition-hint">Save outcome & move to next contact</span>
            </div>
            <input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add a quick note…" aria-label="Call notes" />
            <div className="outcome-buttons">
              {outcomes.map((outcome) => (
                <button key={outcome.id} className={`outcome-button outcome-${outcome.id}`} onClick={() => onLogCall(outcome.id)}>{outcome.label}</button>
              ))}
            </div>
          </div>
        </main>

        <aside className="right-panel panel">
          <div className="objections-heading">
            <span className="eyebrow">A GENTLE NUDGE</span>
            <h2>When they say…</h2>
            <p>Thoughtful ways to keep the conversation open.</p>
          </div>
          <div className="objection-list">
            {objections.map((objection, index) => {
              const isOpen = openObjection === objection.id
              const [heading, copy] = getRebuttal(region, objection.id)
              return (
                <div className={`objection-item ${isOpen ? 'objection-open' : ''}`} key={objection.id}>
                  <button className="objection-trigger" onClick={() => setOpenObjection(isOpen ? null : objection.id)} aria-expanded={isOpen}>
                    <span className="objection-index">{String(index + 1).padStart(2, '0')}</span>
                    <span>{objection.title}</span>
                    <span className="objection-plus">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && <div className="objection-content"><strong>{heading}</strong><p>{copy}</p></div>}
                </div>
              )
            })}
          </div>
          <div className="right-panel-note"><span className="note-line" /><p>Curiosity opens doors.<br />Pressure closes them.</p></div>
        </aside>
      </div>
    </>
  )
}

function Analytics({ logs, onLoadDemo, onExport }) {
  const [regionFilter, setRegionFilter] = useState('all')
  const [outcomeFilter, setOutcomeFilter] = useState('all')
  const completed = logs.filter((log) => log.outcome !== 'no-answer').length
  const average = logs.length ? Math.round(logs.reduce((sum, log) => sum + log.duration, 0) / logs.length) : 0
  const visibleLogs = logs.filter((log) => (
    (regionFilter === 'all' || log.region === regionFilter)
    && (outcomeFilter === 'all' || log.outcome === outcomeFilter)
  ))
  const averageLabel = `${String(Math.floor(average / 60)).padStart(2, '0')}:${String(average % 60).padStart(2, '0')}`

  return (
    <div className="analytics-view">
      <div className="page-intro view-intro">
        <div>
          <span className="eyebrow">YOUR ACTIVITY</span>
          <h1>Call history<span className="period">.</span></h1>
          <p>A clear view of every conversation, all in one place.</p>
        </div>
        <button className="secondary-button export-button" onClick={onExport} disabled={!logs.length}><Icon name="download" size={15} /> Export CSV</button>
      </div>
      <div className="stats-grid">
        <article className="stat-card"><span className="eyebrow">TOTAL CALLS</span><strong>{String(logs.length).padStart(2, '0')}</strong><span className="stat-caption">Conversations logged</span></article>
        <article className="stat-card"><span className="eyebrow">COMPLETION RATE</span><strong>{logs.length ? `${Math.round((completed / logs.length) * 100)}%` : '—'}</strong><span className="stat-caption">Completed conversations</span></article>
        <article className="stat-card"><span className="eyebrow">AVERAGE DURATION</span><strong className="stat-duration">{logs.length ? averageLabel : '—:—'}</strong><span className="stat-caption">Minutes : seconds</span></article>
      </div>
      <section className="history-section">
        <div className="history-heading">
          <div><span className="eyebrow">RECENT ACTIVITY</span><h2>All conversations</h2></div>
          <div className="filter-group">
            <label className="sr-only" htmlFor="region-filter">Filter by region</label>
            <select id="region-filter" value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}>
              <option value="all">All regions</option>
              {regions.map((region) => <option key={region.id} value={region.id}>{region.label}</option>)}
            </select>
            <label className="sr-only" htmlFor="outcome-filter">Filter by outcome</label>
            <select id="outcome-filter" value={outcomeFilter} onChange={(event) => setOutcomeFilter(event.target.value)}>
              <option value="all">All outcomes</option>
              {outcomes.map((outcome) => <option key={outcome.id} value={outcome.id}>{outcome.label}</option>)}
            </select>
          </div>
        </div>
        {visibleLogs.length ? (
          <div className="table-scroll">
            <table className="history-table">
              <thead><tr><th>CONTACT</th><th>REGION</th><th>DATE</th><th>DURATION</th><th>OUTCOME</th><th>NOTE</th></tr></thead>
              <tbody>
                {visibleLogs.map((log) => (
                  <tr key={log.id}>
                    <td><div className="table-contact"><span className="table-avatar">{log.initials}</span><span><strong>{log.name}</strong><small>{log.company}</small></span></div></td>
                    <td>{regions.find((region) => region.id === log.region)?.label || log.region}</td>
                    <td>{new Date(log.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td>
                    <td className="table-duration">{String(Math.floor(log.duration / 60)).padStart(2, '0')}:{String(log.duration % 60).padStart(2, '0')}</td>
                    <td><span className={`status-pill status-${log.outcome}`}>{outcomeLabels[log.outcome]}</span></td>
                    <td className="table-note">{log.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon"><Icon name="phone" size={20} /></div>
            <h3>{logs.length ? 'No conversations match these filters' : 'A fresh page'}</h3>
            <p>{logs.length ? 'Try adjusting your region or outcome.' : 'Your call notes and outcomes will appear here after your first conversation.'}</p>
            {!logs.length && <button className="text-button demo-button" onClick={onLoadDemo}>Load demo data <Icon name="arrow" size={14} /></button>}
          </div>
        )}
      </section>
    </div>
  )
}

function ScriptEditor({ region, mode, edits, onChange, onRestore }) {
  const regionLabel = regions.find((item) => item.id === region)?.label
  const script = defaultScripts[region]
  return (
    <div className="editor-view">
      <div className="page-intro view-intro">
        <div>
          <span className="eyebrow">MAKE IT YOURS</span>
          <h1>Script editor<span className="period">.</span></h1>
          <p>Shape every prompt to sound like you. Your edits are saved on this device.</p>
        </div>
        <button className="secondary-button" onClick={onRestore}><Icon name="reset" size={15} /> Restore defaults</button>
      </div>
      <div className="editor-context">
        <span><span className="context-label">REGION</span><strong>{regionLabel}</strong></span>
        <span className="editor-divider" />
        <span><span className="context-label">CAMPAIGN</span><strong>{mode === 'b2b' ? 'B2B Outreach' : 'B2C Survey'}</strong></span>
        <span className="editor-context-note"><Icon name="check" size={14} /> Changes save as you type</span>
      </div>
      <div className="editor-list">
        {script.map((node, index) => {
          const editKey = `${mode}:${region}:${node.id}`
          const text = edits[editKey] ?? node.prompt[mode]
          return (
            <section className="editor-card" key={node.id}>
              <div className="editor-card-meta">
                <span className="editor-node-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="eyebrow">{node.stage}</span>
                <span className="editor-card-title">{node.id === 'opener' ? 'Opening thought' : node.id === 'close' ? 'Closing thought' : node.id[0].toUpperCase() + node.id.slice(1)}</span>
              </div>
              <label className="sr-only" htmlFor={`script-${node.id}`}>Edit {node.stage} prompt</label>
              <textarea id={`script-${node.id}`} value={text} onChange={(event) => onChange(editKey, event.target.value)} rows={3} />
              <span className="character-count">{text.length} characters</span>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function App() {
  const [mode, setMode] = useState('b2b')
  const [view, setView] = useState('workspace')
  const [region, setRegion] = useState('france')
  const [leadIndex, setLeadIndex] = useState(0)
  const [nodeId, setNodeId] = useState('opener')
  const [history, setHistory] = useState([])
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [notes, setNotes] = useState('')
  const [openObjection, setOpenObjection] = useState(null)
  const [logs, setLogs] = useState(() => readStored(LOGS_KEY, []))
  const [edits, setEdits] = useState(() => readStored(EDITS_KEY, {}))
  const [storageError, setStorageError] = useState('')
  const lead = leads[leadIndex]
  const script = defaultScripts[region]
  const nodeIndex = script.findIndex((node) => node.id === nodeId)
  const baseNode = script.find((node) => node.id === nodeId) || script[0]
  const node = {
    ...baseNode,
    prompt: edits[`${mode}:${region}:${baseNode.id}`] ?? baseNode.prompt[mode],
  }

  useEffect(() => {
    if (!running) return undefined
    const timerId = window.setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => window.clearInterval(timerId)
  }, [running])

  const persist = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      setStorageError('')
    } catch (error) {
      console.error(`Unable to save ${key} to localStorage.`, error)
      setStorageError('Your browser could not save this change. Check your device storage settings and try again.')
    }
  }

  const changeRegion = (value) => {
    setRegion(value)
    setNodeId('opener')
    setHistory([])
  }
  const chooseResponse = (next) => {
    setHistory((previous) => [...previous, nodeId])
    setNodeId(next)
  }
  const resetTimer = () => {
    setRunning(false)
    setSeconds(0)
  }
  const advanceLead = () => {
    setLeadIndex((current) => (current + 1) % leads.length)
    setNodeId('opener')
    setHistory([])
    setNotes('')
    resetTimer()
  }
  const logCall = (outcome) => {
    const record = {
      id: `${Date.now()}-${leadIndex}`,
      name: lead.name,
      initials: lead.initials,
      company: lead.company,
      region,
      outcome,
      duration: seconds,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    }
    const updatedLogs = [record, ...logs]
    setLogs(updatedLogs)
    persist(LOGS_KEY, updatedLogs)
    advanceLead()
  }
  const updateScript = (key, text) => {
    const updatedEdits = { ...edits, [key]: text }
    setEdits(updatedEdits)
    persist(EDITS_KEY, updatedEdits)
  }
  const restoreScripts = () => {
    setEdits({})
    try {
      window.localStorage.removeItem(EDITS_KEY)
      setStorageError('')
    } catch (error) {
      console.error('Unable to restore the default scripts.', error)
      setStorageError('Your browser could not restore defaults. Check your device storage settings and try again.')
    }
  }
  const loadDemo = () => {
    const samples = [
      { id: 'demo-1', name: 'Sophie Laurent', initials: 'SL', company: 'Maison Rive', region: 'france', outcome: 'qualified', duration: 248, notes: 'Interested in a follow-up next week.' },
      { id: 'demo-2', name: 'Marc Dubois', initials: 'MD', company: 'Atelier Nord', region: 'france', outcome: 'callback', duration: 132, notes: 'Call after the quarterly review.' },
      { id: 'demo-3', name: 'Claire Morel', initials: 'CM', company: 'Bellecour Studio', region: 'switzerland', outcome: 'not-interested', duration: 94, notes: '' },
      { id: 'demo-4', name: 'Thomas Peeters', initials: 'TP', company: 'Northstar Works', region: 'belgium', outcome: 'no-answer', duration: 26, notes: 'No answer.' },
    ].map((sample, index) => ({ ...sample, createdAt: new Date(Date.now() - index * 86400000).toISOString() }))
    setLogs(samples)
    persist(LOGS_KEY, samples)
  }
  const exportCsv = () => {
    const escapeCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`
    const rows = [
      ['Name', 'Company', 'Region', 'Date', 'Duration (seconds)', 'Outcome', 'Notes'],
      ...logs.map((log) => [log.name, log.company, regions.find((item) => item.id === log.region)?.label || log.region, new Date(log.createdAt).toLocaleDateString('en-GB'), log.duration, outcomeLabels[log.outcome], log.notes]),
    ]
    const csv = rows.map((row) => row.map(escapeCell).join(',')).join('\r\n')
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    link.download = 'voxflow-call-history.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }
  const goBack = () => {
    if (!history.length) return
    setNodeId(history[history.length - 1])
    setHistory(history.slice(0, -1))
  }

  return (
    <div className="app-shell">
      <Header mode={mode} setMode={setMode} view={view} setView={setView} />
      <div className="content-wrap">
        {storageError && <div className="storage-alert" role="alert">{storageError}<button onClick={() => setStorageError('')} aria-label="Dismiss notice">×</button></div>}
        {view === 'analytics' ? (
          <Analytics logs={logs} onLoadDemo={loadDemo} onExport={exportCsv} />
        ) : view === 'editor' ? (
          <ScriptEditor region={region} mode={mode} edits={edits} onChange={updateScript} onRestore={restoreScripts} />
        ) : (
          <Workspace
            region={region} setRegion={changeRegion} lead={lead} leadIndex={leadIndex} onNextLead={advanceLead}
            seconds={seconds} running={running} setRunning={setRunning} onResetTimer={resetTimer}
            node={node} nodeIndex={Math.max(nodeIndex, 0)} nodeCount={script.length} onChooseResponse={chooseResponse}
            canGoBack={history.length > 0} onBack={goBack} onResetScript={() => { setNodeId('opener'); setHistory([]) }}
            notes={notes} setNotes={setNotes} onLogCall={logCall}
            openObjection={openObjection} setOpenObjection={setOpenObjection} mode={mode}
          />
        )}
        <footer className="app-footer"><span>VOXFLOW <i>·</i> MADE FOR BETTER CONVERSATIONS</span><span>Private by design</span></footer>
      </div>
    </div>
  )
}

export default App
