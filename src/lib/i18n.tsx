import { createContext, useContext, useEffect, useState } from 'react'
import type { BookLanguage, Category, Format, Product } from '@/data/products'

export type Lang = 'en' | 'ta'

const dictionary = {
  'nav.home': ['Home', 'முகப்பு'],
  'nav.store': ['Store', 'கடை'],
  'nav.about': ['About', 'எங்களைப் பற்றி'],
  'nav.contact': ['Contact', 'தொடர்பு'],
  'nav.cart': ['Cart', 'கூடை'],
  'hero.eyebrow': ['Modern Digital Bookstore', 'நவீன டிஜிட்டல் புத்தகக் கடை'],
  'hero.title': ['Knowledge is your greatest investment.', 'அறிவே உங்கள் சிறந்த முதலீடு.'],
  'hero.body': [
    'Carefully crafted eBooks, practical templates and actionable guides in Tamil and English — all in one place.',
    'தமிழ் மற்றும் ஆங்கிலத்தில் பயனுள்ள மின்னூல்கள், நடைமுறை டெம்ப்ளேட்கள் மற்றும் வழிகாட்டிகள் — ஒரே இடத்தில்.',
  ],
  'hero.cta': ['Explore Books', 'நூல்களைப் பாருங்கள்'],
  'hero.story': ['Our story', 'எங்கள் கதை'],
  'hero.note': ['EBOOKS · TEMPLATES · GUIDES · INSTANT ACCESS', 'மின்னூல்கள் · டெம்ப்ளேட்கள் · வழிகாட்டிகள் · உடனடி அணுகல்'],
  'store.eyebrow': ['The collection', 'எங்கள் தொகுப்பு'],
  'store.title': ['Explore our store', 'எங்கள் கடையைப் பாருங்கள்'],
  'store.intro': [
    'Clear, useful digital resources for learning, work and everyday life. Instant digital delivery.',
    'கல்வி, வேலை மற்றும் அன்றாட வாழ்க்கைக்கான தெளிவான டிஜிட்டல் வளங்கள்.',
  ],
  'store.search': ['Search eBooks, templates and guides…', 'மின்னூல்கள், டெம்ப்ளேட்கள் தேடுங்கள்…'],
  'store.all': ['All', 'அனைத்தும்'],
  'store.allFormats': ['All formats', 'அனைத்து வகைகள்'],
  'store.wishlist': ['Wishlist', 'விருப்பப் பட்டியல்'],
  'store.empty': ['No products match your search.', 'உங்கள் தேடலுக்குப் பொருந்தும் தயாரிப்புகள் இல்லை.'],
  'store.reset': ['Clear filters', 'வடிகட்டிகளை அழி'],
  'store.items': ['items', 'தயாரிப்புகள்'],
  'card.add': ['Add to cart', 'கூடையில் சேர்'],
  'card.added': ['In cart', 'கூடையில் உள்ளது'],
  'card.save': ['Save', 'சேமி'],
  'card.saved': ['Saved', 'சேமிக்கப்பட்டது'],
  'card.pages': ['pages', 'பக்கங்கள்'],
  'format.ebook': ['eBook', 'மின்னூல்'],
  'format.template': ['Template', 'டெம்ப்ளேட்'],
  'format.guide': ['Guide', 'வழிகாட்டி'],
  'format.storybook': ['Illustrated Storybook', 'வண்ணப் படக் கதைப் புத்தகம்'],
  'format.artbook': ['Art & Drawing Book', 'வரைதல் & ஓவியப் புத்தகம்'],
  'format.workbook': ['Activity Workbook', 'செயல்முறைப் பயிற்சி நூல்'],
  'productType.digital': ['Digital Product', 'டிஜிட்டல் தயாரிப்பு'],
  'productType.physical': ['Physical Printed Book', 'அச்சிடப்பட்ட புத்தகம்'],
  'productType.both': ['Digital & Physical', 'டிஜிட்டல் & அச்சு இரண்டிலும்'],
  'edition.digital': ['Digital Edition (eBook)', 'டிஜிட்டல் பதிப்பு (மின்னூல்)'],
  'edition.digitalShort': ['Digital (PDF)', 'டிஜிட்டல் (PDF)'],
  'edition.digitalNote': [
    'Instant electronic download. Read on any phone, tablet or laptop.',
    'உடனடி மின்னணு பதிவிறக்கம். மொபைல், டேப்லெட், மடிக்கணினியில் படிக்கலாம்.',
  ],
  'edition.physical': ['Physical Book (Printed)', 'அச்சிடப்பட்ட புத்தகம்'],
  'edition.physicalShort': ['Printed Book', 'அச்சுப் புத்தகம்'],
  'edition.physicalNote': [
    'Delivered to your doorstep in durable high-quality print.',
    'உயர்தர தாளில் அச்சிடப்பட்டு உங்கள் முகவரிக்கு அனுப்பப்படும்.',
  ],
  'edition.selectPrompt': ['Choose Edition', 'பதிப்பைத் தேர்ந்தெடுக்கவும்'],
  'edition.bothAvailable': ['Available in Digital & Physical', 'டிஜிட்டல் & அச்சு இரண்டிலும்'],
  'filter.allTypes': ['All Types', 'அனைத்து வகைகள்'],
  'filter.digital': ['Digital Products', 'டிஜிட்டல் தயாரிப்புகள்'],
  'filter.physical': ['Physical Books', 'அச்சிடப்பட்ட புத்தகங்கள்'],
  'checkout.shippingAddress': ['Doorstep Shipping Address', 'டெலிவரி தெரு முகவரி'],
  'checkout.shippingCity': ['City / Town', 'நகரம்'],
  'checkout.shippingPincode': ['Postal Pincode', 'அஞ்சல் குறியீடு'],
  'checkout.shippingStreetPlaceholder': ['Door / Flat No., Street, Area, Landmark', 'கதவு எண், தெரு, பகுதி'],
  'checkout.shippingCityPlaceholder': ['e.g. Chennai, Madurai, Coimbatore', 'உதா. சென்னை, மதுரை, கோவை'],
  'checkout.shippingPincodePlaceholder': ['600001', '600001'],
  'checkout.shippingNotice': [
    'Physical copies are dispatched securely to this address.',
    'அச்சிடப்பட்ட புத்தகங்கள் இந்த முகவரிக்கு பாதுகாப்பாக அனுப்பப்படும்.',
  ],
  'confirmation.physicalStatus': ['Physical Book Dispatch', 'அச்சுப் புத்தக விநியோகம்'],
  'confirmation.physicalNotice': [
    'Physical copies are carefully packaged and dispatched within 24–48 hours of payment verification.',
    'சரிபார்க்கப்பட்ட 24–48 மணி நேரத்திற்குள் அச்சுப் புத்தகங்கள் கவனமாக பேக் செய்யப்பட்டு அனுப்பப்படும்.',
  ],
  'confirmation.deliveryMethod': ['Fulfillment Details', 'விநியோக விவரங்கள்'],
  'lang.en': ['English', 'ஆங்கிலம்'],
  'lang.ta': ['Tamil', 'தமிழ்'],
  'lang.both': ['Tamil + English', 'தமிழ் + ஆங்கிலம்'],
  'product.back': ['Back to the store', 'கடைக்குத் திரும்பு'],
  'product.includes': ["What's inside", 'உள்ளே என்ன இருக்கிறது'],
  'product.language': ['Language', 'மொழி'],
  'product.format': ['Format', 'வகை'],
  'product.length': ['Length', 'நீளம்'],
  'product.delivery': ['Delivery', 'விநியோகம்'],
  'product.deliveryValue': ['Digital download (PDF)', 'டிஜிட்டல் பதிவிறக்கம் (PDF)'],
  'product.buy': ['Buy now', 'இப்போது வாங்கு'],
  'product.related': ['You may also like', 'உங்களுக்குப் பிடிக்கலாம்'],
  'product.secure': ['Secure checkout powered by Stripe', 'Stripe மூலம் பாதுகாப்பான கட்டணம்'],
  'cart.title': ['Your cart', 'உங்கள் கூடை'],
  'cart.empty': ['Your cart is empty.', 'உங்கள் கூடை காலியாக உள்ளது.'],
  'cart.browse': ['Browse the store', 'கடையைப் பாருங்கள்'],
  'cart.remove': ['Remove', 'நீக்கு'],
  'cart.subtotal': ['Subtotal', 'மொத்தம்'],
  'cart.note': [
    'Digital products are delivered electronically. No shipping fee.',
    'டிஜிட்டல் பொருட்கள் ஆன்லைனில் வழங்கப்படும். டெலிவரி கட்டணம் இல்லை.',
  ],
  'cart.productSubtotal': ['Product subtotal', 'பொருட்களின் கூட்டுத்தொகை'],
  'cart.deliveryFee': ['Delivery fee', 'விநியோகக் கட்டணம்'],
  'cart.digitalDelivery': ['Digital delivery', 'டிஜிட்டல் விநியோகம்'],
  'cart.included': ['Included', 'சேர்க்கப்பட்டுள்ளது'],
  'cart.free': ['FREE', 'இலவசம்'],
  'cart.finalTotal': ['Final total', 'இறுதி மொத்தம்'],
  'cart.freeUnlocked': [
    'You have unlocked FREE delivery!',
    'இலவச விநியோகம் கிடைத்துவிட்டது!',
  ],
  'cart.addMore': [
    'Add {amount} more for FREE delivery.',
    'இலவச விநியோகத்திற்கு இன்னும் {amount} சேர்க்கவும்.',
  ],
  'cart.checkout': ['Checkout', 'பணம் செலுத்து'],
  'checkout.processing': ['Processing…', 'செயலாக்கப்படுகிறது…'],
  'checkout.whatsapp': ['Order on WhatsApp', 'WhatsApp-இல் ஆர்டர் செய்'],
  'checkout.unavailableNote': [
    'Online payments are being set up. Message us on WhatsApp to order today.',
    'ஆன்லைன் கட்டணம் அமைக்கப்படுகிறது. இன்றே ஆர்டர் செய்ய WhatsApp-இல் தொடர்பு கொள்ளுங்கள்.',
  ],
  'checkout.error': ['Something went wrong. Please try again.', 'ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.'],
  'checkout.pageTitle': ['Checkout — AUVYRA', 'பணம் செலுத்துதல் — AUVYRA'],
  'checkout.heading': ['Secure Checkout', 'பாதுகாப்பான செக்அவுட்'],
  'checkout.subheading': [
    'Complete your customer details to place your digital order.',
    'உங்கள் டிஜிட்டல் ஆர்டரை வைக்க உங்கள் விவரங்களை உள்ளிடவும்.',
  ],
  'checkout.customerHeading': ['Customer Information', 'வாடிக்கையாளர் தகவல்கள்'],
  'checkout.fullName': ['Full Name', 'முழுப் பெயர்'],
  'checkout.fullNamePlaceholder': ['e.g. Barath Sudhakar', 'உதா. பரத் சுதாகர்'],
  'checkout.emailAddress': ['Email Address for Digital Delivery', 'டிஜிட்டல் விநியோகத்திற்கான மின்னஞ்சல்'],
  'checkout.emailPlaceholder': ['you@example.com', 'you@example.com'],
  'checkout.whatsappNumber': ['WhatsApp Mobile Number', 'வாட்ஸ்அப் எண்'],
  'checkout.whatsappPlaceholder': ['98765 43210', '98765 43210'],
  'checkout.whatsappHelp': [
    'Order confirmation & verification updates will be sent here.',
    'ஆர்டர் உறுதிப்படுத்தல் மற்றும் சரிபார்ப்பு விவரங்கள் இங்கு அனுப்பப்படும்.',
  ],
  'checkout.notesLabel': ['Order Notes (Optional)', 'கூடுதல் குறிப்புகள் (விருப்பத்தேர்வு)'],
  'checkout.notesPlaceholder': [
    'Special instructions or alternate email...',
    'குறிப்புகள் அல்லது மாற்று மின்னஞ்சல் முகவரி...',
  ],
  'checkout.orderSummary': ['Order Summary', 'ஆர்டர் சுருக்கம்'],
  'checkout.digitalNotice': [
    'Digital downloads delivered upon payment verification. No physical shipping charges.',
    'கட்டணம் சரிபார்க்கப்பட்டதும் டிஜிட்டல் கோப்புகள் வழங்கப்படும். டெலிவரி கட்டணம் இல்லை.',
  ],
  'checkout.paymentHeading': ['Payment Verification', 'கட்டண சரிபார்ப்பு'],
  'checkout.paymentPendingNotice': [
    'Payment status will remain Pending until confirmed. Direct UPI / Bank verification is active.',
    'கட்டணம் உறுதிப்படுத்தப்படும் வரை நிலை நிலுவையில் இருக்கும். நேரடி UPI / வங்கி சரிபார்ப்பு செயல்படுகிறது.',
  ],
  'checkout.placeOrderBtn': ['Place Order', 'ஆர்டரை வைக்கவும்'],
  'checkout.placingOrderBtn': ['Placing Order…', 'ஆர்டர் செய்யப்படுகிறது…'],
  'checkout.emptyCartTitle': ['Your cart is empty', 'உங்கள் கூடை காலியாக உள்ளது'],
  'checkout.emptyCartMsg': [
    'Add some eBooks or templates to your cart before proceeding to checkout.',
    'செக்அவுட் செய்வதற்கு முன் சில மின்னூல்கள் அல்லது டெம்ப்ளேட்களை கூடையில் சேர்க்கவும்.',
  ],
  'checkout.returnToStore': ['Return to Bookstore', 'புத்தகக் கடைக்குத் திரும்பு'],
  'checkout.viewCart': ['Edit Cart', 'கூடையைத் திருத்து'],
  'checkout.securityGuarantee': [
    'Instant order recording · Anti-duplicate protection · Direct creator verification',
    'உடனடி ஆர்டர் பதிவு · நகல் பாதுகாப்பு · நேரடி படைப்பாளர் சரிபார்ப்பு',
  ],
  'confirmation.title': ['Order Placed Successfully', 'ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டது'],
  'confirmation.subtitle': [
    'Thank you! Your order details have been recorded.',
    'நன்றி! உங்கள் ஆர்டர் விவரங்கள் பதிவு செய்யப்பட்டுள்ளன.',
  ],
  'confirmation.orderIdLabel': ['Order ID', 'ஆர்டர் எண்'],
  'confirmation.statusLabel': ['Payment Status', 'கட்டண நிலை'],
  'confirmation.statusPending': ['Pending Verification', 'சரிபார்ப்பு நிலுவையில் உள்ளது'],
  'confirmation.statusVerified': ['Payment Verified & Active', 'கட்டணம் சரிபார்க்கப்பட்டது'],
  'confirmation.customerDetails': ['Customer & Delivery Details', 'வாடிக்கையாளர் & விநியோக விவரங்கள்'],
  'confirmation.orderedItems': ['Ordered Products', 'ஆர்டர் செய்யப்பட்ட தயாரிப்புகள்'],
  'confirmation.digitalAccessHeading': ['Digital Product Download', 'டிஜிட்டல் தயாரிப்பு பதிவிறக்கம்'],
  'confirmation.lockedNotice': [
    'Download access will automatically unlock once payment is verified by our team. Verification typically completes within 5–15 minutes.',
    'எங்கள் குழுவால் கட்டணம் சரிபார்க்கப்பட்டதும் பதிவிறக்க அனுமதி தானாகவே திறக்கப்படும். வழக்கமாக 5-15 நிமிடங்களில் முடிவடையும்.',
  ],
  'confirmation.verifiedNotice': [
    'Your payment has been verified! You now have permanent access to your purchased digital files.',
    'உங்கள் கட்டணம் சரிபார்க்கப்பட்டது! நீங்கள் வாங்கிய டிஜிட்டல் கோப்புகளை இப்போது பதிவிறக்கலாம்.',
  ],
  'confirmation.downloadBtn': ['Download PDF / Files', 'PDF / கோப்புகளைப் பதிவிறக்கு'],
  'confirmation.lockedBtn': ['Download Locked (Pending Payment)', 'பதிவிறக்கம் பூட்டப்பட்டுள்ளது'],
  'confirmation.sendOnWhatsapp': ['Confirm & Send Payment on WhatsApp', 'வாட்ஸ்அப்பில் கட்டணத்தை உறுதிப்படுத்து'],
  'confirmation.simulateVerification': ['Simulate Payment Verification (Demo Mode)', 'கட்டண சரிபார்ப்பை உருவகப்படுத்து (டெமோ)'],
  'order.eyebrow': ['WhatsApp order', 'WhatsApp ஆர்டர்'],
  'order.title': ['Your details', 'உங்கள் விவரங்கள்'],
  'order.close': ['Close', 'மூடு'],
  'order.total': ['Total', 'மொத்தம்'],
  'order.name': ['Full name', 'முழுப் பெயர்'],
  'order.mobile': ['Mobile number', 'கைபேசி எண்'],
  'order.address': ['Full delivery address', 'முழு முகவரி'],
  'order.addressHint': [
    'House no., street, area, city, district, state',
    'வீட்டு எண், தெரு, பகுதி, நகரம், மாவட்டம், மாநிலம்',
  ],
  'order.pincode': ['Pincode', 'அஞ்சல் குறியீடு'],
  'order.submit': ['Send order on WhatsApp', 'WhatsApp-இல் ஆர்டரை அனுப்பு'],
  'order.note': [
    'WhatsApp opens with your order ready. Tap send and our team will confirm payment and delivery.',
    'உங்கள் ஆர்டருடன் WhatsApp திறக்கும். அனுப்பு என்பதைத் தட்டுங்கள்; எங்கள் குழு கட்டணம் மற்றும் விநியோகத்தை உறுதிப்படுத்தும்.',
  ],
  'order.err.required': ['This field is required.', 'இந்தப் புலம் அவசியம்.'],
  'order.err.name': ['Please enter your full name.', 'உங்கள் முழுப் பெயரை உள்ளிடவும்.'],
  'order.err.mobile': [
    'Enter a valid 10-digit mobile number.',
    'சரியான 10 இலக்க கைபேசி எண்ணை உள்ளிடவும்.',
  ],
  'order.err.address': [
    'Please enter your complete address.',
    'உங்கள் முழு முகவரியை உள்ளிடவும்.',
  ],
  'order.err.pincode': ['Enter a valid 6-digit pincode.', 'சரியான 6 இலக்க அஞ்சல் குறியீட்டை உள்ளிடவும்.'],
  'order.sentTitle': ['Almost done!', 'கிட்டத்தட்ட முடிந்தது!'],
  'order.sentBody': [
    'Your order is ready in WhatsApp. Tap send there to place it, and we will reply shortly to confirm.',
    'உங்கள் ஆர்டர் WhatsApp-இல் தயாராக உள்ளது. அங்கே அனுப்பு என்பதைத் தட்டுங்கள்; விரைவில் உறுதிப்படுத்துவோம்.',
  ],
  'order.reopen': ['Open WhatsApp again', 'மீண்டும் WhatsApp திற'],
  'order.done': ['Done', 'சரி'],
  'about.eyebrow': ['About AUVYRA', 'AUVYRA பற்றி'],
  'about.title': ['Knowledge should move with you.', 'அறிவு உங்களுடன் பயணிக்க வேண்டும்.'],
  'about.body': [
    'AUVYRA is an independent digital publishing store founded by Barath and Kavi. Our aim is to make useful knowledge clear, approachable and easy to carry wherever you go — in the language you think in.',
    'AUVYRA என்பது பரத் மற்றும் கவி ஆகியோரால் தொடங்கப்பட்ட ஒரு சுயாதீன டிஜிட்டல் பதிப்பகம். பயனுள்ள அறிவை தெளிவாகவும், எளிதாகவும், நீங்கள் சிந்திக்கும் மொழியிலும் வழங்குவதே எங்கள் நோக்கம்.',
  ],
  'about.v1': ['Simple to understand', 'எளிதில் புரியும்'],
  'about.v2': ['Useful in real life', 'நிஜ வாழ்க்கையில் பயனுள்ளது'],
  'about.v3': ['Learn at your pace', 'உங்கள் வேகத்தில் கற்றுக்கொள்ளுங்கள்'],
  'promise.1t': ['Tamil & English', 'தமிழ் & ஆங்கிலம்'],
  'promise.1b': ['Written for how you read', 'நீங்கள் படிக்கும் விதத்திற்கேற்ப'],
  'promise.2t': ['Instant digital files', 'உடனடி டிஜிட்டல் கோப்புகள்'],
  'promise.2b': ['PDF, Docs and Sheets', 'PDF, Docs மற்றும் Sheets'],
  'promise.3t': ['Fair, simple pricing', 'நியாயமான விலை'],
  'promise.3b': ['Most titles under ₹300', 'பெரும்பாலானவை ₹300-க்குள்'],
  'promise.4t': ['Real human support', 'உண்மையான உதவி'],
  'promise.4b': ['Message us on WhatsApp', 'WhatsApp-இல் தொடர்பு கொள்ளுங்கள்'],
  'featured.eyebrow': ['Editor’s picks', 'தேர்ந்தெடுத்தவை'],
  'featured.title': ['Start with these', 'இவற்றிலிருந்து தொடங்குங்கள்'],
  'contact.eyebrow': ['Contact AUVYRA', 'AUVYRA-வைத் தொடர்பு கொள்ள'],
  'contact.title': ['Your next idea starts here.', 'உங்கள் அடுத்த யோசனை இங்கே தொடங்குகிறது.'],
  'contact.body': [
    'For questions, bulk orders and support, message our team on WhatsApp.',
    'கேள்விகள், மொத்த ஆர்டர்கள் மற்றும் உதவிக்கு WhatsApp-இல் எங்களைத் தொடர்பு கொள்ளுங்கள்.',
  ],
  'footer.rights': ['All rights reserved.', 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'],
  'success.title': ['Thank you for your order', 'உங்கள் ஆர்டருக்கு நன்றி'],
  'success.body': [
    'Your payment is complete. Your files will be sent to the email address you used at checkout. If anything is missing, message us on WhatsApp and we will help right away.',
    'உங்கள் கட்டணம் முடிந்தது. கட்டணத்தின் போது கொடுத்த மின்னஞ்சலுக்கு உங்கள் கோப்புகள் அனுப்பப்படும். ஏதேனும் சிக்கல் இருந்தால் WhatsApp-இல் தொடர்பு கொள்ளுங்கள்.',
  ],
  'cancel.title': ['Checkout cancelled', 'கட்டணம் ரத்து செய்யப்பட்டது'],
  'cancel.body': [
    'No payment was taken. Your cart is saved whenever you are ready.',
    'எந்தக் கட்டணமும் எடுக்கப்படவில்லை. உங்கள் கூடை சேமிக்கப்பட்டுள்ளது.',
  ],
  'cancel.back': ['Return to cart', 'கூடைக்குத் திரும்பு'],
  'common.home': ['Back to home', 'முகப்புக்குத் திரும்பு'],
  'notFound.title': ['Page not found', 'பக்கம் கிடைக்கவில்லை'],
  'notFound.body': [
    'The page you are looking for has moved or does not exist.',
    'நீங்கள் தேடும் பக்கம் நகர்த்தப்பட்டது அல்லது இல்லை.',
  ],
} as const satisfies Record<string, readonly [string, string]>

export type TKey = keyof typeof dictionary

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'auvyra:lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'ta' || saved === 'en') setLangState(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  const t = (key: TKey) => dictionary[key][lang === 'ta' ? 1 : 0]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}

/** Localized accessors for catalog content. */
export function useCatalogText() {
  const { lang, t } = useLanguage()
  const ta = lang === 'ta'
  return {
    name: (p: Product) => (ta ? p.nameTa : p.name),
    short: (p: Product) => (ta ? p.shortDescriptionTa : p.shortDescription),
    description: (p: Product) => (ta ? p.descriptionTa : p.description),
    includes: (p: Product) => (ta ? p.includesTa : p.includes),
    category: (c: Category) => (ta ? c.nameTa : c.name),
    categoryBlurb: (c: Category) => (ta ? c.blurbTa : c.blurb),
    format: (f: Format) => t(`format.${f}` as TKey),
    edition: (ed: 'digital' | 'physical') => t(`edition.${ed}` as TKey),
    editionShort: (ed: 'digital' | 'physical') => t(`edition.${ed}Short` as TKey),
    productType: (pt: 'digital' | 'physical' | 'both') => t(`productType.${pt}` as TKey),
    language: (l: BookLanguage) => t(`lang.${l}`),
  }
}
