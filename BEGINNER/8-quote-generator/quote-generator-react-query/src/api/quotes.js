export async function fetchQuotes(source='local'){
  if (source === 'local'){
    // public/quotes.json (được phục vụ ở /quotes.json)
    const res = await fetch('/quotes.json')
    if (!res.ok) throw new Error('Không thể tải quotes.json local')
    const data = await res.json()
    return normalize(data)
  }
  if (source === 'quotable'){
    // API công khai: https://api.quotable.io/quotes?limit=100
    const res = await fetch('https://api.quotable.io/quotes?limit=100')
    if (!res.ok) throw new Error('Lỗi gọi quotable.io')
    const json = await res.json()
    const list = (json?.results || []).map(q => ({ text: q.content, author: q.author || 'Unknown' }))
    return normalize(list)
  }
  if (source === 'typefit'){
    // API công khai: https://type.fit/api/quotes
    const res = await fetch('https://type.fit/api/quotes')
    if (!res.ok) throw new Error('Lỗi gọi type.fit')
    const list = await res.json()
    const mapped = list.map(q => ({ text: q.text, author: q.author || 'Unknown' }))
    return normalize(mapped)
  }
  return []
}

function normalize(list){
  // Lọc bỏ phần tử hỏng, trim text
  return (list || []).filter(Boolean).map(q => ({
    text: String(q.text || '').trim(),
    author: q.author ? String(q.author).trim() : 'Unknown'
  })).filter(q => q.text.length > 0)
}
