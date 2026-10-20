#!/usr/bin/env python3
"""Validate 4 presentation pages plus notes and distinct 2-page agent tools, all US Letter."""
from pathlib import Path
from pypdf import PdfReader
import struct

base=Path("dist")
expected={
  "mortgage-conversation-kit.pdf":[
    ["Whatdoyouwantyourmortgagetodo?", "Torontofamily", "$5,798", "$4,757", "$1,041", "$721,000", "$256,000", "7.2yearssooner", "4.3yearssooner"],
    ["Why8Twelve", "Mortgage?", "65+", "8Twelve"],
    ["ReferaMortgage.", "BuildaBusiness.", "$500,000", "$430", "$810"],
    ["StartPart-Time.", "BuildWithSupport.", "trainer", "Getqualified"],
    ["IllustrationNotes.", "Regularinvesting", "annualratedividedby12", "13072"],
  ],
  "mortgage-agent-tools.pdf":[
    ["Mortgage", "ConversationGuide.", "8Twelve"],
    ["Mortgage", "Hand-OffDocument.", "sharemyname", "8Twelve"]
  ]
}
source_pages={"mortgage-conversation-kit.pdf": [1,2,3,4,7], "mortgage-agent-tools.pdf": [5,6]}
all_pages=0
for filename,pages in expected.items():
    reader=PdfReader(str(base/filename))
    assert len(reader.pages)==len(pages), f"{filename}: {len(reader.pages)} pages, expected {len(pages)}"
    for n,(page,terms) in enumerate(zip(reader.pages,pages),1):
        w,h=float(page.mediabox.width),float(page.mediabox.height)
        assert abs(w-612)<.5 and abs(h-792)<.5, f"{filename} p{n}: {w}x{h}pt"
        extracted="".join((page.extract_text() or "").split()).casefold()
        for ligature,letters in (("ﬀ","ff"),("ﬁ","fi"),("ﬂ","fl"),("ﬃ","ffi"),("ﬄ","ffl")):
            extracted=extracted.replace(ligature,letters)
        for term in terms:
            assert "".join(term.split()).casefold() in extracted, f"{filename} page {n} missing {term}"
        all_pages+=1
        png=base/f"page-{source_pages[filename][n-1]}.png"
        signature=png.read_bytes()
        assert signature[:8]==bytes((137,80,78,71,13,10,26,10)), f"{png}: invalid PNG"
        px_w,px_h=struct.unpack(">II",signature[16:24])
        assert (px_w,px_h)==(816,1056), f"{png}: wrong size {px_w}x{px_h}"
        print(f"PASS {filename} page {n}: 612x792pt, PNG {px_w}x{px_h}")
assert all_pages==7
mobile=(base/"mobile-preview.png").read_bytes()
assert mobile[:8]==bytes((137,80,78,71,13,10,26,10))
mw,mh=struct.unpack(">II",mobile[16:24])
assert mw==390 and mh>844, f"Unexpected mobile image size {mw}x{mh}"
print(f"PASS mobile preview {mw}x{mh}")
print("PASS: four presentation sheets, their shared notes, and two independent advisor sheets")
