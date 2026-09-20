#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate the canonical 42:40 corporal sound score for La terraza del Miramar.

30 exact scene files. Sound materials:
TUM · TA · AH · CLAC · TAC · BRR · RAS/SHH · PLIP
Essential words only:
MAR · MIRAMAR · OK · COMUNIDAD · RAM · DIEZ MINUTOS
plus one occurrence of «Mira mar. Mar mira.»

The score is generative but deterministic (fixed random seed).
"""
from pathlib import Path
import hashlib, json, math, os, random, subprocess, tempfile
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt, resample_poly

SR=44100
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"audio"/"corporal"
OUT.mkdir(parents=True, exist_ok=True)

TITLES=[
"MIRAMAR COMUNIDAD","OK","EL CUERPO","CLAC","NADIE","NACE EL CONFLICTO",
"PRIMERA INCURSIÓN TERRESTRE","TERRITORIO","MAYORÍA SIMPLE","VOTEN","MAYORÍA SIMPLE",
"NOSOTROS","DERECHO","TOGA · BANDERA · REINA","MÍRENME","ESTADO","VIENTO","EL SOL",
"CONFORME A DERECHO","QUE CONSTE","EL REINO CABE EN UNA CARPETA","MIRAMAR","INNOVAR",
"¿QUIÉN GOBIERNA?","RUMOR","CENTRO DE DATOS","MIRA QUIÉN MIRA QUIÉN","CÓMO SEGUIMOS",
"DESARMAR A LA REINA","DIEZ MINUTOS"
]
DUR=[80,45,80,60,60,90,75,90,75,75,60,75,75,90,75,90,90,75,90,75,75,90,90,75,75,90,90,90,150,210]
assert sum(DUR)==2560
rng=np.random.default_rng(270918)

def stereo(x,pan=0):
    pan=max(-1,min(1,pan)); th=(pan+1)*math.pi/4
    return np.column_stack((x*math.cos(th),x*math.sin(th))).astype(np.float32)

def add(buf,snd,t,pan=0,gain=1):
    i=int(round(t*SR))
    if i>=len(buf): return
    if snd.ndim==1: snd=stereo(snd,pan)
    n=min(len(snd),len(buf)-i)
    if n>0: buf[i:i+n]+=snd[:n]*gain

def thump(length=.48,amp=.7,freq=58):
    n=max(1,int(round(length*SR))); t=np.arange(n)/SR
    f=freq+42*np.exp(-t*20); ph=2*np.pi*np.cumsum(f)/SR
    body=np.sin(ph)*np.exp(-t*8)
    noise=rng.normal(0,1,n)*np.exp(-t*35)
    noise=sosfilt(butter(2,900,btype="low",fs=SR,output="sos"),noise)
    return (amp*(.88*body+.12*noise)).astype(np.float32)

def slap(length=.18,amp=.45):
    n=max(1,int(round(length*SR))); t=np.arange(n)/SR
    y=sosfilt(butter(2,[550,5000],btype="bandpass",fs=SR,output="sos"),rng.normal(0,1,n))*np.exp(-t*26)
    return (amp*y/(np.max(np.abs(y))+1e-9)).astype(np.float32)

def click(length=.08,amp=.5,pitch=1800):
    n=max(1,int(round(length*SR))); t=np.arange(n)/SR
    y=(np.sin(2*np.pi*pitch*t)+.5*np.sin(2*np.pi*pitch*2.17*t))*np.exp(-t*60)
    y+=.25*rng.normal(0,1,n)*np.exp(-t*80)
    return (amp*y/(np.max(np.abs(y))+1e-9)).astype(np.float32)

def clac():
    return np.concatenate([click(.07,.55,1600),np.zeros(int(round(.045*SR)),np.float32),click(.06,.4,2300)])

def tac(length=.26,amp=.62):
    n=max(1,int(round(length*SR))); t=np.arange(n)/SR
    low=np.sin(2*np.pi*105*t)*np.exp(-t*15)
    hi=np.sin(2*np.pi*2700*t)*np.exp(-t*38)
    no=rng.normal(0,1,n)*np.exp(-t*55)
    return (amp*(.55*low+.22*hi+.08*no)).astype(np.float32)

def brr(length=1.3,amp=.22,freq=94):
    n=max(1,int(round(length*SR))); t=np.arange(n)/SR
    mod=.55+.45*np.sin(2*np.pi*7.3*t)
    y=(np.sin(2*np.pi*freq*t)+.34*np.sin(2*np.pi*2*freq*t)+.18*np.sin(2*np.pi*3*freq*t))*mod
    e=np.minimum(1,t/.03)*np.minimum(1,np.maximum(0,(length-t)/.08))
    return (amp*y*e).astype(np.float32)

def sweep(length=1.2,amp=.15,lo=500,hi=8000):
    n=max(1,int(round(length*SR))); t=np.arange(n)/SR
    y=sosfilt(butter(2,[lo,min(hi,SR/2-100)],btype="bandpass",fs=SR,output="sos"),rng.normal(0,1,n))
    e=np.sin(np.pi*np.clip(t/length,0,1))**1.4
    return (amp*y/(np.max(np.abs(y))+1e-9)*e).astype(np.float32)

def breath(length=1,amp=.12,voiced=False,exact_n=None):
    n=exact_n if exact_n is not None else max(1,int(round(length*SR))); t=np.arange(n)/SR
    y=sosfilt(butter(2,[250,6500],btype="bandpass",fs=SR,output="sos"),rng.normal(0,1,n))
    y=y/(np.max(np.abs(y))+1e-9)
    e=np.sin(np.pi*np.clip(t/max(length,n/SR,1e-6),0,1))**1.6
    if voiced: y=.7*y+.3*np.sin(2*np.pi*185*t)
    return (amp*y*e).astype(np.float32)

def plip(length=.8,amp=.22):
    n=max(1,int(round(length*SR))); t=np.arange(n)/SR
    f=1400*np.exp(-t*5)+420; ph=2*np.pi*np.cumsum(f)/SR
    return (amp*np.sin(ph)*np.exp(-t*7)).astype(np.float32)

def room(length,amp=.004):
    n=int(round(length*SR)); y=rng.normal(0,1,n)
    y=sosfilt(butter(2,1800,btype="low",fs=SR,output="sos"),y)
    y=y/(np.max(np.abs(y))+1e-9); t=np.arange(n)/SR
    mod=.55+.45*np.sin(2*np.pi*(.037+.003*np.sin(2*np.pi*.004*t))*t+.7)
    return (amp*y*mod).astype(np.float32)

VOICE={}
def voice(text,speed=95,pitch=38,amp=120):
    key=(text,speed,pitch,amp)
    if key in VOICE: return VOICE[key].copy()
    fd,name=tempfile.mkstemp(suffix=".wav"); os.close(fd); p=Path(name)
    ok=False
    for v in ("es+f3","es+f4","es"):
        try:
            subprocess.run(["espeak","-v",v,"-s",str(speed),"-p",str(pitch),"-a",str(amp),"-w",str(p),text],
                           check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
            ok=True; break
        except Exception: pass
    if not ok: raise RuntimeError("espeak failed")
    x,sr0=sf.read(p,dtype="float32"); p.unlink(missing_ok=True)
    if x.ndim>1: x=x.mean(axis=1)
    if sr0!=SR:
        from math import gcd
        g=gcd(sr0,SR); x=resample_poly(x,SR//g,sr0//g).astype(np.float32)
    idx=np.where(np.abs(x)>.002)[0]
    if len(idx): x=x[max(0,idx[0]-int(.05*SR)):min(len(x),idx[-1]+int(.12*SR))]
    x=sosfilt(butter(2,[120,7000],btype="bandpass",fs=SR,output="sos"),x)
    x=x/(np.max(np.abs(x))+1e-9)*.32
    x=(x+breath(len(x)/SR,.025,exact_n=len(x))).astype(np.float32)
    f=min(int(.05*SR),len(x)//4)
    if f:
        x[:f]*=np.linspace(0,1,f,dtype=np.float32); x[-f:]*=np.linspace(1,0,f,dtype=np.float32)
    VOICE[key]=x
    return x.copy()

def echo(x,delay=.22,feedback=.18,pan=0):
    base=stereo(x,pan); n=len(base)+int(round((delay*3+.2)*SR)); out=np.zeros((n,2),np.float32); out[:len(base)]+=base
    for k,g in ((1,feedback),(2,feedback*.55),(3,feedback*.28)):
        d=int(round(delay*k*SR)); bb=base[:,::-1] if k%2 else base; out[d:d+len(base)]+=bb*g
    return out

TUM=thump(); TA=slap(); AH=breath(.55,.13,True); CLAC=clac(); TAC=tac(); PLIP=plip()

def cell(buf,start,end,bpm=66,density=1,heavy=1,spread=.45):
    beat=60/bpm; t=start; k=0
    while t<end:
        for off,snd,g in ((0,TUM,.75*heavy),(1,TA,.52*density),(2,AH,.70*density),(3,TUM,.66*heavy)):
            tt=t+off*beat
            if tt<end: add(buf,snd,tt,((k+off)%3-1)*spread,g)
        t+=beat*4; k+=1

def vote(buf,start,end,bpm=82,intensity=.8):
    beat=60/bpm; t=start; k=0
    while t<end:
        for j,(snd,g) in enumerate(((TUM,.80),(TA,.55),(CLAC,.45),(TA,.48))):
            tt=t+j*beat
            if tt<end: add(buf,snd,tt,-.5 if j%2==0 else .5,g*intensity)
        if k%3==2 and t+1.5*beat<end: add(buf,TAC,t+1.5*beat,0,.55*intensity)
        t+=4*beat; k+=1

def machine(buf,start,end,bpm=96,intensity=.8):
    beat=60/bpm; t=start; k=0; clk=click(.05,.38,2500)
    while t<end:
        add(buf,clk,t,-.6 if k%2==0 else .6,intensity)
        if k%2==0 and t+beat/2<end: add(buf,TA,t+beat/2,.3,.35*intensity)
        if k%4==0 and t+beat<end: add(buf,brr(.6,.13),t+beat,-.2,intensity)
        t+=beat; k+=1

def say(buf,text,t,pan=0,gain=1,use_echo=False,speed=90,pitch=35):
    v=voice(text,speed,pitch); snd=echo(v,pan=pan) if use_echo else stereo(v,pan); add(buf,snd,t,0,gain)

def chorus(buf,text,t,gain=.8):
    for dt,pan,sp,pit,g in ((0,-.55,92,34,.60),(.07,.05,87,42,.48),(.13,.55,97,30,.42)):
        add(buf,voice(text,sp,pit),t+dt,pan,gain*g)

def scene(idx,length):
    n=int(length*SR); buf=np.zeros((n,2),np.float32); buf+=stereo(room(length,.0035 if idx<14 else .0045))
    if 1<=idx<=8:
        cell(buf,2,min(length-3,length*.78),56+idx*2,.72,.78)
        for t in np.arange(7,length-4,16): add(buf,CLAC,float(t),-.55 if int(t)%2 else .55,.28+.025*idx)
        if idx in (3,5,6):
            for t in np.arange(12,length-5,18): add(buf,breath(1.5,.11,idx==3),float(t),.15*np.sin(t),.9)
    elif 9<=idx<=13:
        vote(buf,1.5,length-2,78+(idx-9)*3,.82)
        for t in np.arange(9,length-4,12): add(buf,TAC,float(t),0,.42)
    elif 14<=idx<=21:
        cell(buf,1,length-2,72+(idx-14)*2,.65,1.05,.25)
        for t in np.arange(5,length-3,8): add(buf,TAC,float(t),-.25 if int(t/8)%2 else .25,.58)
        if idx>=19:
            for t in np.arange(10,length-3,14): add(buf,sweep(.65,.11,700,5500),float(t),.5,.7)
    elif 22<=idx<=28:
        machine(buf,1,length-2,92+(idx-22)*3,.72)
        for t in np.arange(8,length-2,11): add(buf,sweep(.85,.12,900,7000),float(t),-.55 if int(t)%2 else .55,.8)
        if idx in (25,26,27):
            for t in np.arange(6,length-3,17): add(buf,brr(.9,.15),float(t),.3,.8)
    elif idx==29:
        vote(buf,2,62,82,.70); vote(buf,62,105,104,.92); cell(buf,82,112,116,.92,1.1,.65)
        for t in (18,34,49,68,84,96,106): add(buf,sweep(1.8,.16,450,6500),t,-.7 if int(t)%2 else .7,.95)
        for t,g in ((113,.9),(116,.62),(120,.42)): add(buf,TUM,t,0,g)
        add(buf,breath(7,.12),128,0,.8)
    elif idx==30:
        for t,g in ((5,.65),(28,.48),(61,.38)): add(buf,TUM,t,0,g)
        add(buf,breath(4,.10),73,-.15,.9); add(buf,PLIP,86,.45,.7); add(buf,breath(6,.075),146,0,.8); add(buf,PLIP,188,-.35,.65); add(buf,breath(7,.055),198,.15,.8)

    if idx==1:
        add(buf,breath(2.6,.10),1,-.2,.8); add(buf,PLIP,5.5,.45,.8); say(buf,"mar",12,-.35,.7,True,72,30); say(buf,"Miramar",37,.20,.72,True,76,34); chorus(buf,"comunidad",66,.55)
    elif idx==2:
        say(buf,"ok",16,0,.82,False,80,36); add(buf,click(.10,.45,3100),16.6,.25,.8); say(buf,"ok",39,0,.48,True,80,30)
    elif idx==3:
        for t in (8,22,39,57,70): add(buf,breath(1.3,.13,True),t,.25*np.sin(t),.8)
    elif idx==4:
        for t in (3,8,14,21,29,38,48,56): add(buf,CLAC,t,-.6 if int(t)%2 else .6,.9)
    elif idx==5: say(buf,"mar",45,.05,.28,True,68,27)
    elif idx==9: chorus(buf,"comunidad",31,.72); add(buf,CLAC,61,-.4,.8); add(buf,CLAC,61.35,.4,.8)
    elif idx==12: chorus(buf,"comunidad",53,.58)
    elif idx==14: say(buf,"Miramar",57,0,.72,True,74,29)
    elif idx==17:
        for t in (4,16,31,46,64,78): add(buf,sweep(3,.14,300,5200),t,-.65 if int(t)%2 else .65,.85)
    elif idx==18:
        for t in (7,20,34,49,63): add(buf,sweep(1.1,.085,3500,9000),t,.2*np.sin(t),.7)
    elif idx==21:
        for t in (9,19,28,42,54,68): add(buf,sweep(.95,.16,700,5000),t,-.45 if int(t)%2 else .45,.9); add(buf,TAC,t+.32,0,.45)
    elif idx==22:
        say(buf,"mar",10,-.45,.52,True,72,28); say(buf,"Miramar",39,.10,.92,True,72,36); say(buf,"mar",73,.48,.44,True,66,26)
    elif idx==26:
        say(buf,"ram",18,-.45,.62,False,82,29); say(buf,"ram",43,.10,.78,False,90,37); say(buf,"ram",69,.48,.54,True,76,26)
    elif idx==27: say(buf,"Mira mar. Mar mira.",43,0,.68,True,74,32)
    elif idx==28: say(buf,"mar",66,.15,.30,True,68,27)
    elif idx==29: chorus(buf,"comunidad",72,.75); say(buf,"mar",133,0,.34,True,68,26)
    elif idx==30:
        say(buf,"diez minutos",104,0,.95,False,82,39); say(buf,"ok",122,0,.78,False,76,35); say(buf,"mar",201,.05,.28,True,62,25)
    buf=np.tanh(buf*.92).astype(np.float32)
    f=int(.05*SR); buf[:f]*=np.linspace(0,1,f,dtype=np.float32)[:,None]; buf[-f:]*=np.linspace(1,0,f,dtype=np.float32)[:,None]
    return buf

def mmss(s): return f"{s//60:02d}:{s%60:02d}"

# Remove the superseded music files; only the newly generated score will remain.
for p in OUT.glob("*.mp3"): p.unlink()

tracks=[]; start=0
for i,(title,length) in enumerate(zip(TITLES,DUR),1):
    wav=OUT/f".{i:02d}.wav"; mp3=OUT/f"{i:02d}.mp3"
    sf.write(wav,scene(i,length),SR,subtype="PCM_16")
    subprocess.run(["ffmpeg","-loglevel","error","-y","-i",str(wav),"-codec:a","libmp3lame","-b:a","96k","-ar",str(SR),"-ac","2",str(mp3)],check=True)
    wav.unlink()
    raw=mp3.read_bytes()
    tracks.append({"scene":i,"title":title,"file":mp3.name,"in":mmss(start),"out":mmss(start+length),
                   "duration_seconds":length,"bytes":len(raw),"sha256":hashlib.sha256(raw).hexdigest()})
    start+=length

manifest={
 "version":"corporal-sonora-v1",
 "canonical_date":"2026-09-18",
 "total_duration_seconds":2560,
 "total_duration":"42:40",
 "note":"Sustituye íntegramente las músicas corporales anteriores. Partitura de onomatopeyas, percusión, respiración y lenguaje mínimo.",
 "mother_cell":"TUM – TA – AH – TUM",
 "essential_words":["MAR","MIRAMAR","OK","COMUNIDAD","RAM","DIEZ MINUTOS"],
 "figurative_phrase":"Mira mar. Mar mira.",
 "sound_lexicon":{"CLAC":"pinza / linde / voto","TUM":"cuerpo / madera / peso","TAC":"sello / autoridad","BRR":"teléfono / máquina","SHH/RAS":"papel / sábana / viento","PLIP":"agua / mar","AH":"respiración / esfuerzo"},
 "tracks":tracks
}
(OUT/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
(OUT/"README.md").write_text("""# Partitura sonora · versión corporal

Canon vigente desde 18/09/2026.

Las músicas corporales anteriores quedan **sustituidas íntegramente** por esta partitura de 30 archivos sincronizados con la matriz exacta de **42:40**.

- 30 archivos: `01.mp3` … `30.mp3`
- célula madre: **TUM – TA – AH – TUM**
- materiales: CLAC · TUM · TAC · BRR · SHH/RAS · PLIP · respiración
- palabras esenciales: MAR · MIRAMAR · OK · COMUNIDAD · RAM · DIEZ MINUTOS
- cadena figurada única: «Mira mar. Mar mira.»

Cada archivo dura exactamente el tiempo asignado a su escena. El reproductor corporal usa estos 30 archivos y no el máster de la versión musical.
""",encoding="utf-8")
print("generated",len(tracks),"tracks",sum(DUR),"seconds")
