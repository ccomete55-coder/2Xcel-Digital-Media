import React, { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, X, PhoneOff, Loader2, AudioLines } from 'lucide-react';

// ============================================================================
// 2XceL VOICE CONCIERGE  ("Lumen")
// White-label by design: NO vendor names appear anywhere in this UI.
// The voice transport is configured via env vars (public key only — never a secret).
// ============================================================================

// Client-facing assistant name. Change here to rebrand the concierge.
const ASSISTANT_NAME = 'Lumen';

const PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY as string | undefined;
const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID as string | undefined;

type CallState = 'idle' | 'connecting' | 'active' | 'error';

export const VoiceConcierge: React.FC = () => {
  const [state, setState] = useState<CallState>('idle');
  const [open, setOpen] = useState(false);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);

  // Don't render anything if the concierge isn't configured yet.
  const configured = Boolean(PUBLIC_KEY && ASSISTANT_ID);

  useEffect(() => {
    if (!configured) return;
    const vapi = new Vapi(PUBLIC_KEY as string);
    vapiRef.current = vapi;

    vapi.on('call-start', () => setState('active'));
    vapi.on('call-end', () => { setState('idle'); setAssistantSpeaking(false); });
    vapi.on('speech-start', () => setAssistantSpeaking(true));
    vapi.on('speech-end', () => setAssistantSpeaking(false));
    vapi.on('error', (e: unknown) => { console.error('[concierge] error', e); setState('error'); });

    return () => { try { vapi.stop(); } catch { /* noop */ } };
  }, [configured]);

  const startCall = async () => {
    if (!vapiRef.current || !ASSISTANT_ID) return;
    setOpen(true);
    setState('connecting');
    try {
      await vapiRef.current.start(ASSISTANT_ID);
    } catch (e) {
      console.error('[concierge] start failed', e);
      setState('error');
    }
  };

  const endCall = () => {
    try { vapiRef.current?.stop(); } catch { /* noop */ }
    setState('idle');
  };

  if (!configured) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[120] flex flex-col items-end gap-3">
      {/* Expanded panel */}
      {open && (
        <div className="w-[280px] rounded-2xl bg-[#0d1219] border border-white/10 shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-brand-orange via-brand-orange/60 to-[#2B8ED9]" />
          <div className="p-5 flex flex-col items-center gap-4 text-center">
            <button
              onClick={() => { endCall(); setOpen(false); }}
              aria-label="Close voice concierge"
              className="self-end -mt-1 -mr-1 text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Status orb */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  state === 'active'
                    ? 'bg-brand-orange/20 border-2 border-brand-orange'
                    : 'bg-white/5 border-2 border-white/10'
                }`}
                style={assistantSpeaking ? { boxShadow: '0 0 0 8px rgba(230,92,43,0.12)' } : undefined}
              >
                {state === 'connecting' ? (
                  <Loader2 size={28} className="text-brand-orange animate-spin" />
                ) : state === 'active' ? (
                  <AudioLines size={28} className={`text-brand-orange ${assistantSpeaking ? 'animate-pulse' : ''}`} />
                ) : (
                  <Mic size={28} className="text-gray-300" />
                )}
              </div>
            </div>

            <div>
              <div className="text-white font-bold text-base">{ASSISTANT_NAME}</div>
              <div className="text-sm text-gray-400">
                {state === 'connecting' && 'Connecting…'}
                {state === 'active' && (assistantSpeaking ? 'Speaking…' : 'Listening…')}
                {state === 'idle' && 'Your 2XceL concierge'}
                {state === 'error' && 'Connection issue — try again'}
              </div>
            </div>

            {state === 'active' || state === 'connecting' ? (
              <button
                onClick={endCall}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-red-500/80 text-white border border-white/10 rounded-full px-5 py-2.5 text-sm font-bold transition-colors cursor-pointer"
              >
                <PhoneOff size={16} /> End
              </button>
            ) : (
              <button
                onClick={startCall}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-5 py-2.5 text-sm font-bold shadow-lg shadow-brand-orange/25 transition-colors cursor-pointer"
              >
                <Mic size={16} /> Start talking
              </button>
            )}
            <p className="text-xs text-gray-500 leading-snug">Ask about web design, AI sales agents, media, or pricing.</p>
          </div>
        </div>
      )}

      {/* Launcher button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); }}
          aria-label={`Talk to ${ASSISTANT_NAME}, the 2XceL voice concierge`}
          className="group flex items-center gap-2.5 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-sm rounded-full pl-4 pr-5 py-3 shadow-2xl shadow-brand-orange/30 border border-brand-orange/40 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <span className="relative flex items-center justify-center">
            <Mic size={18} />
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-white -top-1 -right-1 animate-ping" />
          </span>
          Talk to {ASSISTANT_NAME}
        </button>
      )}
    </div>
  );
};
