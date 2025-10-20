import { NextRequest, NextResponse } from 'next/server'

const DATA = [{"id": 1, "title": "Phở Bò", "time": 45, "servings": 2, "tags": ["viet", "noodle", "beef"], "ingredients": ["Bánh phở", "Thịt bò", "Hành, gừng", "Quế, hồi", "Nước dùng"], "steps": ["Nướng hành gừng", "Hầm xương / nước dùng", "Chần bánh phở", "Thái thịt bò", "Chan nước dùng và thưởng thức"]}, {"id": 2, "title": "Bún Chả", "time": 35, "servings": 2, "tags": ["viet", "grill", "pork"], "ingredients": ["Thịt ba rọi", "Bún tươi", "Nước mắm", "Rau sống", "Đu đủ chua"], "steps": ["Ướp thịt", "Nướng chả", "Pha nước chấm", "Luộc bún", "Dọn kèm rau"]}, {"id": 3, "title": "Mì Ý Sốt Cà", "time": 25, "servings": 2, "tags": ["italian", "pasta", "vegetarian"], "ingredients": ["Mì spaghetti", "Cà chua", "Hành tây", "Tỏi", "Dầu olive", "Basil"], "steps": ["Luộc mì", "Xào tỏi hành", "Nấu sốt cà", "Trộn mì với sốt", "Rắc basil"]}, {"id": 4, "title": "Cơm Gà", "time": 40, "servings": 3, "tags": ["viet", "rice", "chicken"], "ingredients": ["Gà", "Gạo", "Gừng", "Hành lá", "Muối tiêu"], "steps": ["Luộc gà", "Nấu cơm với nước gà", "Xé gà", "Pha nước mắm gừng", "Dọn kèm hành mỡ"]}, {"id": 5, "title": "Salad Hy Lạp", "time": 10, "servings": 2, "tags": ["greek", "salad", "vegetarian"], "ingredients": ["Dưa leo", "Cà chua", "Hành tây", "Ô liu", "Phô mai feta", "Dầu olive"], "steps": ["Cắt rau củ", "Trộn dầu olive", "Thêm phô mai và ô liu"]}]

export async function GET(req: NextRequest){
  const q = (req.nextUrl.searchParams.get('q')||'').toLowerCase()
  const tag = req.nextUrl.searchParams.get('tag')||''
  const items = DATA.filter((r: any)=>{
    const hitQ = !q || r.title.toLowerCase().includes(q) || r.ingredients.join(' ').toLowerCase().includes(q)
    const hitT = !tag || r.tags.includes(tag)
    return hitQ && hitT
  })
  return NextResponse.json({ items })
}
