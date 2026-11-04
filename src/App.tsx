import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, CircleHelp, Clock3, Command, CreditCard, Filter, Headphones, Menu, Search, ShieldCheck, ShoppingBag, Sparkles, Wallet, X } from 'lucide-react'
import { products, formatIDR, type Product } from './data/products'
import { isBackendConfigured, supabase } from './lib/supabase'

const categories = ['Semua produk', 'Hiburan', 'AI & Produktivitas', 'Desain & Kreatif', 'Video & Penyuntingan']
const translateCategory = (value: string) => ({ 'Entertainment':'Hiburan', 'AI & Productivity':'AI & Produktivitas', 'Design & Creative':'Desain & Kreatif', 'Video & Editing':'Video & Penyuntingan', 'Digital products':'Produk digital' }[value] || value)
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function App() {
  const [catalog, setCatalog] = useState<Product[]>(products)
  const [catalogIsSample, setCatalogIsSample] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Semua produk')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Product | null>(null)
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null)
  const [checkout, setCheckout] = useState(false)
  const [payment, setPayment] = useState('qris')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const client = supabase
    if (!client) return
    let cancelled = false
    const loadCatalog = async () => {
      const { data, error } = await client.from('products')
        .select('id,name,short_description,status,is_featured,categories(name),product_packages(name,duration_days,price_idr,is_active,sort_order)')
        .eq('status', 'published').order('sort_order')
      if (cancelled || error) return
      const rows = (data ?? []) as any[]
      const palette = ['#c9bda9','#a8b6ae','#c98e83','#b7b9c0']
      const liveProduk: Product[] = rows.map((row, index) => {
        const packages = (row.product_packages ?? []).filter((item: any) => item.is_active).sort((a: any,b: any) => a.price_idr - b.price_idr)
        const category = Array.isArray(row.categories) ? row.categories[0]?.name : row.categories?.name
        return { id: row.id, name: row.name, category: category || 'Produk digital', description: row.short_description || 'Lihat rincian paket dan ketentuannya.', price: Number(packages[0]?.price_idr ?? 0), duration: packages[0]?.duration_days ? packages[0].duration_days + ' hari' : 'Pilih paket', tag: row.is_featured ? 'Unggulan' : undefined, accent: palette[index % palette.length], symbol: row.name.split(/\s+/).map((part: string) => part[0]).join('').slice(0,2), featured: row.is_featured }
      }).filter(item => item.price > 0)
      setCatalog(liveProduk)
      setCatalogIsSample(false)
    }
    void loadCatalog()
    return () => { cancelled = true }
  }, [])

  const visibleProduk = useMemo(() => catalog.filter(p =>
    (activeCategory === 'Semua produk' || translateCategory(p.category) === activeCategory) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  ), [activeCategory, search])

  const startCheckout = (product: Product) => { setCheckoutProduct(product); setSelected(null); setCheckout(true) }

  return <div className="site-shell">
    <div className="preview-strip"><span className="status-dot" /> {isBackendConfigured && !catalogIsSample ? 'PRATINJAU KATALOG' : 'PRATINJAU DESAIN · KATALOG CONTOH'} <span className="strip-separator">/</span> ACO.DIGITAL <span className="strip-right">Toko digital pilihan</span></div>
    <header className="topbar">
      <a className="brand" href="#" aria-label="Beranda Aco Digital"><span className="brand-mark">a.</span><span>aco<span className="brand-dot">.</span>digital</span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#catalog" onClick={() => setMenuOpen(false)}>Jelajahi</a>
        <a href="#collections" onClick={() => setMenuOpen(false)}>Koleksi</a>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>Cara kerja</a>
        <a href="#help" onClick={() => setMenuOpen(false)}>Bantuan</a>
      </nav>
      <div className="nav-actions"><button className="icon-button search-trigger" aria-label="Fokus ke pencarian" onClick={() => document.getElementById('catalog-search')?.focus()}><Search size={18}/></button><button className="text-button" onClick={() => setCheckout(true)}>Akun saya <ArrowUpRight size={14}/></button><button className="mobile-menu icon-button" onClick={() => setMenuOpen(v => !v)} aria-label="Buka atau tutup menu">{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true"><span/><span/><span/><span/><span/></div>
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.6}}><span className="eyebrow-line"/> PILIHAN DIGITAL · 2026</motion.div>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8,ease}}>Semua kebutuhan digital.<br/><em>Dalam satu tempat.</em></motion.h1>
          <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:.7,ease}}>Pilihan langganan dan alat digital untuk menemani hiburan, kreativitas, dan pekerjaanmu.</motion.p>
          <motion.div className="hero-actions" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.22}}><a className="button button-light" href="#catalog">Jelajahi koleksi <ArrowUpRight size={16}/></a><a className="text-link" href="#how-it-works">Cara kerja <ArrowDownRight size={15}/></a></motion.div>
        </div>
        <div className="hero-art" aria-label="Floating collection of app-inspired tiles">
          <motion.div className="orbit orbit-one" animate={{rotate:360}} transition={{duration:80,repeat:Infinity,ease:'linear'}}/>
          <motion.div className="orbit orbit-two" animate={{rotate:-360}} transition={{duration:100,repeat:Infinity,ease:'linear'}}/>
          <motion.div className="hero-tile tile-main" animate={{y:[0,-12,0],rotate:[-5,-2,-5]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}><span className="tile-label">BERPIKIR · BERKARYA</span><strong>AI<span>+</span></strong><small>PRODUKTIVITAS</small></motion.div>
          <motion.div className="hero-tile tile-left" animate={{y:[0,10,0],rotate:[8,5,8]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}><strong>Ca</strong><small>KREATIVITAS</small></motion.div>
          <motion.div className="hero-tile tile-right" animate={{y:[0,-9,0],rotate:[7,10,7]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}><strong>N</strong><small>HIBURAN</small></motion.div>
          <motion.div className="hero-orb orb-a"/><motion.div className="hero-orb orb-b"/><div className="art-caption"><span>01 — 04</span><span>ALAT UNTUK KESEHARIAN</span></div>
        </div>
        <div className="hero-bottom"><span>AKSES DIGITAL PILIHAN</span><span>GULIR UNTUK MENJELAJAH ↓</span><span>EST. 2026</span></div>
      </section>

      <section className="trust-row"><div><ShieldCheck/><span>Informasi produk yang jelas</span></div><div><Clock3/><span>Masa aktif yang transparan</span></div><div><Headphones/><span>Bantuan manusia saat dibutuhkan</span></div></section>

      <section className="catalog-section section-wrap" id="catalog">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> KOLEKSI PRODUK</div><h2>Temukan pilihan<br/><em>digital berikutnya.</em></h2></div><p>Pilihan alat digital untuk hiburan, kreativitas, dan produktivitas.</p></div>
        <div className="catalog-tools"><div className="category-pills">{categories.map(cat => <button key={cat} className={activeCategory===cat?'category-pill active':'category-pill'} onClick={() => setActiveCategory(cat)}>{cat}</button>)}</div><label className="search-box"><Search size={17}/><input id="catalog-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari produk"/><span>Cari</span></label></div>
        <div className="catalog-meta"><span>{visibleProduk.length.toString().padStart(2,'0')} PRODUK</span><button className="sort-button" onClick={()=>setShowAll(v=>!v)}><Filter size={14}/> {showAll?'Unggulan dahulu':'Semua produk'} <ChevronDown size={14}/></button></div>
        <div className="product-grid">{(showAll ? visibleProduk : visibleProduk.slice(0,6)).map((product,index)=><ProductCard key={product.id} product={product} index={index} onSelect={()=>setSelected(product)} onBuy={()=>startCheckout(product)}/>)}</div>
        {visibleProduk.length===0 && <div className="empty-state">{catalogIsSample ? 'Produk tidak ditemukan. Coba kata pencarian lain.' : 'Katalog sedang disiapkan. Silakan periksa kembali nanti.'}</div>}
        {visibleProduk.length>6 && <button className="load-more" onClick={()=>setShowAll(v=>!v)}>{showAll?'Tampilkan lebih sedikit':'Lihat semua produk'} <ArrowRight size={15}/></button>}
      </section>

      <section className="spotlight section-wrap" id="collections"><div className="spotlight-copy"><div className="eyebrow"><span className="eyebrow-line"/> PILIHAN EDITOR · 001</div><h2>Beri ruang<br/>untuk <em>ide yang lebih baik.</em></h2><p>Kembangkan proses kreatif dengan alat yang membantu merancang, membagikan, dan mewujudkan ide.</p><button className="button button-light" onClick={()=>setSelected(products.find(p=>p.id==='canva') || products[0])}>Jelajahi alat kreatif <ArrowUpRight size={16}/></button></div><div className="spotlight-visual"><div className="spotlight-ring"/><div className="spotlight-card"><span>ACO / KREATIVITAS SUITE</span><strong>Buat<br/><i>sesuatu</i><br/>bermakna.</strong><small>RANCANG LANGKAH BERIKUTNYA</small></div><div className="spotlight-index">02<br/><span>KREATIVITAS</span></div></div></section>

      <section className="how-section section-wrap" id="how-it-works"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> PROSES SEDERHANA</div><h2>Hal baik,<br/><em>jadi lebih mudah.</em></h2></div><p>Tanpa langkah yang rumit. Informasi jelas, pembayaran praktis, dan kabar terbaru di setiap tahap.</p></div><div className="steps-grid"><div className="step"><span>01</span><ShoppingBag/><h3>Pilih produk</h3><p>Jelajahi koleksi and select the product and package that fits.</p></div><div className="step"><span>02</span><CreditCard/><h3>Lakukan pembayaran</h3><p>Lanjut sebagai tamu atau masuk ke akun. Pilih metode pembayaran yang tersedia.</p></div><div className="step"><span>03</span><Sparkles/><h3>Pantau akses</h3><p>Pantau pesanan serta informasi masa aktif dan tanggal berakhir setelah diproses.</p></div></div></section>

      <section className="support-band section-wrap" id="help"><div><div className="eyebrow"><span className="eyebrow-line"/> SIAP MEMBANTU</div><h2>Ada pertanyaan?<br/><em>Kami siap membantu.</em></h2></div><div className="support-copy"><p>Butuh informasi tentang paket, aktivasi, atau pesanan? Tim bantuan kami siap membantu agar kamu dapat memilih dengan yakin.</p><a className="text-link" href="mailto:hello@aco.digital">Hubungi bantuan <ArrowUpRight size={15}/></a></div><div className="support-mark"><CircleHelp/></div></section>
    </main>

    <footer className="footer"><div className="footer-main"><a className="brand" href="#"><span className="brand-mark">a.</span><span>aco<span className="brand-dot">.</span>digital</span></a><p>Semua kebutuhan digital.<br/>Dalam satu tempat.</p><div className="footer-links"><a href="#catalog">Produk</a><a href="#how-it-works">Cara kerja</a><a href="#help">Bantuan</a><a href="mailto:hello@aco.digital">Kontak</a></div></div><div className="footer-bottom"><span>© 2026 ACO.DIGITAL</span><span>UNTUK KEBUTUHAN DIGITAL HARIANMU</span><span>KETENTUAN · PRIVASI</span></div></footer>

    <AnimatePresence>{selected && <ProductDialog product={selected} onClose={()=>setSelected(null)} onBuy={()=>startCheckout(selected)}/>}</AnimatePresence>
    <AnimatePresence>{checkout && <CheckoutDialog product={checkoutProduct} payment={payment} setPayment={setPayment} onClose={()=>setCheckout(false)}/>}</AnimatePresence>
  </div>
}

function ProductCard({product,index,onSelect,onBuy}:{product:Product;index:number;onSelect:()=>void;onBuy:()=>void}) {
  return <motion.article className={'product-card '+(index===0?'product-card-featured':'')} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.55,delay:(index%3)*.06,ease}}>
    <button className="card-open" onClick={onSelect} aria-label={'Lihat '+product.name}><div className="card-topline"><span>{product.category.toUpperCase()}</span>{product.tag && <span className="product-tag">{product.tag}</span>}</div><div className="product-art" style={{'--product-accent':product.accent} as any}><div className="product-orbit"/><div className="product-symbol">{product.symbol}</div><span className="art-code">ACO / PRODUK DIGITAL</span></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.description}</p></div><ArrowUpRight size={17}/></div></button>
    <div className="card-bottom"><div><span>MULAI DARI</span><strong>{formatIDR(product.price)}</strong><small>{product.duration}</small></div><button className="add-button" onClick={onBuy}>Pilih <ArrowRight size={14}/></button></div>
  </motion.article>
}

function ProductDialog({product,onClose,onBuy}:{product:Product;onClose:()=>void;onBuy:()=>void}) {
  return <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><motion.div className="dialog product-dialog" initial={{y:28,opacity:0}} animate={{y:0,opacity:1}} exit={{y:18,opacity:0}} transition={{duration:.3,ease}}><button className="dialog-close" onClick={onClose}><X/></button><div className="eyebrow"><span className="eyebrow-line"/> RINCIAN PRODUK</div><div className="dialog-product-art" style={{'--product-accent':product.accent} as React.CSSProperties}><span>{product.symbol}</span></div><span className="dialog-category">{product.category}</span><h2>{product.name}</h2><p>{product.description}</p><div className="detail-price"><span>MULAI DARI</span><strong>{formatIDR(product.price)}</strong><small>Contoh paket · {product.duration}</small></div><div className="detail-note"><ShieldCheck size={17}/><span>Ketentuan paket, cara aktivasi, dan garansi akan ditampilkan sebelum pembelian.</span></div><button className="button button-light full-button" onClick={onBuy}>Lanjut ke pembayaran <ArrowRight size={16}/></button><small className="demo-note">Data pratinjau katalog — paket dan harga akhir akan dikelola melalui dasbor admin.</small></motion.div></motion.div>
}

function CheckoutDialog({product,payment,setPayment,onClose}:{product:Product|null;payment:string;setPayment:(v:string)=>void;onClose:()=>void}) {
  const [guest,setGuest] = useState(true)
  const [name,setName] = useState('')
  const [whatsapp,setWhatsapp] = useState('')
  const [email,setEmail] = useState('')
  const [voucher,setVoucher] = useState('')
  const [notice,setNotice] = useState('')
  return <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><motion.div className="dialog checkout-dialog" initial={{y:28,opacity:0}} animate={{y:0,opacity:1}} exit={{y:18,opacity:0}} transition={{duration:.3,ease}}><div className="checkout-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> PEMBAYARAN AMAN</div><h2>Sedikit lagi, <em>jadi milikmu.</em></h2></div><button className="dialog-close" onClick={onClose}><X/></button></div><div className="checkout-layout"><div className="checkout-fields"><section className="checkout-block"><div className="block-heading"><span>01</span><h3>Data diri</h3></div><div className="account-switch"><button className={guest?'active':''} onClick={()=>setGuest(true)}>Lanjut sebagai tamu</button><button className={!guest?'active':''} onClick={()=>setGuest(false)}>Masuk</button></div>{guest ? <div className="field-stack"><label>Nama lengkap<input value={name} onChange={e=>setName(e.target.value)} placeholder="Nama kamu"/></label><label>Nomor WhatsApp<input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="+62 8xx xxxx xxxx"/></label><label>Alamat surel<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label></div> : <div className="signin-placeholder">Fitur masuk akun akan tersedia setelah pengaturan autentikasi selesai.</div>}</section><section className="checkout-block"><div className="block-heading"><span>02</span><h3>Metode pembayaran</h3></div><div className="payment-options"><button className={payment==='qris'?'payment-option active':'payment-option'} onClick={()=>setPayment('qris')}><span className="payment-icon"><Command/></span><span><strong>QRIS</strong><small>Pindai untuk membayar</small></span>{payment==='qris'&&<Check className="selected-check"/>}</button><button className={payment==='ewallet'?'payment-option active':'payment-option'} onClick={()=>setPayment('ewallet')}><span className="payment-icon"><Wallet/></span><span><strong>Dompet digital</strong><small>Transfer secara manual</small></span>{payment==='ewallet'&&<Check className="selected-check"/>}</button><button className={payment==='wallet'?'payment-option active':'payment-option'} onClick={()=>setPayment('wallet')}><span className="payment-icon"><CreditCard/></span><span><strong>Saldo Aco</strong><small>Masuk required</small></span>{payment==='wallet'&&<Check className="selected-check"/>}</button></div></section><section className="checkout-block"><div className="block-heading"><span>03</span><h3>Kode voucher</h3></div><div className="voucher-field"><input value={voucher} onChange={e=>setVoucher(e.target.value)} placeholder="Masukkan kode"/><button onClick={()=>setNotice('Pemeriksaan voucher akan terhubung ke layanan pembayaran saat fitur diaktifkan.')}>Gunakan</button></div></section></div><aside className="order-summary"><div className="block-heading"><span>04</span><h3>Ringkasan pesanan</h3></div><div className="summary-item"><div className="summary-symbol">{product?.symbol || 'a.'}</div><div><strong>{product?.name || 'Pilih a product'}</strong><small>{product ? 'Paket 30 hari · ilustrasi' : 'Belum ada produk dipilih'}</small></div></div><div className="summary-lines"><div><span>Subtotal</span><strong>{product?formatIDR(product.price):'—'}</strong></div><div><span>Diskon</span><strong>—</strong></div><div className="summary-total"><span>Total</span><strong>{product?formatIDR(product.price):'—'}</strong></div></div><button className="button button-light full-button" onClick={()=>setNotice('Pratinjau ini belum menerima pembayaran. Pembuatan pesanan akan diaktifkan setelah verifikasi pembayaran di sisi server dan pengujian keamanan selesai.')}>Lanjutkan pembayaran <ArrowRight size={16}/></button><p className="summary-security"><ShieldCheck size={15}/> Informasi kamu ditangani dengan aman.</p></aside></div>{notice && <div className="inline-notice">{notice}</div>}<p className="checkout-footnote">Hanya pratinjau. Tidak ada pembayaran yang diproses atau pesanan yang dibuat dari halaman ini.</p></motion.div></motion.div>
}

export default App
