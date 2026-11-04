export type Product = {
  id: string; name: string; category: string; description: string; price: number;
  duration: string; tag?: string; accent: string; symbol: string; featured?: boolean;
}
export const products: Product[] = [
  { id: 'chatgpt', name: 'ChatGPT', category: 'AI & Productivity', description: 'A smarter way to think, write, and create.', price: 39000, duration: '30 hari', tag: 'Popular', accent: '#c9bda9', symbol: 'AI', featured: true },
  { id: 'canva', name: 'Canva', category: 'Design & Creative', description: 'Bring every creative idea to life.', price: 25000, duration: '30 hari', tag: 'Creative pick', accent: '#a8b6ae', symbol: 'Ca', featured: true },
  { id: 'netflix', name: 'Netflix', category: 'Entertainment', description: 'Stories worth staying in for.', price: 35000, duration: '30 hari', tag: 'Entertainment', accent: '#c98e83', symbol: 'N' },
  { id: 'capcut', name: 'CapCut', category: 'Video & Editing', description: 'Make every frame count.', price: 22000, duration: '30 hari', accent: '#b7b9c0', symbol: 'Cc' },
  { id: 'youtube', name: 'YouTube Premium', category: 'Entertainment', description: 'Your viewing, uninterrupted.', price: 28000, duration: '30 hari', accent: '#c78f83', symbol: 'YT' },
  { id: 'claude', name: 'Claude', category: 'AI & Productivity', description: 'Thoughtful assistance for complex work.', price: 49000, duration: '30 hari', tag: 'New', accent: '#c9bda9', symbol: 'Cl' },
  { id: 'vidio', name: 'Vidio', category: 'Entertainment', description: 'More of the shows you love.', price: 19000, duration: '30 hari', accent: '#a7b5aa', symbol: 'V' },
  { id: 'spotify', name: 'Spotify', category: 'Entertainment', description: 'A soundtrack for every moment.', price: 24000, duration: '30 hari', accent: '#a8b6a8', symbol: 'S' },
]
export const formatIDR = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
