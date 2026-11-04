import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, CircleHelp, Clock3, Command, CreditCard, Filter, Headphones, Menu, Search, ShieldCheck, ShoppingBag, Sparkles, Wallet, X } from 'lucide-react'
import { products, formatIDR, type Product } from './data/products'
import { isBackendConfigured } from './lib/supabase'

const categories = ['All products', 'Entertainment', 'AI & Productivity', 'Design & Creative', 'Video & Editing']
const ease = [0.22, 1, 0.36, 1] as const

function App() {
  const [activeCategory, setActiveCategory] = useState('All products')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Product | null>(null)
  const [checkout, setCheckout] = useState(false)
  const [payment, setPayment] = useState('qris')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const visibleProducts = useMemo(() => products.filter(p =>
    (activeCategory === 'All products' || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  ), [activeCategory, search])

  const startCheckout = (product: Product) => { setSelected(product); setCheckout(true) }

  return <div className="site-shell">
    <div className="preview-strip"><span className="status-dot" /> {isBackendConfigured ? 'CONNECTED PREVIEW' : 'DESIGN PREVIEW'} <span className="strip-separator">/</span> ACO.DIGITAL <span className="strip-right">A considered digital store</span></div>
    <header className="topbar">
      <a className="brand" href="#" aria-label="Aco Digital home"><span className="brand-mark">a.</span><span>aco<span className="brand-dot">.</span>digital</span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#catalog" onClick={() => setMenuOpen(false)}>Discover</a>
        <a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
        <a href="#help" onClick={() => setMenuOpen(false)}>Support</a>
      </nav>
      <div className="nav-actions"><button className="icon-button search-trigger" aria-label="Focus search" onClick={() => document.getElementById('catalog-search')?.focus()}><Search size={18}/></button><button className="text-button" onClick={() => setCheckout(true)}>My account <ArrowUpRight size={14}/></button><button className="mobile-menu icon-button" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true"><span/><span/><span/><span/><span/></div>
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.6}}><span className="eyebrow-line"/> THE DIGITAL EDITION · 2026</motion.div>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8,ease}}>Everything digital.<br/><em>One destination.</em></motion.h1>
          <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:.7,ease}}>A considered collection of digital subscriptions and tools for the way you watch, create, and work.</motion.p>
          <motion.div className="hero-actions" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.22}}><a className="button button-light" href="#catalog">Explore the collection <ArrowUpRight size={16}/></a><a className="text-link" href="#how-it-works">How it works <ArrowDownRight size={15}/></a></motion.div>
        </div>
        <div className="hero-art" aria-label="Floating collection of app-inspired tiles">
          <motion.div className="orbit orbit-one" animate={{rotate:360}} transition={{duration:80,repeat:Infinity,ease:'linear'}}/>
          <motion.div className="orbit orbit-two" animate={{rotate:-360}} transition={{duration:100,repeat:Infinity,ease:'linear'}}/>
          <motion.div className="hero-tile tile-main" animate={{y:[0,-12,0],rotate:[-5,-2,-5]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}><span className="tile-label">THINK · CREATE</span><strong>AI<span>+</span></strong><small>PRODUCTIVITY</small></motion.div>
          <motion.div className="hero-tile tile-left" animate={{y:[0,10,0],rotate:[8,5,8]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}><strong>Ca</strong><small>CREATIVE</small></motion.div>
          <motion.div className="hero-tile tile-right" animate={{y:[0,-9,0],rotate:[7,10,7]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}><strong>N</strong><small>ENTERTAINMENT</small></motion.div>
          <motion.div className="hero-orb orb-a"/><motion.div className="hero-orb orb-b"/><div className="art-caption"><span>01 — 04</span><span>TOOLS FOR EVERY DAY</span></div>
        </div>
        <div className="hero-bottom"><span>CURATED DIGITAL ACCESS</span><span>SCROLL TO EXPLORE ↓</span><span>EST. 2026</span></div>
      </section>

      <section className="trust-row"><div><ShieldCheck/><span>Clear product information</span></div><div><Clock3/><span>Transparent activation period</span></div><div><Headphones/><span>Human support when you need it</span></div></section>

      <section className="catalog-section section-wrap" id="catalog">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> THE COLLECTION</div><h2>Find your next<br/><em>digital upgrade.</em></h2></div><p>Thoughtfully selected tools for entertainment, creativity, and getting things done.</p></div>
        <div className="catalog-tools"><div className="category-pills">{categories.map(cat => <button key={cat} className={activeCategory===cat?'category-pill active':'category-pill'} onClick={() => setActiveCategory(cat)}>{cat}</button>)}</div><label className="search-box"><Search size={17}/><input id="catalog-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search the collection"/><span>⌘ K</span></label></div>
        <div className="catalog-meta"><span>{visibleProducts.length.toString().padStart(2,'0')} PRODUCTS</span><button className="sort-button" onClick={()=>setShowAll(v=>!v)}><Filter size={14}/> {showAll?'Featured first':'All products'} <ChevronDown size={14}/></button></div>
        <div className="product-grid">{(showAll ? visibleProducts : visibleProducts.slice(0,6)).map((product,index)=><ProductCard key={product.id} product={product} index={index} onSelect={()=>setSelected(product)} onBuy={()=>startCheckout(product)}/>)}</div>
        {visibleProducts.length===0 && <div className="empty-state">No products found. Try another search.</div>}
        {visibleProducts.length>6 && <button className="load-more" onClick={()=>setShowAll(v=>!v)}>{showAll?'Show less':'View all products'} <ArrowRight size={15}/></button>}
      </section>

      <section className="spotlight section-wrap" id="collections"><div className="spotlight-copy"><div className="eyebrow"><span className="eyebrow-line"/> EDITOR'S PICK · 001</div><h2>Make room<br/>for <em>better ideas.</em></h2><p>Bring your creative process into focus with tools that make good ideas easier to shape, share, and bring to life.</p><button className="button button-light" onClick={()=>setSelected(products.find(p=>p.id==='canva') || products[0])}>Explore creative tools <ArrowUpRight size={16}/></button></div><div className="spotlight-visual"><div className="spotlight-ring"/><div className="spotlight-card"><span>ACO / CREATIVE SUITE</span><strong>Make<br/><i>something</i><br/>matter.</strong><small>DESIGN YOUR NEXT CHAPTER</small></div><div className="spotlight-index">02<br/><span>CREATIVE</span></div></div></section>

      <section className="how-section section-wrap" id="how-it-works"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> A SIMPLE PROCESS</div><h2>Good things,<br/><em>made simple.</em></h2></div><p>No unnecessary steps. Just clear information, straightforward checkout, and updates along the way.</p></div><div className="steps-grid"><div className="step"><span>01</span><ShoppingBag/><h3>Choose your tool</h3><p>Explore the collection and select the product and package that fits.</p></div><div className="step"><span>02</span><CreditCard/><h3>Checkout your way</h3><p>Continue as a guest or sign in. Choose an available payment method.</p></div><div className="step"><span>03</span><Sparkles/><h3>Track your access</h3><p>Follow order progress and see activation and expiry details once processed.</p></div></div></section>

      <section className="support-band section-wrap" id="help"><div><div className="eyebrow"><span className="eyebrow-line"/> HERE TO HELP</div><h2>Questions?<br/><em>We've got you.</em></h2></div><div className="support-copy"><p>Need clarity on a package, activation, or an existing order? Our support team is here to help you make an informed choice.</p><a className="text-link" href="mailto:hello@aco.digital">Contact support <ArrowUpRight size={15}/></a></div><div className="support-mark"><CircleHelp/></div></section>
    </main>

    <footer className="footer"><div className="footer-main"><a className="brand" href="#"><span className="brand-mark">a.</span><span>aco<span className="brand-dot">.</span>digital</span></a><p>Everything digital.<br/>One destination.</p><div className="footer-links"><a href="#catalog">Products</a><a href="#how-it-works">How it works</a><a href="#help">Support</a><a href="mailto:hello@aco.digital">Contact</a></div></div><div className="footer-bottom"><span>© 2026 ACO.DIGITAL</span><span>MADE FOR YOUR DIGITAL EVERYDAY</span><span>TERMS · PRIVACY</span></div></footer>

    <AnimatePresence>{selected && <ProductDialog product={selected} onClose={()=>setSelected(null)} onBuy={()=>{setCheckout(true);setSelected(null)}}/>}</AnimatePresence>
    <AnimatePresence>{checkout && <CheckoutDialog product={selected} payment={payment} setPayment={setPayment} onClose={()=>setCheckout(false)}/>}</AnimatePresence>
  </div>
}

function ProductCard({product,index,onSelect,onBuy}:{product:Product;index:number;onSelect:()=>void;onBuy:()=>void}) {
  return <motion.article className={'product-card '+(index===0?'product-card-featured':'')} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.55,delay:(index%3)*.06,ease}}>
    <button className="card-open" onClick={onSelect} aria-label={'View '+product.name}><div className="card-topline"><span>{product.category.toUpperCase()}</span>{product.tag && <span className="product-tag">{product.tag}</span>}</div><div className="product-art" style={{'--product-accent':product.accent} as React.CSSProperties}><div className="product-orbit"/><div className="product-symbol">{product.symbol}</div><span className="art-code">ACO / DIGITAL GOODS</span></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.description}</p></div><ArrowUpRight size={17}/></div></button>
    <div className="card-bottom"><div><span>STARTING FROM</span><strong>{formatIDR(product.price)}</strong><small>{product.duration}</small></div><button className="add-button" onClick={onBuy}>Choose <ArrowRight size={14}/></button></div>
  </motion.article>
}

function ProductDialog({product,onClose,onBuy}:{product:Product;onClose:()=>void;onBuy:()=>void}) {
  return <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><motion.div className="dialog product-dialog" initial={{y:28,opacity:0}} animate={{y:0,opacity:1}} exit={{y:18,opacity:0}} transition={{duration:.3,ease}}><button className="dialog-close" onClick={onClose}><X/></button><div className="eyebrow"><span className="eyebrow-line"/> PRODUCT DETAILS</div><div className="dialog-product-art" style={{'--product-accent':product.accent} as React.CSSProperties}><span>{product.symbol}</span></div><span className="dialog-category">{product.category}</span><h2>{product.name}</h2><p>{product.description}</p><div className="detail-price"><span>STARTING FROM</span><strong>{formatIDR(product.price)}</strong><small>Example package · {product.duration}</small></div><div className="detail-note"><ShieldCheck size={17}/><span>Package terms, activation method, and warranty details will be shown before purchase.</span></div><button className="button button-light full-button" onClick={onBuy}>Continue to checkout <ArrowRight size={16}/></button><small className="demo-note">Catalog preview data — final packages and prices will be managed from the admin dashboard.</small></motion.div></motion.div>
}

function CheckoutDialog({product,payment,setPayment,onClose}:{product:Product|null;payment:string;setPayment:(v:string)=>void;onClose:()=>void}) {
  const [guest,setGuest] = useState(true)
  const [name,setName] = useState('')
  const [whatsapp,setWhatsapp] = useState('')
  const [email,setEmail] = useState('')
  const [voucher,setVoucher] = useState('')
  const [notice,setNotice] = useState('')
  return <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><motion.div className="dialog checkout-dialog" initial={{y:28,opacity:0}} animate={{y:0,opacity:1}} exit={{y:18,opacity:0}} transition={{duration:.3,ease}}><div className="checkout-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> SECURE CHECKOUT</div><h2>Almost <em>yours.</em></h2></div><button className="dialog-close" onClick={onClose}><X/></button></div><div className="checkout-layout"><div className="checkout-fields"><section className="checkout-block"><div className="block-heading"><span>01</span><h3>Your details</h3></div><div className="account-switch"><button className={guest?'active':''} onClick={()=>setGuest(true)}>Continue as guest</button><button className={!guest?'active':''} onClick={()=>setGuest(false)}>Sign in</button></div>{guest ? <div className="field-stack"><label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label><label>WhatsApp number<input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="+62 8xx xxxx xxxx"/></label><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label></div> : <div className="signin-placeholder">Account sign-in will be enabled after authentication setup.</div>}</section><section className="checkout-block"><div className="block-heading"><span>02</span><h3>Payment method</h3></div><div className="payment-options"><button className={payment==='qris'?'payment-option active':'payment-option'} onClick={()=>setPayment('qris')}><span className="payment-icon"><Command/></span><span><strong>QRIS</strong><small>Scan to pay</small></span>{payment==='qris'&&<Check className="selected-check"/>}</button><button className={payment==='ewallet'?'payment-option active':'payment-option'} onClick={()=>setPayment('ewallet')}><span className="payment-icon"><Wallet/></span><span><strong>E-wallet</strong><small>Transfer manually</small></span>{payment==='ewallet'&&<Check className="selected-check"/>}</button><button className={payment==='wallet'?'payment-option active':'payment-option'} onClick={()=>setPayment('wallet')}><span className="payment-icon"><CreditCard/></span><span><strong>Aco balance</strong><small>Sign in required</small></span>{payment==='wallet'&&<Check className="selected-check"/>}</button></div></section><section className="checkout-block"><div className="block-heading"><span>03</span><h3>Voucher code</h3></div><div className="voucher-field"><input value={voucher} onChange={e=>setVoucher(e.target.value)} placeholder="Enter code"/><button onClick={()=>setNotice('Voucher validation will be connected to the live checkout service.')}>Apply</button></div></section></div><aside className="order-summary"><div className="block-heading"><span>04</span><h3>Order summary</h3></div><div className="summary-item"><div className="summary-symbol">{product?.symbol || 'a.'}</div><div><strong>{product?.name || 'Choose a product'}</strong><small>{product ? '30-day package · illustrative' : 'No product selected'}</small></div></div><div className="summary-lines"><div><span>Subtotal</span><strong>{product?formatIDR(product.price):'—'}</strong></div><div><span>Discount</span><strong>—</strong></div><div className="summary-total"><span>Total</span><strong>{product?formatIDR(product.price):'—'}</strong></div></div><button className="button button-light full-button" onClick={()=>setNotice('This preview does not accept payments yet. Live order creation will be enabled after server-side payment verification and security testing.')}>Continue to payment <ArrowRight size={16}/></button><p className="summary-security"><ShieldCheck size={15}/> Your information is handled securely.</p></aside></div>{notice && <div className="inline-notice">{notice}</div>}<p className="checkout-footnote">Preview only. No payment will be collected and no order will be created from this screen.</p></motion.div></motion.div>
}

export default App
