from fields import *
ML = {"price": "السعر", "rating": "التقييم", "discount": "الخصم", "popular": "الطلب عليه (المبيعات)", "reviews": "عدد المراجعات", "stock": "التوفر"}
M = lambda off=(): [SW(f"m_{k}", f"قارن بـ: {v}", k not in off) for k, v in ML.items()]
W = lambda d: [NUM(f"w_{k}", f"وزن «{v}» الافتراضي", d.get(k, 2), 0, 5) for k, v in ML.items()]
cmp_ = dict(title="فيصل · مقارنة بأولوياتك", icon="sicon-sliders", name="faisal-compare", fields=HEAD("فيصل يقارن", "حرّك أولوياتك… ونقول لك الأنسب", "") + SRC("best_selling", 3, 4) + [
    SW("sliders", "🧠 أشرطة أولويات يحركها العميل", True), SW("remember", "🧠 تذكّر أولويات العميل في زيارته القادمة", True), SW("show_score", "نسبة التطابق", True), SW("show_reason", "سبب الترشيح بلغة بسيطة", True), SW("highlight", "تمييز الأفضل في كل صف", True),
    T("win_label", "شارة الفائز", "الأنسب لك", mx=30), T("corner_label", "عنوان العمود الأول", "أولوياتك تقرر", mx=40),
    COLL("specs", "صفوف مواصفات إضافية (القيمة 1 = المنتج الأول …)", [T("label", "اسم المواصفة", mx=40), T("v1", "قيمة المنتج 1", mx=60), T("v2", "قيمة المنتج 2", mx=60), T("v3", "قيمة المنتج 3", mx=60), T("v4", "قيمة المنتج 4", mx=60)], [], mx=15, item="مواصفة")] + M(("reviews", "stock")) + W({"price": 3, "rating": 3}) + DESIGN())
pick = dict(title="فيصل · اختر وقارن", icon="sicon-check-circle", name="faisal-picker", fields=HEAD("اختر وقارن", "محتار بينهم؟ قارن بنفسك", "") + SRC("best_selling", 8, 16) + [
    NUM("max_pick", "أقصى عدد للمقارنة", 3, 2, 4), SW("preselect_seen", "🧠 اختر تلقائياً ما شاهده العميل مؤخراً", True), SW("auto_open", "افتح المقارنة تلقائياً عند وجود اختيارات", True), SW("show_score", "نتيجة إجمالية", True), SW("quick_add", "زر إضافة في البطاقات", True),
    T("hint", "نص الإرشاد", "", mx=80), T("cta", "نص زر المقارنة", "قارن الآن", mx=30)] + M(("reviews",)) + W({"price": 3, "rating": 3, "discount": 1, "popular": 1, "reviews": 1, "stock": 1}) + DESIGN())
duel = dict(title="فيصل · وجهاً لوجه", icon="sicon-swap-horizontal", name="faisal-duel", fields=HEAD("وجهاً لوجه", "أيهما يناسبك؟", "") + SRC("best_selling", 2, 2)[:2] + [
    SW("same_category", "🧠 إذا اخترت منتجاً واحداً: اختر منافسه من نفس التصنيف تلقائياً", True), SW("show_verdict", "خلاصة «للتوفير» و«للأفضل»", True), T("vs_label", "نص الدائرة", "VS", ml=False, mx=6),
    T("saver_label", "عنوان خلاصة التوفير", "إذا يهمك التوفير", mx=40), T("best_label", "عنوان خلاصة الأفضل", "إذا تبي الأفضل إجمالاً", mx=40),
    COLL("rows", "صفوف مقارنة إضافية", [T("label", "المواصفة", mx=40), T("a", "قيمة المنتج الأول", mx=60), T("b", "قيمة المنتج الثاني", mx=60)], [], mx=12, item="صف")] + M(("stock",)) + DESIGN())
val = dict(title="فيصل · السعر لكل وحدة", icon="sicon-calculator", name="faisal-value", fields=HEAD("حاسبة القيمة", "مين أوفر فعلاً؟ السعر لكل وحدة", "") + SRC("best_selling", 12, 24)[:3] + [
    COLL("sizes", "أحجام المنتجات (اختياري — نقرأ الحجم من الاسم تلقائياً مثل 100 مل)", [PROD("product", "المنتج", 1, 1), NUM("amount", "الكمية", 100, 1, 5000), RADIO("unit", "الوحدة", [("ml", "مل"), ("g", "جرام"), ("pc", "حبة/قطعة")])], [], mx=30, item="حجم"),
    RADIO("unit_filter", "الوحدة المقارنة", [("auto", "🧠 الأكثر شيوعاً تلقائياً"), ("ml", "مل"), ("g", "جرام"), ("pc", "حبة")]), NUM("per", "احسب السعر لكل", 100, 1, 1000), NUM("show", "عدد المنتجات", 6, 2, 12),
    SW("include_oos", "أدرج النافد"), SW("show_bar", "شريط القيمة", True), SW("show_saving", "نسبة التوفير الحقيقية", True), T("best_label", "شارة الأوفر", "الأوفر قيمة", mx=30)] + DESIGN())
fit = dict(title="فيصل · أنت من أي نوع؟", icon="sicon-user-circle", name="faisal-fit", fields=HEAD("أنت من أي نوع؟", "اختر وصفك… ونختار لك", "") + [
    COLL("personas", "شخصيات العملاء (اختياري — بدونها تُبنى تلقائياً من بيانات متجرك)", [T("icon", "أيقونة (إيموجي)", "✨", ml=False, mx=4), T("title", "الوصف القصير", mx=40), T("desc", "سطر توضيحي", mx=80), PROD("product", "المنتج المناسب", 1, 1), T("why", "لماذا يناسبه", mx=120), TA("pros", "المزايا (مفصولة بفاصلة)", mx=300), TA("cons", "يُنتبه له (مفصول بفاصلة)", mx=300)], [], mx=8, item="شخصية"),
    SW("mix_auto", "أضف الشخصيات التلقائية مع شخصياتك"), RADIO("auto_source", "🤖 مصدر المنتجات التلقائي", SOURCES), NUM("pool", "عدد المنتجات التي يحللها", 16, 4, 40), NUM("max_personas", "أقصى عدد شخصيات", 5, 2, 8), NUM("min_reviews", "أقل عدد تقييمات لشخصية «الجودة»", 3, 0, 50), SW("unique", "منتج مختلف لكل شخصية", True),
    SW("p_saver", "💰 شخصية: الأوفر", True), SW("p_quality", "⭐ شخصية: الأعلى تقييماً", True), SW("p_popular", "🔥 شخصية: الأكثر طلباً", True), SW("p_deal", "🏷️ شخصية: أقوى عرض", True), SW("p_gift", "🎁 شخصية: الهدية الفاخرة", True),
    SW("show_pros", "المزايا", True), SW("show_cons", "ما يُنتبه له (صراحة تبني الثقة)", True), T("cta", "نص الزر", "أضف للسلة", mx=30)] + DESIGN())
build("tw-faisal", {"ar": "فَيصَل — مساعد المقارنة والقرار", "en": "Faisal — Smart Comparison & Decision Helper"},
      {"ar": "5 عناصر تحسم تردد العميل: مقارنة بأشرطة أولويات تتغير معها التوصية وسببها، «اختر وقارن» يتذكر ما شاهده، مواجهة وجهاً لوجه، حاسبة السعر لكل وحدة تقرأ الحجم من اسم المنتج، و«أنت من أي نوع؟» تبني الشخصيات تلقائياً من بيانات متجرك — كل الأرقام من منتجاتك الحقيقية.",
       "en": "5 components that end hesitation: priority-slider comparison with a live recommendation and reason, pick-and-compare that remembers what was viewed, head-to-head duel, price-per-unit calculator reading sizes from product names, and a shopper-persona picker built automatically from your store data — every number comes from your real products."},
      [cmp_, pick, duel, val, fit])
