#!/usr/bin/env python3
import struct,sys,os
from pathlib import Path
base=Path('android/app/build/outputs/bundle/release/aab_extracted/base/lib')
if not base.exists():
    print('lib folder not found',file=sys.stderr); sys.exit(1)
results=[]
for so in sorted(base.rglob('*.so')):
    try:
        with so.open('rb') as f:
            e_ident=f.read(16)
            if len(e_ident)<16 or e_ident[:4]!=b'\x7fELF':
                results.append((str(so), 'not-elf'))
                continue
            cls = e_ident[4]
            endian = '<' if e_ident[5]==1 else '>'
            if cls==1:
                # ELF32
                hdr=f.read(36)
                e_phoff, = struct.unpack(endian+'I', hdr[20:24])
                e_phentsize, e_phnum = struct.unpack(endian+'HH', hdr[28:32])
                p_aligns=[]
                for i in range(e_phnum):
                    f.seek(e_phoff + i*e_phentsize)
                    ph = f.read(e_phentsize)
                    if len(ph) < e_phentsize: break
                    p_type, p_offset, p_vaddr, p_paddr, p_filesz, p_memsz, p_flags, p_align = struct.unpack(endian+'I'*8, ph[:32])
                    if p_type==1:
                        p_aligns.append(p_align)
                results.append((str(so), max(p_aligns) if p_aligns else 0))
            elif cls==2:
                # ELF64
                hdr=f.read(48)
                e_phoff, = struct.unpack(endian+'Q', hdr[8:16])
                e_phentsize, e_phnum = struct.unpack(endian+'HH', hdr[32:36])
                p_aligns=[]
                for i in range(e_phnum):
                    f.seek(e_phoff + i*e_phentsize)
                    ph = f.read(e_phentsize)
                    if len(ph) < e_phentsize: break
                    p_type, p_flags = struct.unpack(endian+'II', ph[:8])
                    # p_offset, p_vaddr, p_paddr, p_filesz, p_memsz, p_align = struct.unpack(endian+'QQQQQQ', ph[8:8+8*6])
                    # Some toolchains produce 56-byte phdr; safe unpack as needed
                    rest = ph[8:8+8*6]
                    if len(rest)<8*6:
                        results.append((str(so),'phdr-too-short'))
                        continue
                    p_offset,p_vaddr,p_paddr,p_filesz,p_memsz,p_align = struct.unpack(endian+'QQQQQQ', rest)
                    if p_type==1:
                        p_aligns.append(p_align)
                results.append((str(so), max(p_aligns) if p_aligns else 0))
            else:
                results.append((str(so), 'unknown-class'))
    except Exception as e:
        results.append((str(so), 'error:'+str(e)))

# print summary
bad=[]
for path,p_align in results:
    if isinstance(p_align,int):
        ok = p_align>=16384
        print(f"{path} -> p_align_max={p_align} -> {'OK' if ok else 'FAIL'}")
        if not ok: bad.append((path,p_align))
    else:
        print(f"{path} -> {p_align}")

print('\nSummary:')
print(f'Total libraries checked: {len(results)}')
print(f'Libraries failing 16KB page-size requirement: {len(bad)}')
if bad:
    print('Failing libs:')
    for p,a in bad:
        print(f' - {p} (p_align_max={a})')
