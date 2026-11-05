export type Product = {
  id: string; name: string; category: string; description: string; price: number;
  duration: string; tag?: string; accent: string; symbol: string; featured?: boolean;
}
export const products: Product[] = [
  { id: 'chatgpt', name: 'ChatGPT', category: 'AI & Productivity', description: 'Asisten cerdas untuk membantu berpikir, menulis, dan berkarya.', price: 39000, duration: '30 hari', tag: 'Populer', accent: '#c9bda9', symbol: 'AI', featured: true },
  { id: 'canva', name: 'Canva', category: 'Design & Creative', description: 'Wujudkan setiap ide kreatif.', price: 25000, duration: '30 hari', tag: 'Pilihan kreatif', accent: '#a8b6ae', symbol: 'Ca', featured: true },
  { id: 'netflix', name: 'Netflix', category: 'Hiburan', description: 'Cerita menarik untuk dinikmati.', price: 35000, duration: '30 hari', tag: 'Hiburan', accent: '#c98e83', symbol: 'N' },
  { id: 'capcut', name: 'CapCut', category: 'Video & Editing', description: 'Maksimalkan setiap bingkai video.', price: 22000, duration: '30 hari', accent: '#b7b9c0', symbol: 'Cc' },
  { id: 'youtube', name: 'YouTube Premium', category: 'Hiburan', description: 'Nikmati tontonan tanpa jeda.', price: 28000, duration: '30 hari', accent: '#c78f83', symbol: 'YT' },
  { id: 'claude', name: 'Claude', category: 'AI & Productivity', description: 'Asisten andal untuk pekerjaan yang kompleks.', price: 49000, duration: '30 hari', tag: 'Baru', accent: '#c9bda9', symbol: 'Cl' },
  { id: 'vidio', name: 'Vidio', category: 'Hiburan', description: 'Nikmati lebih banyak tayangan favorit.', price: 19000, duration: '30 hari', accent: '#a7b5aa', symbol: 'V' },
  { id: 'spotify', name: 'Spotify', category: 'Hiburan', description: 'Musik untuk menemani setiap momen.', price: 24000, duration: '30 hari', accent: '#a8b6a8', symbol: 'S' },
]
export const formatIDR = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
