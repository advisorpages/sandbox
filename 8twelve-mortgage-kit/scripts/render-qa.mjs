import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

mkdirSync('dist', {recursive:true});
const browser=await chromium.launch({headless:true});
try {
  const page=await browser.newPage({viewport:{width:1360,height:1200},deviceScaleFactor:1});
  await page.goto('file://' + resolve('index.html'), {waitUntil:'load'});
  await page.emulateMedia({media:'print'});
  const errors=await page.evaluate(() => [...document.querySelectorAll('.sheet')].map((sheet,i)=>{
    const sb=sheet.getBoundingClientRect();
    const overflowing=[...sheet.querySelectorAll('*')].filter(node=>{
      const cs=getComputedStyle(node);
      if(cs.display==='none'||cs.position==='fixed')return false;
      const b=node.getBoundingClientRect();
      if(b.width===0&&b.height===0)return false;
      return b.left<sb.left-1||b.right>sb.right+1||b.top<sb.top-1||b.bottom>sb.bottom+1;
    }).map(node=>node.tagName.toLowerCase()+ (node.className?'.'+String(node.className).trim().replace(/\s+/g,'.'):''));
    const blocks=[...sheet.children].filter(node=>getComputedStyle(node).display!=='none')
      .map(node=>({name:node.className||node.tagName,rect:node.getBoundingClientRect()}))
      .filter(block=>block.rect.height>0);
    const overlaps=blocks.slice(1).flatMap((block,j)=>
      block.rect.top<blocks[j].rect.bottom-1?[blocks[j].name+' / '+block.name]:[]);
    return {page:i+1,width:Math.round(sb.width),height:Math.round(sb.height),
      scrollHeight:sheet.scrollHeight,clientHeight:sheet.clientHeight,overflowing,overlaps};
  }));
  if(errors.length!==7)throw new Error('Expected exactly seven printable sheets, got '+errors.length);
  const failures=[];
  for(const e of errors){
    console.log('Page layout:',JSON.stringify(e));
    if(e.width!==816||e.height!==1056)failures.push('Wrong US Letter geometry on page '+e.page);
    if(e.scrollHeight>e.clientHeight+1||e.overflowing.length)
      failures.push('Overflow page '+e.page+': '+e.overflowing.join(', '));
    if(e.overlaps.length)failures.push('Overlapping blocks page '+e.page+': '+e.overlaps.join(', '));
  }
  if(failures.length){
    // Keep diagnostic proofs even when layout gates fail, so clipping can be inspected.
    for(const e of errors.filter(e=>e.scrollHeight>e.clientHeight+1||e.overflowing.length||e.overlaps.length)){
      await page.locator('.sheet').nth(e.page-1).screenshot({
        path:'dist/page-'+e.page+'.png',animations:'disabled',scale:'css'
      });
      const blocks=await page.locator('.sheet').nth(e.page-1).evaluate(sheet=>
        [...sheet.children].map(el=>({element:el.className||el.tagName,
          top:Math.round(el.getBoundingClientRect().top-sheet.getBoundingClientRect().top),
          height:Math.round(el.getBoundingClientRect().height)})));
      console.log('Overflow blocks page '+e.page+':',JSON.stringify(blocks));
    }
  }

  // Produce seven individual page proofs from precisely the same HTML as the PDF.
  for(let i=0;i<7;i++)await page.locator('.sheet').nth(i).screenshot({
    path:'dist/page-'+(i+1)+'.png',animations:'disabled',scale:'css'
  });

  const pdfOpts={printBackground:true,preferCSSPageSize:true,
    margin:{top:0,bottom:0,left:0,right:0}};
  await page.evaluate(()=>document.documentElement.classList.add('print-main'));
  await page.pdf({...pdfOpts,path:'dist/mortgage-conversation-kit.pdf'}); // 4 presentation pages plus the shared illustration notes
  await page.evaluate(()=>document.documentElement.classList.replace('print-main','print-tools'));
  await page.pdf({...pdfOpts,path:'dist/mortgage-agent-tools.pdf'}); // 2-page agent tools
  await page.evaluate(()=>document.documentElement.classList.remove('print-tools'));

  // Mobile preview intentionally scales each printable sheet, retaining fixed page geometry.
  const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
  await mobile.goto('file://' + resolve('index.html'), {waitUntil:'load'});
  await mobile.evaluate(()=>new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done))));
  const data=await mobile.evaluate(()=>({
    width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
    sheets:[...document.querySelectorAll('.sheet')].map(el=>{
      const r=el.getBoundingClientRect();
      return {left:r.left,right:r.right,width:r.width};
    })
  }));
  console.log('Mobile layout:',JSON.stringify(data));
  if(data.sheets.length!==7||data.scrollWidth>data.width+2||
     data.sheets.some(s=>s.left< -1||s.right>data.width+1))
    failures.push('Mobile preview clips a sheet or scrolls horizontally');
  await mobile.screenshot({path:'dist/mobile-preview.png',fullPage:true,animations:'disabled'});
  await mobile.close();
  console.log('Wrote five-page presentation with notes, two-page advisor tools PDF, seven PNGs and mobile proof.');
  // Preserve all diagnostic artifacts, but never turn a failed layout into a passing run.
  if(failures.length)throw new Error(failures.join('\n'));
}finally{await browser.close();}
