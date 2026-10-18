#!/usr/bin/env python3
"""Validate the 4-page presentation and distinct 2-page agent tools, all US Letter."""
from pathlib import Path
from pypdf import PdfReader
import struct

base=Path("dist")
expected={
  "mortgage-conversation-kit.pdf":[
    ["YourMortgage.", "MoreOptions.", "$3,500/mo", "$2,800/mo", "$700/month", "$8,400peryear"],
    ["OneConversation.", "MoreChoices.", "65+", "13072", "8Twelve"],
    ["MoreWaystoHelp.", "MoreWaystoEarn.", "$500,000", "$500"],
    ["StartPart-Time.", "BuildWithSupport.", "trainer", "licensing"],
  ],
  "mortgage-agent-tools.pdf":[
    ["Mortgage", "ConversationGuide.", "8Twelve"],
    ["Mortgage", "Discovery.", "sharemyname", "8Twelve"]
  ]
}
all_pages=0
for filename,pages in expected.items():
    reader=PdfReader(str(base/filename))
    assert len(reader.pages)==len(pages), f"{filename}: {len(reader.pages)} pages, expected {len(pages)}"
    for n,(page,terms) in enumerate(zip(reader.pages,pages),1):
        w,h=float(page.mediabox.width),float(page.mediabox.height)
        assert abs(w-612)<.5 and abs(h-792)<.5, f"{filename} p{n}: {w}x{h}pt"
        extracted="".join((page.extract_text() or "").split())
        for term in terms:
            assert "".join(term.split()) in extracted, f"{filename} page {n} missing {term}"
        all_pages+=1
        png=base/f"page-{all_pages}.png"
        signature=png.read_bytes()
        assert signature[:8]==bytes((137,80,78,71,13,10,26,10)), f"{png}: invalid PNG"
        px_w,px_h=struct.unpack(">II",signature[16:24])
        assert (px_w,px_h)==(816,1056), f"{png}: wrong size {px_w}x{px_h}"
        print(f"PASS {filename} page {n}: 612x792pt, PNG {px_w}x{px_h}")
assert all_pages==6
mobile=(base/"mobile-preview.png").read_bytes()
assert mobile[:8]==bytes((137,80,78,71,13,10,26,10))
mw,mh=struct.unpack(">II",mobile[16:24])
assert mw==390 and mh>844, f"Unexpected mobile image size {mw}x{mh}"
print(f"PASS mobile preview {mw}x{mh}")
print("PASS: exactly four presentation sheets and two independent advisor sheets")
