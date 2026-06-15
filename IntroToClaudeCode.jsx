import { useState, useRef, useEffect } from "react";

const SYSTEM = `You are a practical guide to Claude Code for developers in corporate/enterprise environments. Claude Code is Anthropic's agentic coding assistant that runs in the terminal (CLI). Be concise and practical. Include actual terminal commands or slash commands in backtick code blocks. Under 200 words unless truly needed. Write for developers new to Claude Code but competent engineers.`;

function TerminalMockup() {
  return (
    <div style={{ background:"#0d0d0d", borderRadius:8, padding:"20px 22px", fontFamily:"'Courier New', Consolas, monospace", fontSize:13, margin:"12px 0", lineHeight:1.6 }}>
      <div style={{ border:"1px solid #cd7f32", borderRadius:4, padding:"16px 20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:16 }}>
        <div>
          <div style={{ color:"#cd7f32", fontWeight:"bold", marginBottom:10 }}>Claude Code v2.1.29</div>
          <div style={{ color:"#ffffff", marginBottom:10 }}>Welcome back!</div>
          <div style={{ color:"#cd7f32", fontSize:14, marginBottom:10, lineHeight:1.8 }}><div>{"▶  ▶  ▶"}</div><div>{"●  ●  ●"}</div></div>
          <div style={{ color:"#cccccc", fontSize:12 }}>Sonnet 4.6 · Claude Pro</div>
          <div style={{ color:"#888888", fontSize:12 }}>C:\Users\YourName</div>
        </div>
        <div style={{ borderLeft:"1px solid #333", paddingLeft:16 }}>
          <div style={{ color:"#cd7f32", fontWeight:"bold", marginBottom:6 }}>Tips for getting started</div>
          <div style={{ color:"#888888", fontSize:12, marginBottom:4 }}>Run /init to create a CLAUDE.md</div>
          <div style={{ color:"#888888", fontSize:12, marginBottom:14 }}>Run /help to see all commands</div>
          <div style={{ color:"#cd7f32", fontWeight:"bold", marginBottom:6 }}>Recent activity</div>
          <div style={{ color:"#888888", fontSize:12 }}>No recent activity</div>
        </div>
      </div>
      <div style={{ color:"#cd7f32", marginBottom:8 }}>{">"} <span style={{ color:"#fff", background:"#2a2a2a", padding:"1px 6px" }}>review my login function</span></div>
      <div style={{ color:"#cd7f32", marginBottom:10 }}>{"+"} Hashing... (thinking)</div>
      <div style={{ color:"#ccc", marginBottom:10 }}>{">"} <span style={{ display:"inline-block", width:8, height:13, background:"#ccc", verticalAlign:"middle" }}/></div>
      <div style={{ color:"#666666", fontSize:12 }}>esc to interrupt</div>
      <div style={{ color:"#555555", fontSize:11, marginTop:10, borderTop:"1px solid #222", paddingTop:8 }}>↑ Claude Code running in Windows Terminal / PowerShell</div>
    </div>
  );
}

function PermissionMockup() {
  return (
    <div style={{ background:"#0d0d0d", borderRadius:8, padding:"16px 18px", fontFamily:"'Courier New', Consolas, monospace", fontSize:13, margin:"12px 0", lineHeight:1.6 }}>
      <div style={{ color:"#ccc", marginBottom:8 }}>{">"} run the test suite and fix any failures</div>
      <div style={{ color:"#888", marginBottom:4 }}>{"●"} Reading package.json...</div>
      <div style={{ color:"#888", marginBottom:12 }}>{"●"} Planning execution...</div>
      <div style={{ border:"1px solid #cd7f32", borderRadius:4, padding:"10px 14px", marginBottom:10 }}>
        <div style={{ color:"#cd7f32", fontWeight:"bold", marginBottom:4 }}>Claude wants to run a bash command:</div>
        <div style={{ color:"#fff", marginBottom:8 }}>npm test</div>
        <div style={{ color:"#888" }}>Allow? <span style={{ color:"#3fb950" }}>(y)</span>es / <span style={{ color:"#f85149" }}>(n)</span>o / <span style={{ color:"#79c0ff" }}>(a)</span>lways allow bash</div>
      </div>
      <div style={{ color:"#555", fontSize:11, borderTop:"1px solid #222", paddingTop:8 }}>↑ Claude always asks before running any command. You stay in control.</div>
    </div>
  );
}

const CATEGORIES = [
  {
    label: "Getting Started", icon: "ti-rocket",
    qs: [
      { text: "What is Claude Code?", mockup: null },
      { text: "What does the terminal look like?", mockup: "terminal" },
      { text: "How do I install and launch it?", mockup: null },
      { text: "How is it different from Claude.ai?", mockup: null },
    ]
  },
  {
    label: "Day-to-Day Use", icon: "ti-terminal-2",
    qs: [
      { text: "How do I give Claude Code a task?", mockup: null },
      { text: "What are permission prompts?", mockup: "permission" },
      { text: "How do I reference a specific file?", mockup: null },
      { text: "Can I pipe data into Claude Code?", mockup: null },
    ]
  },
  {
    label: "Slash Commands", icon: "ti-command",
    qs: [
      { text: "What slash commands should I know?", mockup: null },
      { text: "What does /clear do?", mockup: null },
      { text: "What does /compact do?", mockup: null },
      { text: "What is CLAUDE.md?", mockup: null },
    ]
  },
  {
    label: "Enterprise", icon: "ti-building",
    qs: [
      { text: "Is Claude Code safe for corporate use?", mockup: null },
      { text: "How do teams share Claude Code setups?", mockup: null },
      { text: "What about data privacy?", mockup: null },
      { text: "Do I need an API key at work?", mockup: null },
    ]
  },
];

function renderText(text) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(`[^`]+`)/g);
    return (
      <div key={i} style={{ minHeight: line === "" ? "0.75em" : undefined }}>
        {parts.map((p, j) =>
          p.startsWith("`") && p.endsWith("`") && p.length > 2
            ? <code key={j} style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", padding:"1px 5px", borderRadius:4, fontSize:12.5, fontFamily:"var(--font-mono)", color:"var(--color-text-primary)" }}>{p.slice(1,-1)}</code>
            : <span key={j}>{p}</span>
        )}
      </div>
    );
  });
}

export default function App() {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Hi — I can help you get up to speed on Claude Code.\n\nPick a question from the sidebar, or type your own below.",
    mockup: null
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openCat, setOpenCat] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    const t = document.createElement("link"); t.rel = "stylesheet";
    t.href = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css";
    document.head.appendChild(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text, mockup = null) => {
    if (!text.trim() || loading) return;
    const um = { role: "user", content: text };
    const hist = [...messages, um];
    setMessages(hist);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000, system: SYSTEM,
          messages: hist.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "No response.";
      setMessages(p => [...p, { role: "assistant", content: reply, mockup }]);
    } catch (e) {
      setMessages(p => [...p, { role: "assistant", content: `Error: ${e.message}`, mockup: null }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display:"flex", height:"100vh", background:"var(--color-background-primary)", color:"var(--color-text-primary)", fontFamily:"var(--font-sans)", fontSize:14, overflow:"hidden" }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .sb-btn { display:flex; align-items:center; gap:8px; width:100%; padding:6px 10px; background:transparent; border:none; color:var(--color-text-secondary); font-size:13px; font-family:var(--font-sans); cursor:pointer; border-radius:var(--border-radius-md); text-align:left; }
        .sb-btn:hover { background:var(--color-background-tertiary); color:var(--color-text-primary); }
        .cat-head { display:flex; align-items:center; gap:8px; width:100%; padding:6px 10px; background:transparent; border:none; color:var(--color-text-secondary); font-size:13px; font-weight:500; font-family:var(--font-sans); cursor:pointer; border-radius:var(--border-radius-md); text-align:left; }
        .cat-head:hover { background:var(--color-background-tertiary); color:var(--color-text-primary); }
        .q-btn { display:block; width:100%; padding:5px 8px 5px 24px; background:transparent; border:none; color:var(--color-text-tertiary); font-size:12.5px; font-family:var(--font-sans); cursor:pointer; text-align:left; border-radius:var(--border-radius-md); line-height:1.4; }
        .q-btn:hover { background:var(--color-background-tertiary); color:var(--color-text-primary); }
        .new-btn { display:flex; align-items:center; gap:7px; width:100%; padding:7px 10px; background:transparent; border:0.5px solid var(--color-border-secondary); color:var(--color-text-primary); font-size:13px; font-family:var(--font-sans); cursor:pointer; border-radius:var(--border-radius-md); font-weight:500; }
        .new-btn:hover { background:var(--color-background-tertiary); }
        .send-btn { background:transparent; border:none; color:var(--color-text-tertiary); cursor:pointer; padding:6px; border-radius:var(--border-radius-md); display:flex; align-items:center; }
        .send-btn:hover { color:var(--color-text-primary); background:var(--color-background-tertiary); }
        .send-btn:disabled { opacity:0.3; cursor:not-allowed; }
        textarea { outline:none; resize:none; background:transparent; border:none; color:var(--color-text-primary); font-family:var(--font-sans); font-size:14px; width:100%; line-height:1.5; }
        textarea::placeholder { color:var(--color-text-tertiary); }
        .accept-btn { background:transparent; border:0.5px solid var(--color-border-tertiary); border-radius:var(--border-radius-md); padding:4px 10px; color:var(--color-text-secondary); font-size:12px; font-family:var(--font-sans); cursor:pointer; display:flex; align-items:center; gap:5px; }
        .accept-btn:hover { background:var(--color-background-secondary); }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width:196, background:"var(--color-background-secondary)", borderRight:"0.5px solid var(--color-border-tertiary)", display:"flex", flexDirection:"column", flexShrink:0 }}>

        <div style={{ padding:"12px 12px 10px", display:"flex", alignItems:"center", gap:10, borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
          <i className="ti ti-layout-sidebar" style={{ fontSize:15, color:"var(--color-text-tertiary)" }}/>
          <i className="ti ti-layout-columns" style={{ fontSize:15, color:"var(--color-text-tertiary)" }}/>
          <span style={{ fontSize:16, color:"#f97316", marginLeft:2 }}>✺</span>
          <span style={{ fontSize:13, fontWeight:500 }}>Code</span>
        </div>

        <div style={{ padding:"10px 10px 6px" }}>
          <button className="new-btn">
            <i className="ti ti-plus" style={{ fontSize:14 }}/> New session
          </button>
        </div>

        <div style={{ padding:"4px 6px" }}>
          <button className="sb-btn"><i className="ti ti-repeat" style={{ fontSize:14 }}/> Routines</button>
          <button className="sb-btn"><i className="ti ti-adjustments" style={{ fontSize:14 }}/> Customize</button>
          <button className="sb-btn"><i className="ti ti-dots" style={{ fontSize:14 }}/> More</button>
        </div>

        <div style={{ height:"0.5px", background:"var(--color-border-tertiary)", margin:"4px 0" }}/>

        <div style={{ flex:1, overflowY:"auto", padding:"6px 6px" }}>
          <div style={{ fontSize:11, color:"var(--color-text-tertiary)", padding:"4px 10px 6px", letterSpacing:"0.07em", textTransform:"uppercase" }}>Questions</div>
          {CATEGORIES.map((cat, ci) => (
            <div key={ci}>
              <button className="cat-head" onClick={() => setOpenCat(openCat === ci ? -1 : ci)}>
                <i className={`ti ${cat.icon}`} style={{ fontSize:13 }}/>
                <span style={{ flex:1 }}>{cat.label}</span>
                <i className={`ti ti-chevron-${openCat===ci?"down":"right"}`} style={{ fontSize:11 }}/>
              </button>
              {openCat === ci && cat.qs.map((q, qi) => (
                <button key={qi} className="q-btn" onClick={() => send(q.text, q.mockup)}>
                  {q.text}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop:"0.5px solid var(--color-border-tertiary)", padding:"8px 6px" }}>
          <div style={{ fontSize:11, color:"var(--color-text-tertiary)", padding:"4px 10px 6px", letterSpacing:"0.07em", textTransform:"uppercase" }}>Recents</div>
          <button className="sb-btn">
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#f97316", flexShrink:0 }}/>
            <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontSize:12.5 }}>Intro to Claude Code</span>
          </button>
        </div>

        <div style={{ borderTop:"0.5px solid var(--color-border-tertiary)", padding:"10px 12px", display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:26, height:26, borderRadius:"50%", background:"#f9731618", border:"1px solid #f9731640", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#f97316", fontWeight:700 }}>J</div>
          <span style={{ fontSize:13, flex:1 }}>Jessica</span>
          <span style={{ fontSize:10, background:"#f9731614", color:"#f97316", padding:"2px 6px", borderRadius:4 }}>Pro</span>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        <div style={{ height:44, borderBottom:"0.5px solid var(--color-border-tertiary)", display:"flex", alignItems:"center", padding:"0 18px", gap:8, flexShrink:0 }}>
          <i className="ti ti-arrow-left" style={{ fontSize:14, color:"var(--color-text-tertiary)" }}/>
          <i className="ti ti-arrow-right" style={{ fontSize:14, color:"var(--color-text-tertiary)" }}/>
          <i className="ti ti-refresh" style={{ fontSize:14, color:"var(--color-text-tertiary)", marginRight:6 }}/>
          <span style={{ fontSize:13, color:"var(--color-text-tertiary)" }}>sessions</span>
          <span style={{ fontSize:13, color:"var(--color-text-tertiary)" }}>/</span>
          <span style={{ fontSize:13, fontWeight:500 }}>Intro to Claude Code</span>
          <i className="ti ti-chevron-down" style={{ fontSize:11, color:"var(--color-text-tertiary)" }}/>
          <div style={{ flex:1 }}/>
          <i className="ti ti-layout-columns" style={{ fontSize:15, color:"var(--color-text-tertiary)" }}/>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"24px 24px 16px" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom:20 }}>
              {m.role === "user" ? (
                <div style={{ display:"flex", justifyContent:"flex-end" }}>
                  <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"12px 12px 2px 12px", padding:"10px 14px", maxWidth:"72%", lineHeight:1.65 }}>
                    {m.content}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                    <span style={{ color:"#f97316", fontSize:16, flexShrink:0, marginTop:2 }}>✺</span>
                    <div style={{ lineHeight:1.75, flex:1 }}>{renderText(m.content)}</div>
                  </div>
                  {m.mockup === "terminal" && <div style={{ marginLeft:26 }}><TerminalMockup/></div>}
                  {m.mockup === "permission" && <div style={{ marginLeft:26 }}><PermissionMockup/></div>}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <span style={{ color:"#f97316", fontSize:16 }}>✺</span>
              <i className="ti ti-loader" style={{ fontSize:14, color:"var(--color-text-tertiary)", animation:"spin 1s linear infinite" }}/>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        <div style={{ padding:"10px 18px 6px", flexShrink:0 }}>
          <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-secondary)", borderRadius:"var(--border-radius-lg)", display:"flex", alignItems:"flex-end", gap:8, padding:"10px 14px" }}>
            <textarea value={input} rows={1}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(input);} }}
              placeholder="Type / for commands"
            />
            <button className="send-btn" onClick={() => send(input)} disabled={loading||!input.trim()}>
              <i className="ti ti-arrow-up" style={{ fontSize:16 }}/>
            </button>
          </div>
        </div>

        <div style={{ padding:"6px 18px 14px", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <button className="accept-btn">
            <i className="ti ti-check" style={{ fontSize:12 }}/> Accept edits <span style={{ color:"var(--color-text-tertiary)" }}>+</span>
          </button>
          <div style={{ flex:1 }}/>
          <span style={{ fontSize:12, color:"var(--color-text-tertiary)" }}>Sonnet 4.6</span>
          <span style={{ fontSize:11, color:"#57ab5a", background:"#57ab5a18", padding:"2px 7px", borderRadius:4 }}>Low</span>
          <i className="ti ti-battery-2" style={{ fontSize:14, color:"var(--color-text-tertiary)" }}/>
        </div>
      </div>
    </div>
  );
}
