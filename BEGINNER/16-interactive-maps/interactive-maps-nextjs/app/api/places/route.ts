import { NextResponse } from 'next/server'

export async function GET(){
  const places = [
    { id: 1, name: 'Hồ Gươm', lat: 21.02882, lng: 105.852, city: 'Hà Nội' },
    { id: 2, name: 'Bưu điện TP.HCM', lat: 10.77978, lng: 106.699, city: 'Hồ Chí Minh' },
    { id: 3, name: 'Cầu Rồng', lat: 16.061, lng: 108.229, city: 'Đà Nẵng' },
  ]
  return NextResponse.json({ places })
}
