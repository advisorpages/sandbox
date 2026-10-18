#!/usr/bin/env python3
"""Fail GitHub Pages build when PDF/PNG layout disagrees with the print contract."""
from pathlib import Path
import struct
from pypdf import PdfReader

base = Path("dist")
pdf = base / "mortgage-conversation-kit.pdf"
reader = PdfReader(str(pdf))
assert len(reader.pages) == 4, f"Expected 4 PDF pages; got {len(reader.pages)}"
for i, page in enumerate(reader.pages, 1):
    width, height = float(page.mediabox.width), float(page.mediabox.height)
    assert abs(width - 612) < 0.5 and abs(height - 792) < 0.5, (
        f"Page {i} is {width} x {height} PDF points; expected 612 x 792")
    text = "".join((page.extract_text() or "").split())
    expected = {
        1: ["YourMortgage.", "MoreOptions.", "$3,500/mo", "$2,800/mo", "$700/month", "$8,400peryear", "65+", "13072", "8Twelve"],
        2: ["MoreWaystoHelp.", "MoreWaystoEarn.", "$500,000", "$500", "8Twelve"],
        3: ["Mortgage", "ConversationGuide.", "8Twelve"],
        4: ["Mortgage", "Discovery.", "8Twelve", "sharemyname"],
    }
    for phrase in expected[i]:
        assert phrase in text, f"Page {i} PDF text missing: {phrase!r}"
    image = base / f"page-{i}.png"
    data = image.read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", f"{image}: not a PNG"
    w, h = struct.unpack(">II", data[16:24])
    assert w < h and abs(w / h - 8.5 / 11) < 0.002, (
        f"{image}: {w} x {h}; expected US Letter portrait")
    print(f"PASS page {i}: PDF {width:g}x{height:g} pt, preview {w}x{h}px")
mobile = base / "mobile-preview.png"
data = mobile.read_bytes()
assert data[:8] == b"\\x89PNG\\r\\n\\x1a\\n", "Mobile screenshot is not PNG"
mw, mh = struct.unpack(">II", data[16:24])
assert mw == 390 and mh > 844, f"Mobile preview unexpected size: {mw} x {mh}"
print(f"PASS mobile preview {mw}x{mh}px")
print("PASS all four portrait pages")
