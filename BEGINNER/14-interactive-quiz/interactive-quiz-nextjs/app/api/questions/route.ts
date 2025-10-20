import { NextResponse } from 'next/server'

export async function GET(){
  const data = [
    { id:1, text:'Hàm nào dùng để in ra console?', options:['print()','console.log()','echo','printf'], answer:1 },
    { id:2, text:'HTTP là viết tắt của?', options:['HyperText Transfer Protocol','High Transfer Text Protocol','Hyper Transfer Type Protocol','None'], answer:0 },
    { id:3, text:'CSS thuộc lớp công nghệ nào?', options:['Markup','Style','Programming','Database'], answer:1 },
    { id:4, text:'React dùng khái niệm nào để mô tả UI?', options:['Templates','Direct DOM','Virtual DOM','XMLHttpRequest'], answer:2 },
  ]
  return NextResponse.json({ questions: data })
}
