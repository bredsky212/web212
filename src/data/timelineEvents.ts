import type { SupportedLocale } from "@/lib/i18n/locales";

export type LocalizedText = Partial<Record<SupportedLocale, string>>;

export type TimelineSource = {
  label: string;
  url: string;
};

export type TimelineEvent = {
  /** Stable id for UI keys */
  id: string;
  /** Sort key: YYYYMMDD (use the start date for ranges) */
  order: number;

  /** Small date label used in the timeline badge */
  dateLabel: LocalizedText;

  /** Emoji/icon used in the badge */
  icon: string;

  /** Small category label */
  era: LocalizedText;

  /** Event title */
  title: LocalizedText;

  /** Short summary shown on the card */
  summary: LocalizedText;

  /** Optional location (shown as a small meta line) */
  location?: LocalizedText;

  /** Optional long details (rendered inside accordion) */
  details?: LocalizedText;

  /** Optional bullet points (rendered inside accordion) */
  keyPoints?: LocalizedText[];

  /** Optional sources (rendered inside accordion) */
  sources?: TimelineSource[];
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "floods_dec_15_31",
    order: 20251215,
    dateLabel: {
      ar: "15–31 دجنبر",
      en: "Dec 15–31",
      fr: "15–31 déc.",
    },
    icon: "🌧️",
    era: {
      ar: "موجة فيضانات",
      en: "Flood wave",
      fr: "Vague d’inondations",
    },
    title: {
      ar: "فيضانات متتابعة وأزمات مستمرة",
      en: "Repeated floods and ongoing crises",
      fr: "Inondations successives et crises continues",
    },
    summary: {
      ar: "ابتداءً من منتصف دجنبر، شهدت عدة جهات فيضانات وخسائر مادية وبشرية، مع تزايد الضغط الشعبي حول البنية التحتية والإنقاذ والمحاسبة.",
      en: "From mid-December, multiple regions saw floods and damages, intensifying pressure around infrastructure, emergency response, and accountability.",
      fr: "Dès mi-décembre, plusieurs régions ont connu des inondations, renforçant la pression sur les infrastructures, les secours et la reddition des comptes.",
    },
    location: {
      ar: "مناطق مختلفة (جهات متعددة)",
      en: "Multiple regions",
      fr: "Plusieurs régions",
    },
    details: {
      ar: [
        "من 15 إلى 31 دجنبر 2025، تزامنت موجات فيضانية متفرقة مع أزمات بنيوية متراكمة، ما أعاد طرح أسئلة الجهوزية، جودة البنية التحتية، وآليات التدخل والإنقاذ.",
        "",
        "ضمن هذه الفترة وردت محطات بارزة داخل السردية المعتمدة:",
        "• 15 دجنبر: فيضانات واسعة وخسائر جسيمة في جهة درعة-تافيلالت وغيرها.",
        "• 18 دجنبر: تحذيرات وإجراءات في مدن مختلفة مع استمرار تدهور الوضع في بعض المناطق.",
        "• 20 دجنبر: ارتفاع في المطالب الشعبية بفتح تحقيقات محلية حول أسباب تفاقم الأضرار.",
        "• 22 دجنبر: حملات تضامن وإغاثة شعبية ومبادرات شبابية موازية.",
        "• 28 دجنبر: تسجيل فيضانات جديدة في جهات أخرى مع تزايد الخطاب الحقوقي حول الحق في السلامة والبنية التحتية.",
      ].join("\n"),
      en: [
        "Between Dec 15 and Dec 31, 2025, scattered flood waves compounded existing infrastructure and governance concerns, raising questions about preparedness, response capacity, and oversight.",
        "",
        "Key moments in this validated narrative include:",
        "• Dec 15: Major floods and heavy losses in Drâa-Tafilalet and elsewhere.",
        "• Dec 18: Warnings and measures in several cities as conditions worsened in some areas.",
        "• Dec 20: Rising calls for local investigations into causes and accountability.",
        "• Dec 22: Grassroots relief and youth-led solidarity initiatives.",
        "• Dec 28: New floods in other regions, with stronger rights-based framing around safety and infrastructure.",
      ].join("\n"),
      fr: [
        "Entre le 15 et le 31 décembre 2025, des épisodes d’inondations ont ravivé des questions structurelles (préparation, capacité d’intervention, contrôle et gouvernance).",
        "",
        "Moments clés dans cette narration validée :",
        "• 15 déc. : inondations majeures et pertes importantes (Drâa-Tafilalet et autres).",
        "• 18 déc. : alertes et mesures dans plusieurs villes, aggravation locale.",
        "• 20 déc. : demandes d’enquêtes et de responsabilités au niveau local.",
        "• 22 déc. : solidarité populaire, initiatives citoyennes et jeunesse.",
        "• 28 déc. : nouveaux épisodes, renforcement du discours sur le droit à la sécurité et les infrastructures.",
      ].join("\n"),
    },
    keyPoints: [
      {
        ar: "تزايد الربط بين الكوارث الطبيعية وضعف البنية التحتية والحوكمة",
        en: "Stronger linkage between natural disasters, infrastructure weaknesses, and governance",
        fr: "Lien renforcé entre catastrophes, fragilités d’infrastructure et gouvernance",
      },
      {
        ar: "ارتفاع المبادرات الشعبية للإغاثة بالتوازي مع مطالب التحقيق والمحاسبة",
        en: "Rise of grassroots relief alongside calls for investigation and accountability",
        fr: "Montée de l’entraide citoyenne et des demandes d’enquête et de responsabilité",
      },
    ],
  },
  {
    id: "rights_dec_1_15",
    order: 20251201,
    dateLabel: {
      ar: "1–15 دجنبر",
      en: "Dec 1–15",
      fr: "1–15 déc.",
    },
    icon: "⚖️",
    era: {
      ar: "الضغط الحقوقي",
      en: "Rights pressure",
      fr: "Pression droits humains",
    },
    title: {
      ar: "استمرار الضغط والمطالبة بإطلاق سراح المعتقلين",
      en: "Sustained pressure and calls to release detainees",
      fr: "Pression continue et appels à la libération",
    },
    summary: {
      ar: "في بداية دجنبر، تواصلت مبادرات الدعم والترافع، مع مطالب بتوقيف المتابعات وإطلاق سراح المعتقلين وتوثيق الانتهاكات.",
      en: "In early December, advocacy continued, including calls to halt prosecutions, release detainees, and document alleged violations.",
      fr: "Début décembre, le plaidoyer s’est poursuivi : arrêt des poursuites, libérations et documentation d’abus allégués.",
    },
    location: {
      ar: "على الصعيد الوطني + تفاعل دولي",
      en: "Nationwide + international attention",
      fr: "National + attention internationale",
    },
    details: {
      ar: [
        "ضمن الفترة 1–15 دجنبر 2025، استمرت دينامية التضامن والضغط الحقوقي حول ملفات الاعتقال والمتابعات.",
        "",
        "محطات مذكورة ضمن السردية:",
        "• 8 دجنبر: تنظيم وقفة وطنية أمام البرلمان بالرباط للمطالبة بالإفراج عن المعتقلين.",
        "• 9 دجنبر: لقاءات وتحركات أمام البرلمان بمناسبة اليوم العالمي لحقوق الإنسان.",
        "• 10 دجنبر: صدور تقرير يُشير إلى خروقات مزعومة ويدعو لوقف المتابعات وإطلاق سراح المعتقَلين.",
      ].join("\n"),
      en: [
        "During Dec 1–15, 2025, solidarity and rights-based advocacy continued around arrests and prosecutions.",
        "",
        "Noted moments in the validated narrative:",
        "• Dec 8: A national sit-in in front of Parliament in Rabat calling for releases.",
        "• Dec 9: Gatherings/actions tied to Human Rights Day.",
        "• Dec 10: A report pointing to alleged violations and calling for ending prosecutions and releasing detainees.",
      ].join("\n"),
      fr: [
        "Sur la période 1–15 décembre 2025, la dynamique de solidarité et de plaidoyer s’est maintenue autour des arrestations et poursuites.",
        "",
        "Moments cités dans cette narration :",
        "• 8 déc. : sit-in national devant le Parlement à Rabat.",
        "• 9 déc. : actions liées à la Journée des droits humains.",
        "• 10 déc. : publication d’un rapport évoquant des violations présumées et demandant l’arrêt des poursuites et des libérations.",
      ].join("\n"),
    },
    keyPoints: [
      {
        ar: "تحركات أمام البرلمان وربطها باليوم العالمي لحقوق الإنسان",
        en: "Parliament-front actions tied to Human Rights Day",
        fr: "Actions devant le Parlement liées à la Journée des droits humains",
      },
      {
        ar: "التأكيد على وقف المتابعات وتوثيق الخروقات",
        en: "Emphasis on ending prosecutions and documenting abuses",
        fr: "Accent sur l’arrêt des poursuites et la documentation",
      },
    ],
  },
  {
    id: "infrastructure_nov_16_30",
    order: 20251116,
    dateLabel: {
      ar: "16–30 نونبر",
      en: "Nov 16–30",
      fr: "16–30 nov.",
    },
    icon: "🧱",
    era: {
      ar: "مآسي البنية التحتية",
      en: "Infrastructure tragedies",
      fr: "Drames d’infrastructure",
    },
    title: {
      ar: "فضائح إنسانية وتفكك الخدمات العمومية",
      en: "Human tragedies and public service failures",
      fr: "Drames humains et défaillances publiques",
    },
    summary: {
      ar: "سجّلت نهاية نونبر أحداثًا مؤلمة مرتبطة بالبنية التحتية والخدمات، ما غذّى خطاب المحاسبة وربط المسؤولية بالنتائج.",
      en: "Late November saw painful incidents tied to infrastructure/services, intensifying accountability demands.",
      fr: "Fin novembre : incidents liés aux infrastructures/services, renforçant les demandes de responsabilité.",
    },
    location: {
      ar: "مدن مختلفة",
      en: "Various cities",
      fr: "Diverses villes",
    },
    details: {
      ar: [
        "خلال 16–30 نونبر 2025، برزت حوادث مؤلمة ضمن السردية المعتمدة، واعتُبرت مؤشرات على أزمة بنيوية في الخدمات العمومية والبنية التحتية.",
        "",
        "محطات مذكورة:",
        "• 21 نونبر: وفاة رضيع بسبب انقطاع التيار الكهربائي (وفق السردية).",
        "• 25 نونبر: وفاة طفلة داخل قسم مستعجلات (وفق السردية).",
        "• 28 نونبر: احتجاجات ميدانية وارتفاع المطالب السياسية.",
        "• 29 نونبر: تصريح سياسي يدعو إلى عفو عام ووقف الاعتقالات (وفق السردية).",
      ].join("\n"),
      en: [
        "During Nov 16–30, 2025, the validated narrative highlights painful incidents framed as symptoms of structural problems in infrastructure and public services.",
        "",
        "Noted moments:",
        "• Nov 21: An infant’s death linked to a power outage (per narrative).",
        "• Nov 25: A child’s death inside an emergency department (per narrative).",
        "• Nov 28: Street protests and rising political demands.",
        "• Nov 29: A political statement calling for a general amnesty and an end to arrests (per narrative).",
      ].join("\n"),
      fr: [
        "Entre le 16 et le 30 novembre 2025, la narration validée mentionne des incidents graves présentés comme révélateurs d’un problème structurel des services et infrastructures.",
        "",
        "Moments cités :",
        "• 21 nov. : décès d’un nourrisson lié à une coupure de courant (selon narration).",
        "• 25 nov. : décès d’une enfant aux urgences (selon narration).",
        "• 28 nov. : protestations et hausse des revendications politiques.",
        "• 29 nov. : appel politique à une amnistie générale et à l’arrêt des arrestations (selon narration).",
      ].join("\n"),
    },
    keyPoints: [
      {
        ar: "ربط المآسي بضعف الخدمات العمومية والبنية التحتية",
        en: "Linking tragedies to weak public services and infrastructure",
        fr: "Lien entre drames et fragilité des services/infrastructures",
      },
      {
        ar: "تصاعد الدعوات السياسية لوقف الاعتقالات وعفو عام",
        en: "Escalation of political calls to end arrests and grant amnesty",
        fr: "Montée des appels politiques à stopper les arrestations et amnistier",
      },
    ],
  },
  {
    id: "solidarity_oct_30_nov_15",
    order: 20251030,
    dateLabel: {
      ar: "30 أكتوبر–15 نونبر",
      en: "Oct 30–Nov 15",
      fr: "30 oct.–15 nov.",
    },
    icon: "🤝",
    era: {
      ar: "التضامن",
      en: "Solidarity",
      fr: "Solidarité",
    },
    title: {
      ar: "انطلاق موجة التضامن وتوسّع الحملة",
      en: "Solidarity wave and campaign expansion",
      fr: "Vague de solidarité et élargissement",
    },
    summary: {
      ar: "شهدت نهاية أكتوبر وبداية نونبر توسّعًا في الدعم للمعتقلين ومبادرات للترافع، مع محطات وطنية بارزة.",
      en: "Late Oct/early Nov saw expanded support for detainees and advocacy initiatives, including national milestones.",
      fr: "Fin oct./début nov. : soutien accru et initiatives de plaidoyer, avec étapes nationales.",
    },
    location: {
      ar: "الرباط ومدن أخرى",
      en: "Rabat and other cities",
      fr: "Rabat et autres villes",
    },
    details: {
      ar: [
        "خلال 30 أكتوبر – 15 نونبر 2025، تواصلت المبادرات الحقوقية والشعبية لدعم المعتقلين والتنديد بالعنف، مع محطات مذكورة ضمن السردية:",
        "• 30 أكتوبر: إطلاق لجنة وطنية للتضامن مع معتقلي الحركة.",
        "• 3 نونبر: تنظيم وقفة وطنية أمام البرلمان بالرباط للتنديد بالقمع.",
        "• 15 نونبر: إطلاق حملة وطنية للمطالبة بالإفراج عن المعتقلين.",
      ].join("\n"),
      en: [
        "Between Oct 30 and Nov 15, 2025, the narrative highlights rights and civil initiatives supporting detainees and condemning violence:",
        "• Oct 30: Launch of a national solidarity committee for detainees.",
        "• Nov 3: National sit-in in front of Parliament in Rabat condemning repression.",
        "• Nov 15: Launch of a national campaign calling for releases.",
      ].join("\n"),
      fr: [
        "Du 30 oct. au 15 nov. 2025, la narration mentionne des initiatives citoyennes et de droits humains :",
        "• 30 oct. : création d’un comité national de solidarité avec les détenus.",
        "• 3 nov. : sit-in national devant le Parlement à Rabat.",
        "• 15 nov. : lancement d’une campagne nationale pour les libérations.",
      ].join("\n"),
    },
    keyPoints: [
      { ar: "لجنة وطنية للتضامن", en: "National solidarity committee", fr: "Comité national de solidarité" },
      { ar: "وقفات أمام البرلمان", en: "Parliament-front sit-ins", fr: "Sit-ins devant le Parlement" },
      { ar: "حملة وطنية للإفراج", en: "National release campaign", fr: "Campagne nationale de libération" },
    ],
  },
  {
    id: "tragedies_sep_30_oct_2",
    order: 20250930,
    dateLabel: {
      ar: "30 شتنبر–2 أكتوبر",
      en: "Sep 30–Oct 2",
      fr: "30 sept.–2 oct.",
    },
    icon: "🕯️",
    era: {
      ar: "الخسائر البشرية",
      en: "Human losses",
      fr: "Pertes humaines",
    },
    title: {
      ar: "مآسي متزامنة مع التوترات الميدانية",
      en: "Tragedies amid heightened tensions",
      fr: "Drames dans un contexte tendu",
    },
    summary: {
      ar: "سجّلت السردية خسائر بشرية (3 وفيات) وجرحى في سياق التوتر، مع ارتفاع الغضب الشعبي.",
      en: "The narrative records 3 deaths and injuries during this period, contributing to public anger.",
      fr: "La narration évoque 3 décès et des blessés, alimentant la colère.",
    },
    location: {
      ar: "وجدة + القليعة (قرب أكادير)",
      en: "Oujda + Lqliaa (near Agadir)",
      fr: "Oujda + Lqliaa (près d’Agadir)",
    },
    details: {
      ar: [
        "تذكر السردية المعتمدة أن نهاية شتنبر وبداية أكتوبر شهدت أولى الخسائر البشرية داخل مسار الاحتجاجات:",
        "• 30 شتنبر: وفاة أمين ن. في وجدة (وفق السردية) وذكر “دهس/قمع”.",
        "• 2 أكتوبر: وفاة 3 مواطنين في القليعة (قرب أكادير) وجرح سبعة آخرين بسبب سيول/فيضانات مفاجئة (وفق السردية).",
        "",
        "هذه المحطة تُقدَّم داخل السردية كعامل تصعيد عاطفي وسياسي، وتوسيع دائرة الغضب.",
      ].join("\n"),
      en: [
        "The validated narrative notes early human losses at the end of September / start of October:",
        "• Sep 30: Death of Ameen N. in Oujda (per narrative), framed as linked to repression/vehicle incident.",
        "• Oct 2: Three deaths in Lqliaa (near Agadir) and seven injured due to sudden floods (per narrative).",
        "",
        "This moment is presented as a driver of emotional and political escalation.",
      ].join("\n"),
      fr: [
        "La narration validée mentionne des pertes humaines fin sept./début oct. :",
        "• 30 sept. : décès d’Amin N. à Oujda (selon narration), associé à un incident de répression.",
        "• 2 oct. : trois décès à Lqliaa (près d’Agadir) et sept blessés suite à des crues soudaines (selon narration).",
        "",
        "Cette étape est présentée comme un facteur d’escalade émotionnelle et politique.",
      ].join("\n"),
    },
    keyPoints: [
      { ar: "3 وفيات ضمن السردية", en: "3 deaths noted in the narrative", fr: "3 décès cités dans la narration" },
      { ar: "تصاعد الغضب الشعبي", en: "Escalation of public anger", fr: "Montée de la colère" },
    ],
  },
  {
    id: "repression_sep_27_onwards",
    order: 20250927,
    dateLabel: { ar: "27 شتنبر+", en: "Sep 27+", fr: "27 sept.+" },
    icon: "🚨",
    era: { ar: "القمع", en: "Repression", fr: "Répression" },
    title: {
      ar: "القمع والاعتقالات والمتابعات",
      en: "Repression, arrests, and prosecutions",
      fr: "Répression, arrestations et poursuites",
    },
    summary: {
      ar: "بعد خروج الاحتجاجات للشارع، تحدثت السردية وتقارير حقوقية عن اعتقالات واسعة ومحاكمات سريعة وأحكام سالبة للحرية.",
      en: "After street protests, the narrative and rights reporting cite wide arrests, fast-track trials, and prison sentences.",
      fr: "Après les protestations, la narration et des sources droits humains évoquent arrestations, procès accélérés et peines.",
    },
    location: { ar: "مدن متعددة", en: "Multiple cities", fr: "Plusieurs villes" },
    details: {
      ar: [
        "تُقدِّم السردية المعتمدة وتغطيات حقوقية فكرة أن السلطات انتقلت إلى مرحلة قمعية عبر:",
        "• اعتقالات واسعة (ذكرت السردية “أكثر من 400” في الأيام الأولى).",
        "• تسجيل أكثر من 2068 حالة اعتقال/متابعة وفق تقارير مستقلة مذكورة ضمن السردية.",
        "• محاكمات عاجلة وأحكام وصفت بأنها “قاسية” داخل السردية.",
        "",
        "ملاحظة: هذه الأرقام تُعرض هنا كما وردت داخل السردية المجمّعة ورسائل الأعضاء، مع الإحالة إلى الروابط المصدرية المدرجة.",
      ].join("\n"),
      en: [
        "The validated narrative and rights coverage frame a shift toward repression via:",
        "• Broad arrests (the narrative cites “400+” early on).",
        "• “2068+” arrest/prosecution cases cited via independent reporting referenced in the narrative.",
        "• Fast-track trials and sentences described as harsh within the narrative.",
        "",
        "Note: figures are presented as in the compiled narrative and linked sources.",
      ].join("\n"),
      fr: [
        "La narration validée et des couvertures droits humains décrivent une phase répressive :",
        "• Arrestations massives (la narration cite « 400+ » au début).",
        "• « 2068+ » cas d’arrestation/poursuite cités via des sources indépendantes mentionnées.",
        "• Procès accélérés et peines décrites comme sévères dans la narration.",
        "",
        "Note : chiffres présentés conformément à la narration compilée et aux liens.",
      ].join("\n"),
    },
    keyPoints: [
      { ar: "400+ اعتقال مبكر (وفق السردية)", en: "400+ early arrests (per narrative)", fr: "400+ arrestations initiales (selon narration)" },
      { ar: "2068+ حالات اعتقال/متابعة (وفق السردية)", en: "2068+ cases (per narrative)", fr: "2068+ cas (selon narration)" },
      { ar: "محاكمات وأحكام عاجلة", en: "Fast-track trials/sentences", fr: "Procès/peines accélérés" },
    ],
    sources: [
      {
        label: "Middle East Monitor: Morocco detains 2,068 in GenZ protests",
        url: "https://www.middleeastmonitor.com/20251006-morocco-detains-2068-in-genz212-protests/",
      },
      {
        label: "Human Rights Watch: Morocco crackdown on protesters",
        url: "https://www.hrw.org/news/2025/10/07/morocco-crackdown-protesters",
      },
    ],
  },
  {
    id: "protests_sep_27_28",
    order: 20250927,
    dateLabel: { ar: "27–28 شتنبر", en: "Sep 27–28", fr: "27–28 sept." },
    icon: "✊",
    era: { ar: "الاحتجاجات", en: "Protests", fr: "Protestations" },
    title: {
      ar: "خروج المظاهرات الميدانية في مدن متعددة",
      en: "Street protests across multiple cities",
      fr: "Manifestations dans plusieurs villes",
    },
    summary: {
      ar: "شهدت نهاية شتنبر خروج مظاهرات في أكثر من 10–11 مدينة وفق السردية، مطالبةً بالعدالة الاجتماعية ومحاربة الفساد وتحسين الخدمات.",
      en: "Late September saw street protests in 10–11+ cities per the narrative, calling for social justice, anti-corruption, and better services.",
      fr: "Fin septembre : manifestations dans 10–11+ villes selon la narration, pour justice sociale, anti-corruption et services publics.",
    },
    location: {
      ar: "أكادير، الرباط، الدار البيضاء، مراكش…",
      en: "Agadir, Rabat, Casablanca, Marrakesh…",
      fr: "Agadir, Rabat, Casablanca, Marrakech…",
    },
    details: {
      ar: [
        "تذكر السردية أن الاحتجاجات الميدانية يومي 27 و28 شتنبر 2025 شكلت نقطة تحول، مع ترديد مطالب أساسية مثل:",
        "• تحسين الخدمات العامة (الصحة والتعليم والسكن).",
        "• محاربة الفساد وربط المسؤولية بالمحاسبة.",
        "• العدالة الاجتماعية والكرامة.",
        "",
        "كما تشير السردية إلى أن هذه المحطة جاءت بعد تفاعل رقمي متسارع داخل Discord وسياق تصاعد الغضب بعد حادث “مستشفى الموت”.",
      ].join("\n"),
      en: [
        "The narrative presents Sep 27–28 street protests as a turning point with core demands such as:",
        "• Better public services (health, education, housing).",
        "• Fighting corruption and accountability.",
        "• Social justice and dignity.",
        "",
        "It also frames this as following rapid Discord mobilization and rising anger after the “hospital deaths” incident.",
      ].join("\n"),
      fr: [
        "La narration présente les 27–28 sept. comme un tournant avec des revendications :",
        "• Amélioration des services publics (santé, éducation, logement).",
        "• Lutte contre la corruption et reddition des comptes.",
        "• Justice sociale et dignité.",
        "",
        "Cette étape suit une mobilisation numérique (Discord) et l’indignation après l’affaire de l’hôpital.",
      ].join("\n"),
    },
    keyPoints: [
      { ar: "احتجاجات في 10–11+ مدينة (وفق السردية)", en: "10–11+ cities (per narrative)", fr: "10–11+ villes (selon narration)" },
      { ar: "مطالب اجتماعية وخدماتية", en: "Social + public service demands", fr: "Revendications sociales et services publics" },
      { ar: "تأطير تنظيمي عبر Discord", en: "Organizing via Discord", fr: "Organisation via Discord" },
    ],
    sources: [
      { label: "Al Jazeera: Morocco GenZ protests", url: "https://www.aljazeera.net/news/2025/9/29/المغرب-حركة-شبابية-تشل-الشارع" },
      { label: "Al Araby: coverage", url: "https://www.alaraby.co.uk/society/مظاهرات-في-الدار-البيضاء-والرباط-وتطوان-ضد-الغلاء-والفساد" },
      { label: "Madar21: protests", url: "https://www.madar21.com/240606.html" },
    ],
  },
  {
    id: "arrest_sep_26",
    order: 20250926,
    dateLabel: { ar: "26 شتنبر", en: "Sep 26", fr: "26 sept." },
    icon: "👮",
    era: { ar: "قمع استباقي", en: "Pre-emptive crackdown", fr: "Répression préventive" },
    title: {
      ar: "اعتقال قبل موعد الاحتجاجات",
      en: "Arrest ahead of planned protests",
      fr: "Arrestation avant les protestations",
    },
    summary: {
      ar: "تذكر السردية اعتقال أحد الوجوه البارزة قبل موعد الاحتجاجات، كإشارة إلى محاولة تطويق الحراك قبل نزوله للشارع.",
      en: "The narrative cites an arrest of a prominent figure ahead of protests, framed as an attempt to contain mobilization early.",
      fr: "La narration évoque l’arrestation d’une figure avant les protestations, présentée comme une tentative d’endiguement.",
    },
    location: { ar: "كلميم / الدار البيضاء", en: "Guelmim / Casablanca", fr: "Guelmim / Casablanca" },
    details: {
      ar: [
        "تتضمن السردية ذكر اعتقال “محمد بزيغ” يوم 26 شتنبر 2025 قبل موعد الاحتجاجات المعلنة، واعتباره محطة ضمن سياق القمع الاستباقي.",
        "يُقدَّم الحدث كرسالة ردع مبكرة قبل خروج المظاهرات.",
      ].join("\n"),
      en: [
        "The narrative mentions the Sep 26 arrest of “Mohamed Bzegh” ahead of announced protests, presented as pre-emptive deterrence.",
      ].join("\n"),
      fr: [
        "La narration mentionne l’arrestation du 26 sept. de « Mohamed Bzegh » avant les protestations annoncées, présentée comme une dissuasion préventive.",
      ].join("\n"),
    },
    sources: [
      { label: "The Voice: report 1", url: "https://www.thevoice.ma/ندوة-دولية-تسلط-الضوء-على-واقع-حرية-التعبير-وحقوق-الإنسان-بالمغرب/" },
      { label: "The Voice: report 2", url: "https://www.thevoice.ma/المغرب-اعتقال-ناشط-على-خلفية-دعوته-للتظاهر/" },
    ],
  },
  {
    id: "discord_sep_15",
    order: 20250915,
    dateLabel: { ar: "15 شتنبر", en: "Sep 15", fr: "15 sept." },
    icon: "🧩",
    era: { ar: "التنظيم", en: "Organizing", fr: "Organisation" },
    title: {
      ar: "ولادة التنظيم الرقمي عبر Discord",
      en: "Digital organization via Discord",
      fr: "Organisation numérique via Discord",
    },
    summary: {
      ar: "حسب السردية، بدأت الحركة تتخذ شكلًا تنظيميًا عبر إنشاء سيرفر Discord وبناء أولى اللجان والتنسيق.",
      en: "Per the narrative, the movement took a more organized form via a Discord server and early committee building.",
      fr: "Selon la narration, la structuration s’est accélérée via un serveur Discord et des comités.",
    },
    location: { ar: "فضاء رقمي (Discord)", en: "Online (Discord)", fr: "En ligne (Discord)" },
    details: {
      ar: [
        "تذكر السردية أن تأسيس Discord يوم 15 شتنبر كان بداية “الهيكلة” العملية: قنوات للتنسيق، فرق عمل، وآليات تواصل داخلية.",
        "هذه المرحلة تُقدَّم باعتبارها نقطة انتقال من التعاطف إلى التنظيم.",
      ].join("\n"),
      en: [
        "The narrative frames Sep 15 as the start of practical structuring through Discord: coordination channels, work teams, and internal communication routines.",
      ].join("\n"),
      fr: [
        "La narration présente le 15 sept. comme le début de la structuration via Discord : canaux de coordination, équipes, et routines internes.",
      ].join("\n"),
    },
    sources: [
      { label: "Al Araby: Discord and mobilization", url: "https://www.alaraby.co.uk/society/discord-المغرب-منصة-احتجاج-رقمي" },
    ],
  },
  {
    id: "protest_sep_14",
    order: 20250914,
    dateLabel: { ar: "14 شتنبر", en: "Sep 14", fr: "14 sept." },
    icon: "🪧",
    era: { ar: "الشارع يرد", en: "Street response", fr: "Réponse de la rue" },
    title: {
      ar: "أول احتجاج بالشارع في أكادير",
      en: "First street protest in Agadir",
      fr: "Première protestation à Agadir",
    },
    summary: {
      ar: "بعد أيام من حادث المستشفى، خرجت أولى الاحتجاجات في أكادير مطالبة بالمحاسبة وتحسين الخدمات الصحية.",
      en: "Days after the hospital incident, the first protests in Agadir demanded accountability and better healthcare services.",
      fr: "Après l’incident de l’hôpital, premières protestations à Agadir pour la responsabilité et la santé.",
    },
    location: { ar: "أكادير", en: "Agadir", fr: "Agadir" },
    details: {
      ar: [
        "تذكر السردية أن 14 شتنبر 2025 شهد أول خروج احتجاجي في أكادير كرد مباشر على “مستشفى الموت”، مع رفع مطالب مرتبطة بالمحاسبة وتحسين الخدمات الصحية.",
      ].join("\n"),
      en: [
        "The narrative notes Sep 14 as the first street mobilization in Agadir responding to the hospital deaths and calling for accountability and healthcare improvements.",
      ].join("\n"),
      fr: [
        "La narration cite le 14 sept. comme la première mobilisation à Agadir en réaction à l’affaire de l’hôpital et pour l’amélioration de la santé et la responsabilité.",
      ].join("\n"),
    },
    sources: [
      { label: "Le360: coverage", url: "https://www.le360.ma/societe/agadir-une-marche-protestataire-reclame-la-verite-sur-une-affaire-dhopital_2D3RFMLP2FCCTD4DPBE6V67OTM/" },
    ],
  },
  {
    id: "hospital_aug_25",
    order: 20250825,
    dateLabel: { ar: "25 غشت", en: "Aug 25", fr: "25 août" },
    icon: "🏥",
    era: { ar: "الشرارة الأولى", en: "First spark", fr: "Première étincelle" },
    title: {
      ar: "حادثة “مستشفى الموت” في أكادير",
      en: "The “hospital deaths” incident in Agadir",
      fr: "Affaire de l’« hôpital » à Agadir",
    },
    summary: {
      ar: "تذكر السردية وفاة ما بين 13 و26 شخصًا في المستشفى الجهوي الحسن الثاني بأكادير في ظرف وجيز، ما فجّر موجة غضب واسعة.",
      en: "The narrative cites 13–26 deaths at Hassan II Regional Hospital in Agadir in a short time, triggering widespread outrage.",
      fr: "La narration évoque 13–26 décès à l’hôpital Hassan II d’Agadir sur une courte période, déclenchant l’indignation.",
    },
    location: { ar: "أكادير", en: "Agadir", fr: "Agadir" },
    details: {
      ar: [
        "وفق السردية المجمعة، كان 25 غشت 2025 لحظة صدمة بعد تداول أخبار حول وفيات عديدة في المستشفى الجهوي الحسن الثاني بأكادير في ظرف زمني قصير.",
        "تم تقديم الحدث كبداية غضب اجتماعي واسع حول جودة الخدمات الصحية وربط المسؤولية بالمحاسبة.",
        "",
        "ملاحظة: نطاق العدد (13–26) يُعرض كما ورد في السردية وروابطها.",
      ].join("\n"),
      en: [
        "In the compiled narrative, Aug 25, 2025 is framed as a shock moment after reports of multiple deaths in a short period at Hassan II Regional Hospital in Agadir.",
        "It is presented as the starting point of broader anger about healthcare quality and accountability.",
        "",
        "Note: the 13–26 range is presented as in the narrative and linked sources.",
      ].join("\n"),
      fr: [
        "Dans la narration compilée, le 25 août 2025 marque un choc après des informations sur plusieurs décès sur une courte période à l’hôpital Hassan II d’Agadir.",
        "L’événement est présenté comme l’origine d’une indignation plus large sur la qualité des soins et la reddition des comptes.",
        "",
        "Note : la fourchette 13–26 est reprise telle que citée dans la narration et ses liens.",
      ].join("\n"),
    },
    sources: [
      { label: "Manassa: coverage", url: "https://manassa.ma/8440479" },
      { label: "Anfaspress: coverage", url: "https://anfaspress.com/news/voir/148991-2025-09-05-04-49-06" },
    ],
  },
];
