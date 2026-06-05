// All facts about Samantha Swaney, broker at GC Realty & Development, LLC.
// Single source of truth for the homepage, chatbot system prompt, and SEO meta.
// Sourced from public records (GC Realty team page, LinkedIn, MLS, deed records).
// No fabricated stats, ratings, awards, or testimonials are used anywhere.

export const SAMANTHA = {
  "name": "Samantha Swaney",
  "title": "Real Estate Broker",
  "tagline": "Settle In With Swaney",
  "market": "Elmhurst & the Chicago Suburbs",
  "primaryCity": "Elmhurst, IL",
  "phone": "(630) 532-8747",
  "phoneHref": "tel:+16305328747",
  "officePhone": "(630) 587-7400",
  "email": "samanthas@gcrealtyinc.com",
  "headshot": "/images/samantha.jpg",
  "hashtag": "#SettleInWithSwaney",
  "licenseState": "Illinois",
  "licenseTitle": "Licensed Real Estate Broker",
  "office": "219 E. Irving Park Rd., Roselle, IL 60172",
  "brokerage": "GC Realty & Development, LLC",
  "brokerageProfile": "https://www.gcrealtysells.com/meet-the-team",
  "sameAs": [
    "https://www.gcrealtysells.com/meet-the-team",
    "https://www.linkedin.com/in/samantha-swaney-16740294/",
    "https://www.facebook.com/samantha.swaney/",
    "https://www.instagram.com/swaneyyy/"
  ]
};

// Structured NAP + geo for schema.org / local SEO. The office is GC Realty's
// Roselle headquarters; the service geo is centered on Elmhurst, her headline
// market, with a radius covering the near-west Cook suburbs and her NW base.
export const OFFICE_ADDRESS = {
  "streetAddress": "219 E. Irving Park Rd.",
  "addressLocality": "Roselle",
  "addressRegion": "IL",
  "postalCode": "60172",
  "addressCountry": "US"
};

export const SERVICE_GEO = {
  "latitude": 41.8997,
  "longitude": -87.9403,
  "radiusMeters": 40000
};

// Honest, brokerage-backed credibility tiles. No personal sales numbers or
// ratings exist publicly, so none are invented here.
export const STATS = [
  {
    "value": "Est. 2003",
    "label": "GC Realty & Development"
  },
  {
    "value": "Chicagoland",
    "label": "City + Suburbs Covered"
  },
  {
    "value": "Buyers & Sellers",
    "label": "Full-Service Representation"
  },
  {
    "value": "Investors",
    "label": "Property-Management Backed"
  }
];

export const BIO = {
  "short": "I'm Samantha Swaney, a licensed real estate broker with GC Realty & Development in Roselle, helping buyers, sellers, and investors across Elmhurst, the near-west Cook County suburbs, and the northwest suburbs I call home. My job is to make the move feel clear, calm, and genuinely yours.",
  "long": "I'm Samantha Swaney, a licensed real estate broker with GC Realty & Development, LLC, a full-service brokerage and property-management firm based in Roselle that has served Chicagoland since 2003. I lead with Elmhurst and the near-west Cook County suburbs, and I also work throughout the northwest suburbs that have always been my home base. Whether you are buying your first place, selling a home you have loved for years, or building a rental portfolio, my goal is the same: give you straight answers and a plan you can actually follow.\n\nThe way I work is simple. I listen first, I tell you the truth about price and timing, and I do the homework so you are never guessing. In a town like Elmhurst, that means knowing the difference a block can make, what the commute really looks like on the Metra Union Pacific West line into the city, and how schools in Elmhurst Community Unit School District 205 factor into a family's decision. I would rather slow down and get the fit right than push you toward a closing that does not serve you.\n\nBecause GC Realty also runs a property-management arm, I am a natural fit for investors and landlords who want one person to help them buy smart and then keep the property running. If you are local, thinking about a move, or just want an honest read on the market, reach out. I will treat your decision the way I would want mine treated."
};

// "Team" reframed as the GC Realty support behind every deal (the firm runs a
// full brokerage plus a property-management division).
export const TEAM = [
  {
    "name": "GC Realty & Development",
    "role": "Full-service brokerage, established 2003"
  },
  {
    "name": "Property Management Division",
    "role": "Investor and rental support"
  },
  {
    "name": "Marketing & Transaction Support",
    "role": "Behind every listing and closing"
  }
];

export const NEIGHBORHOODS = [
  {
    "slug": "elmhurst",
    "name": "Elmhurst",
    "blurb": "Elmhurst is my headline market, and I love helping buyers and sellers make their move in this walkable, tree-lined DuPage County suburb just west of the Cook County line. If you want a local broker who knows these blocks, the schools, and the Metra schedule by heart, I am here to help.",
    "image": "/images/neighborhoods/elmhurst.jpg"
  },
  {
    "slug": "oak-park",
    "name": "Oak Park",
    "blurb": "Oak Park is the architecture lover's suburb just west of the city, and I love helping buyers and sellers navigate its historic homes and walkable, transit-rich village feel. Whether you are drawn to a Frank Lloyd Wright Prairie home or a classic bungalow, I can guide you through this competitive market.",
    "image": "/images/neighborhoods/oak-park.jpg"
  },
  {
    "slug": "river-forest",
    "name": "River Forest",
    "blurb": "River Forest is one of the most sought-after villages in near-west Cook County, and I love helping buyers and sellers navigate its leafy streets and architecturally rich housing stock. As a broker with GC Realty & Development, I bring full-service support to every move here.",
    "image": "/images/neighborhoods/river-forest.jpg"
  },
  {
    "slug": "berwyn",
    "name": "Berwyn",
    "blurb": "Berwyn is a walkable, well-connected near-west suburb famous for its Chicago-style bungalows and its lively Depot District. I help buyers and sellers navigate Berwyn's value-driven market with the local detail it deserves.",
    "image": "/images/neighborhoods/berwyn.jpg"
  },
  {
    "slug": "la-grange",
    "name": "La Grange",
    "blurb": "La Grange pairs a walkable, historic downtown with an easy BNSF Metra ride into the city, and it is one of the near-west Cook County suburbs I love helping buyers and sellers navigate. I am Samantha Swaney, a broker with GC Realty & Development, and I would be glad to be your guide here.",
    "image": "/images/neighborhoods/la-grange.jpg"
  },
  {
    "slug": "riverside",
    "name": "Riverside",
    "blurb": "Riverside is one of the most distinctive villages in Cook County, a National Historic Landmark laid out by Frederick Law Olmsted. I help buyers and sellers navigate its one of a kind historic housing market.",
    "image": "/images/neighborhoods/riverside.jpg"
  },
  {
    "slug": "forest-park",
    "name": "Forest Park",
    "blurb": "Forest Park packs a walkable Madison Street downtown and two CTA train lines into one of the more approachable price points just west of the city, and I love helping buyers find their footing here. Reach out and I will walk you through what your budget actually buys in this Cook County village.",
    "image": "/images/neighborhoods/forest-park.jpg"
  },
  {
    "slug": "roselle",
    "name": "Roselle",
    "blurb": "Roselle is my brokerage home base, and I know its neighborhoods street by street. As a Real Estate Broker with GC Realty & Development, I help buyers and sellers move with confidence across this friendly DuPage County village.",
    "image": "/images/neighborhoods/roselle.jpg"
  },
  {
    "slug": "elk-grove-village",
    "name": "Elk Grove Village",
    "blurb": "Elk Grove Village pairs an easy O'Hare-edge location with leafy neighborhoods and real value, and I love helping buyers and sellers find their footing here. Whether you want a starter home near Busse Woods or a long-term family place, I can walk you through it.",
    "image": "/images/neighborhoods/elk-grove-village.jpg"
  }
];

// Richer content for the /neighborhoods/[slug] local-SEO landing pages.
// Keyed by the same slug used in NEIGHBORHOODS above.
export type NeighborhoodContent = {
  county: string;
  intro: string;
  highlights: string[];
  faqs: { q: string; a: string }[];
};

export const NEIGHBORHOOD_CONTENT: Record<string, NeighborhoodContent> = {
  "elmhurst": {
    "county": "DuPage County",
    "intro": "Elmhurst sits in DuPage County, just over the Cook County line, and it is one of my favorite places to help people buy and sell. It pairs an easy commute with a genuine sense of community, which is a rare combination this close to the city. Downtown, the Elmhurst City Centre keeps the boutiques, breweries, and restaurants busy, while Wilder Park anchors the heart of town with the public library, the Wilder Park Conservatory, and the Elmhurst Art Museum all within a short stroll. The housing stock is a real mix, from classic brick bungalows and ranches to newly built homes on lots where older houses have been rebuilt, so there is something here for first-time buyers, growing families, and move-up shoppers alike. Families are also drawn to Elmhurst Community Unit School District 205 and York Community High School, the district's lone high school and a consistently strong one. Whether you are touring your first listing or weighing whether now is the right time to sell, I can walk you through what is really happening on these streets.",
    "highlights": [
      "Top-rated schools: Elmhurst is served by Elmhurst Community Unit School District 205, and York Community High School is the district's only high school and a perennially high performer.",
      "Easy commute: the Metra Union Pacific West (UP-West) line stops right in Elmhurst, with trips to Ogilvie Transportation Center in downtown Chicago running roughly 25 to 40 minutes depending on the train.",
      "Vibrant downtown: the Elmhurst City Centre offers walkable shops and dining, and Wilder Park is home to the public library, the Wilder Park Conservatory, and the Elmhurst Art Museum.",
      "Varied housing stock: you will find everything from charming older bungalows and ranches to newly built homes, in a market that tends to move competitively, so being ready matters."
    ],
    "faqs": [
      {
        "q": "How long is the commute from Elmhurst to downtown Chicago?",
        "a": "Elmhurst has its own stop on the Metra Union Pacific West line, and depending on whether you catch a local or an express, the ride to Ogilvie Transportation Center in the Loop generally runs about 25 to 40 minutes. That direct rail access is one of the biggest reasons buyers tell me they choose Elmhurst over towns farther out."
      },
      {
        "q": "What are home prices and the market like in Elmhurst right now?",
        "a": "Elmhurst is a competitive market, and well-priced homes here do not tend to sit long. Values have climbed in recent years, partly because older homes are being rebuilt into larger ones, so prices range widely depending on the block, the age of the house, and how updated it is. Rather than quote a single number, I would rather pull current, address-specific comps for you so we are working from what is actually selling today."
      }
    ]
  },
  "oak-park": {
    "county": "Cook County",
    "intro": "Oak Park sits in Cook County right on Chicago's western edge, about 11 miles from the Loop, and it remains one of the most distinctive suburbs I get to work in. It is best known for its remarkable architecture, including the largest concentration of Frank Lloyd Wright designed buildings anywhere, with the Wright Home and Studio and the surrounding historic districts drawing visitors from around the world. The village is genuinely walkable, with a lively downtown and Hemingway's birthplace, and it is served by both the CTA Green and Blue lines and Metra's Union Pacific West line, so getting into the city is easy without a car. Families are drawn here for Oak Park Elementary School District 97 and Oak Park and River Forest High School (District 200), the well known OPRF that serves both Oak Park and neighboring River Forest. The housing stock is a big part of the appeal, ranging from grand Victorians and Prairie style homes in the historic districts to brick bungalows, two flats, and condos that offer a more attainable way in. As of this writing the market here is competitive, homes often draw multiple offers, and I help my buyers and sellers move with confidence when the right opportunity comes up.",
    "highlights": [
      "Architecture capital of the suburbs: home to the Frank Lloyd Wright Home and Studio and three historic districts (Frank Lloyd Wright, Ridgeland, and Gunderson) full of Prairie homes, Victorians, and craftsman bungalows",
      "Strong, well known schools: Oak Park Elementary School District 97 feeds into Oak Park and River Forest High School (District 200), the single OPRF high school shared with River Forest",
      "Excellent transit and walkability: served by the CTA Green and Blue lines plus Metra's Union Pacific West line, with a downtown of shops and restaurants roughly 11 miles from the Chicago Loop",
      "Diverse, competitive housing stock: from premium historic homes to more attainable condos, two flats, and bungalows, with properties here often drawing multiple offers"
    ],
    "faqs": [
      {
        "q": "How long is the commute from Oak Park into downtown Chicago?",
        "a": "Oak Park is one of the most transit friendly suburbs I work in. It is about 11 miles from the Loop and is served by the CTA Green and Blue lines as well as Metra's Union Pacific West line, so many residents commute downtown by train in well under half an hour without needing to drive."
      },
      {
        "q": "What schools serve Oak Park?",
        "a": "Oak Park is served by Oak Park Elementary School District 97 for its elementary and middle schools, and by Oak Park and River Forest High School in District 200. OPRF is the single high school for the area and is shared with neighboring River Forest. I am always happy to point families toward the district's own resources so you can dig into the details."
      }
    ]
  },
  "river-forest": {
    "county": "Cook County",
    "intro": "River Forest is a small, leafy village about ten miles west of downtown Chicago, and it is one of the most coveted addresses in near-west Cook County. The village is known for its mature tree canopy, its quiet residential streets, and a remarkable collection of early-20th-century architecture that includes several Frank Lloyd Wright designs. Two universities, Dominican University and Concordia University Chicago, call River Forest home, which gives the community a steady, scholarly character alongside its established neighborhoods. Families are drawn here for River Forest Public Schools District 90 and for Oak Park and River Forest High School, while green space lovers have Thatcher Woods and the Des Plaines River Trail right at the western edge of town. Commuters appreciate the Metra Union Pacific West Line station and easy access to the CTA Green Line terminus on the Oak Park border. As a broker with GC Realty & Development, I help buyers, sellers, and investors make confident moves in this part of Chicagoland, and River Forest is a community I am proud to represent.",
    "highlights": [
      "Schools: River Forest Public Schools District 90 (Lincoln, Willard, and Roosevelt) serves K-8, and students attend Oak Park and River Forest High School in District 200.",
      "Commute: The Metra Union Pacific West Line stops in River Forest, and the CTA Green Line terminus at Harlem/Lake sits on the neighboring Oak Park border, both connecting you to downtown Chicago.",
      "Character: A leafy, affluent village home to Dominican University and Concordia University Chicago, with a notable concentration of early-20th-century architecture, including Frank Lloyd Wright designs.",
      "Green space: Thatcher Woods forest preserve and the Des Plaines River Trail run along the western edge of the village, offering trails and woodland close to home."
    ],
    "faqs": [
      {
        "q": "What is the commute like from River Forest to downtown Chicago?",
        "a": "River Forest sits about ten miles west of the Loop. You can ride the Metra Union Pacific West Line from the River Forest station, or walk to the CTA Green Line terminus at Harlem/Lake on the Oak Park border, both of which connect you straight into downtown. Pace bus routes also run along Lake Street through the village."
      },
      {
        "q": "What is the housing market like in River Forest?",
        "a": "River Forest is one of the more expensive communities in Illinois, with an established, architecturally diverse housing stock and a strong reputation among buyers. Because inventory here is limited and homes hold their appeal, pricing can move quickly, so I am happy to walk you through current conditions for your specific street and price range as of this writing."
      }
    ]
  },
  "berwyn": {
    "county": "Cook County",
    "intro": "Berwyn sits in Cook County just nine and a half miles west of downtown Chicago, and it offers something that has become hard to find this close to the city, which is real value. The housing stock here is the headline. Berwyn holds one of the densest concentrations of classic Chicago-style brick bungalows anywhere, mixed with Tudor-inspired cottages, Prairie-style homes, and the occasional two-flat that makes a smart owner-occupant or investor play. Day to day, life centers on the Depot District, the city's walkable downtown of historic storefronts, independent restaurants, bars, and shops anchored right at the Metra tracks. Commuters love that, because the BNSF Line runs straight into Chicago Union Station and puts the Loop within easy reach. For families and first-time buyers who feel priced out of neighborhoods farther east, Berwyn tends to land as a more attainable entry point without giving up the train, the architecture, or the sense of community. I know these blocks well, and I am happy to walk you through what your money actually buys here.",
    "highlights": [
      "Classic housing stock: Berwyn has one of the highest concentrations of Chicago-style bungalows around, alongside Tudor cottages, Prairie-style homes, and two-flats that appeal to owner-occupants and investors alike.",
      "BNSF Metra access: Berwyn sits on Metra's BNSF Line, roughly 9.6 miles from Chicago Union Station, with three stops in town for a straightforward ride into the Loop.",
      "Walkable Depot District: The city's downtown is a pedestrian-friendly stretch of historic storefronts, locally owned restaurants, bars, and shops built right around the Metra station.",
      "Schools: Elementary students attend Berwyn North School District 98 or South Berwyn School District 100, and high schoolers go on to J. Sterling Morton High School District 201, home to Morton West right in Berwyn."
    ],
    "faqs": [
      {
        "q": "How is the commute from Berwyn into downtown Chicago?",
        "a": "It is one of Berwyn's best features. The town sits on Metra's BNSF Line, only about 9.6 miles from Chicago Union Station, and there are three Metra stops in Berwyn plus several bus routes. For commuters who want to be near the city without paying city prices, that direct train into the Loop is a real draw."
      },
      {
        "q": "Is Berwyn more affordable than nearby suburbs?",
        "a": "Generally, yes, Berwyn tends to be a more attainable entry point than many neighborhoods and suburbs closer to the lake, which is a big part of its appeal for first-time buyers and investors. As of this writing the market here sits in a moderate range for the near-west suburbs, but prices move, so I am glad to pull current numbers for the specific block or bungalow you are considering before you make an offer."
      }
    ]
  },
  "la-grange": {
    "county": "Cook County",
    "intro": "La Grange is a classic near-west suburb in Cook County that does something rare: it feels like a real town. Its downtown is part of a National Register historic district, where you can walk to boutiques, restaurants, the farmers market, the library, and the beautifully restored La Grange Theatre, which first opened in 1925 and reopened in 2022. Families are drawn here for the schools (La Grange Elementary School District 102 feeds into Lyons Township High School in District 204), and commuters love that the BNSF Metra Line runs right through the village, putting Chicago Union Station roughly half an hour away. The housing stock is a big part of the appeal, with tree-lined streets full of late-1800s and early-1900s homes near the center of town alongside newer construction further out. Demand here stays strong and well-located homes often see multiple offers, so having someone who knows the local rhythms matters. Whether you are buying your first home, selling a family house, or investing, I am happy to walk the streets and the numbers with you.",
    "highlights": [
      "Schools: served by La Grange Elementary School District 102 (including Cossitt and Ogden Avenue schools) and Lyons Township High School District 204, whose North Campus sits in La Grange",
      "Commute: two BNSF Metra stops (La Grange Road and Stone Avenue) put you about 13 to 14 miles from downtown, with trains reaching Chicago Union Station in roughly 25 to 35 minutes",
      "Downtown: a walkable, National Register historic district with independent shops, dining, a summer farmers market, the restored La Grange Theatre, and the long-running Pet Parade held since 1947",
      "Housing stock: a mix of character-rich vintage homes from the late 1800s and early 1900s near the center of town, plus newer builds, in a market that stays competitive year-round"
    ],
    "faqs": [
      {
        "q": "How long is the commute from La Grange to downtown Chicago?",
        "a": "La Grange sits right on the BNSF Metra Line with two stations in the village, La Grange Road and Stone Avenue. From either one, trains reach Chicago Union Station in roughly 25 to 35 minutes depending on the schedule, which is a big reason commuters keep choosing this suburb. It is about 13 to 14 miles to downtown."
      },
      {
        "q": "What is the housing market like in La Grange right now?",
        "a": "La Grange has stayed a competitive market, and well-located homes often draw multiple offers and sell fairly quickly. As of this writing the median sale price has been running in the mid to high $500,000s, though it moves with the season and the specific neighborhood. I am happy to pull current, address-specific numbers for you so we are working from today's data rather than a general figure."
      }
    ]
  },
  "riverside": {
    "county": "Cook County",
    "intro": "Riverside sits about nine miles west of downtown Chicago in Cook County, and it is unlike anywhere else in the region. The village was planned in 1869 by Frederick Law Olmsted and Calvert Vaux as one of the first designed suburbs in the country, and that vision still shapes daily life here, from the curving tree lined streets and generous parkland to the gas style streetlights and the landmark Swiss gothic water tower. The entire community is recognized as a National Historic Landmark, which gives the housing stock a rare mix of Victorians, Frank Lloyd Wright influenced designs, and character homes you simply cannot find in a standard subdivision. Families are drawn here for Riverside School District 96, which serves kindergarten through eighth grade, with students moving on to Riverside Brookfield High School in District 208. The BNSF Metra line runs right through the village, so commuters can reach the Loop without a car, and the walkable downtown keeps restaurants, coffee shops, and small businesses close to home. As someone who works across Elmhurst and the near west Cook County suburbs, I know how to price, market, and protect the value of these historic properties, whether you are buying your first home here or selling a house that has been in the family for decades.",
    "highlights": [
      "National Historic Landmark village planned in 1869 by Frederick Law Olmsted and Calvert Vaux, with curving streets, parkland, gas style streetlights, and the landmark Swiss gothic water tower designed by William Le Baron Jenney",
      "Served by Riverside School District 96 for kindergarten through eighth grade, with high schoolers attending Riverside Brookfield High School in District 208",
      "Metra BNSF Line station right in the village (fare zone 2, roughly 11 miles from Chicago Union Station) gives commuters a fast, car free path to the Loop",
      "Distinctive historic housing stock of Victorians and architect designed homes that, combined with limited inventory, keeps Riverside a premium and competitive market within near west Cook County"
    ],
    "faqs": [
      {
        "q": "How is the commute from Riverside to downtown Chicago?",
        "a": "Very manageable. The Metra BNSF Line stops right in the village, and Riverside sits about 11 miles from Chicago Union Station in fare zone 2, with frequent weekday trains. Most commuters reach the Loop in well under an hour without ever needing to drive, which is a big part of the appeal here."
      },
      {
        "q": "What schools serve Riverside?",
        "a": "Riverside School District 96 serves students from kindergarten through eighth grade, and high schoolers attend Riverside Brookfield High School, part of District 208. I am always happy to point families toward the district's own enrollment information so you can confirm boundaries for a specific address."
      }
    ]
  },
  "forest-park": {
    "county": "Cook County",
    "intro": "Forest Park is a compact, friendly village in Cook County that gives you a real urban-suburban hybrid right at the western edge of Chicago. The heart of town is Madison Street, a genuinely walkable stretch of restaurants, bars, coffee shops, and small businesses that draws people in from all over the near-west suburbs. Getting downtown could not be simpler, because Forest Park is the western terminus of the CTA Blue Line and also sits next to the Green Line's Harlem/Lake stop, so you have two rail options without ever needing Metra. Prices here tend to be more approachable than neighbors like Oak Park and River Forest, which makes Forest Park a smart pick for first-time buyers, downsizers, and anyone who wants train access without a city tax bill. The housing stock is a mix of vintage single-family homes, two-flats, and condos, and as of this writing the village's median sale price has been sitting in the low $300,000s. If you want a place where you can leave the car at home most weekends, this is one of my favorite spots to show.",
    "highlights": [
      "Two CTA train lines: Forest Park is the western terminus of the Blue Line (O'Hare to the Loop) and sits beside the Green Line's Harlem/Lake terminal, so no Metra required to reach downtown",
      "Walkable Madison Street is the village's main draw, lined with locally owned restaurants, bars, cafes, and shops",
      "Schools are Forest Park School District 91 for elementary and Proviso Township High Schools District 209 for high school; the selective-enrollment Proviso Mathematics and Science Academy is located right in Forest Park",
      "Approachable pricing compared to neighboring Oak Park and River Forest, with a housing mix of vintage single-family homes, two-flats, and condos and a village median sale price in the low $300,000s as of this writing"
    ],
    "faqs": [
      {
        "q": "How is the commute to downtown Chicago from Forest Park?",
        "a": "Very manageable. Forest Park is the western end of the CTA Blue Line, which runs straight to the Loop and continues to O'Hare, and you also have the Green Line's Harlem/Lake terminal right next door. Having two rail lines means a lot of residents commute without ever needing a car or a Metra pass."
      },
      {
        "q": "Which schools serve Forest Park?",
        "a": "Elementary students attend Forest Park School District 91, and high school is part of Proviso Township High Schools District 209. Forest Park is also home to the Proviso Mathematics and Science Academy, a selective-enrollment high school within District 209. I am always happy to point you toward the district's own resources so you can dig into the details that matter to your family."
      }
    ]
  },
  "roselle": {
    "county": "DuPage County",
    "intro": "Roselle is the kind of place where I love showing homes, a welcoming suburban village about 24 miles northwest of downtown Chicago that families come back to year after year. Most of Roselle sits in DuPage County (the northern edge reaches into Cook County), and that DuPage portion is served by Roselle School District 12 for elementary and middle school, with Lake Park Community High School District 108 covering the high school years. Commuters have it easy here thanks to the Roselle station on Metra's Milwaukee District West line, which runs straight into Chicago Union Station in roughly 55 minutes. Downtown has real character too, from Main Street Station to the longtime favorite Lynfred Winery, founded in 1979. The housing stock leans toward solid single family homes on comfortable lots, with townhomes and condos mixed in for buyers who want a lower maintenance option. As a Real Estate Broker with GC Realty & Development in nearby Roselle, I work this market every week and would be glad to help you buy, sell, or (through GC Realty's property management arm) invest here.",
    "highlights": [
      "Schools: Most of Roselle is served by Roselle School District 12 (elementary and middle) and Lake Park Community High School District 108 for high school, with portions of the village in neighboring districts depending on location.",
      "Commute: The Roselle station on Metra's Milwaukee District West line connects to Chicago Union Station in about 55 minutes, with hundreds of commuter parking spaces at the downtown lots.",
      "Downtown and lifestyle: Main Street Station, the long-running Lynfred Winery (established 1979), and ongoing Village Crossing redevelopment give the village a real downtown feel.",
      "Housing stock: Roselle is a family-oriented community of mostly single family homes on comfortable lots, with townhomes and condos available for buyers who want lower maintenance living."
    ],
    "faqs": [
      {
        "q": "What is the commute from Roselle to downtown Chicago like?",
        "a": "Roselle has its own Metra station on the Milwaukee District West line, and the ride into Chicago Union Station runs roughly 55 minutes. The downtown commuter lots offer plenty of parking, so many residents drive a few minutes, park, and let the train handle the rest of the trip."
      },
      {
        "q": "Which schools serve Roselle?",
        "a": "It depends a bit on where in the village you are, since Roselle's boundaries touch a few districts. For most of the community, elementary and middle school students attend Roselle School District 12, and high schoolers attend Lake Park Community High School in District 108. I am always happy to confirm the exact attendance area for any specific address before you buy."
      }
    ]
  },
  "elk-grove-village": {
    "county": "Cook County",
    "intro": "Elk Grove Village sits in Cook County on the western edge of O'Hare, and it is one of those northwest suburbs that quietly gives you a lot for your money. It is best known as home to the largest consolidated business park in North America, with thousands of companies that bring steady jobs and a strong local tax base, but the residential side feels worlds away from all that, with tidy postwar neighborhoods, mature trees, and easy access to the 3,700-acre Busse Woods (Ned Brown) Forest Preserve. Families are drawn to the well-regarded public schools, the village pool and parks, and amenities like Rainbow Falls Waterpark and Pirates' Cove. Commuters appreciate being roughly twenty minutes from O'Hare and a short drive to I-90, I-290, and nearby Metra stations. Housing here leans toward ranches, split-levels, and townhomes, which makes it a practical pick for first-time buyers, downsizers, and investors alike. If you are weighing Elk Grove Village against Elmhurst or other near-west options, I am glad to compare the trade-offs with you in plain terms.",
    "highlights": [
      "Home to the largest consolidated business park in North America, with roughly 3,600 businesses along O'Hare's western edge, which supports a strong local job base and tax revenue.",
      "Elementary and middle grades are served by Community Consolidated School District 59 and District 54, and high schoolers attend Township High School District 214, including Elk Grove High School right in the village.",
      "Borders the 3,700-acre Busse Woods (Ned Brown Forest Preserve), with Busse Lake, more than 11 miles of trails, and a resident elk herd that gives the village its name.",
      "About a 20-minute drive to O'Hare with quick access to I-90 and I-290; there is no Metra stop inside the village, but nearby Milwaukee District West stations and the Union Pacific Northwest line serve commuters."
    ],
    "faqs": [
      {
        "q": "What is the housing market like in Elk Grove Village?",
        "a": "It is a solid-value market built mostly around ranches, split-levels, and townhomes, so it tends to appeal to first-time buyers, downsizers, and investors. As of this writing, well-priced homes here move fairly quickly, often in just a few weeks, but conditions shift through the year, so I am happy to pull current numbers for your specific block and price range before you make a move."
      },
      {
        "q": "How is the commute and access to O'Hare?",
        "a": "Location is one of the village's biggest draws. You are roughly 20 minutes from O'Hare International Airport, with fast connections to I-90 and I-290. There is no Metra station within the village itself, but commuters use nearby Milwaukee District West stations and the Union Pacific Northwest line, so getting downtown by train is still very doable."
      }
    ]
  }
};

export const ALL_AREAS_SERVED = [
  "Elmhurst",
  "Oak Park",
  "River Forest",
  "Berwyn",
  "La Grange",
  "Riverside",
  "Forest Park",
  "Elmwood Park",
  "Western Springs",
  "Brookfield",
  "Cicero",
  "Roselle",
  "Bloomingdale",
  "Schaumburg",
  "Elk Grove Village",
  "Itasca",
  "Wood Dale",
  "Bensenville",
  "Addison",
  "Lombard",
  "Villa Park",
  "Glen Ellyn",
  "Wheaton",
  "Hanover Park",
  "Bartlett"
];

export type Testimonial = {
  quote: string;
  city: string;
  role: string;
  date: string;
};

// Samantha has no published client testimonials, so none are fabricated. When
// she provides real reviews, drop them in here and the section will render.
export const TESTIMONIALS: Testimonial[] = [];

export const FAQS = [
  {
    "q": "What areas do you cover?",
    "a": "I focus on Elmhurst and the near-west Cook County suburbs like Oak Park, River Forest, Berwyn, La Grange, Riverside, and Forest Park, and I also work throughout my northwest-suburban home base around Roselle and Elk Grove Village. GC Realty's footprint covers the city and suburbs, so if your town is nearby, I can almost certainly help."
  },
  {
    "q": "Do you work with both buyers and sellers?",
    "a": "Yes, both. I represent buyers and sellers, and because GC Realty also runs a property-management division, I am a good fit for investors and landlords who want to buy, sell, or manage rental property too."
  },
  {
    "q": "How long does a typical Illinois closing take?",
    "a": "Most residential closings run about 30 to 45 days from accepted contract. Illinois is an attorney-review state, so there is a five-business-day attorney review period built into the standard contract, plus an inspection window. I will set realistic expectations from day one."
  },
  {
    "q": "Should I get pre-approved before we start looking?",
    "a": "Yes, and it costs you nothing. A pre-approval tells you exactly what you can afford and shows sellers you are serious, which matters in a competitive pocket. I am happy to introduce you to lenders I trust if you need one."
  },
  {
    "q": "How do you price a home to sell?",
    "a": "I build a real comparative market analysis from recent comparable sales near you, then walk your home and adjust for condition, updates, and location. You get a defensible price range and an honest prep list, not a number designed to win your listing and then chase the market down."
  },
  {
    "q": "Who is GC Realty & Development?",
    "a": "GC Realty & Development is the full-service brokerage and property-management firm I work with, based in Roselle and serving Chicagoland since 2003. It means you get a local, hands-on broker with a full brokerage and management team behind every deal."
  }
];

// Listings live in public/data/properties.json and are managed from /admin.
// See lib/properties.ts for the read helpers.

export type ListingStatus =
  | "For Sale"
  | "Pending"
  | "Sold"
  | "Coming Soon"
  | "Off Market";

export type Listing = {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string | null;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  status: ListingStatus;
  featured: boolean;
  description: string | null;
  photos: string[];
  listing_url: string | null;
  listing_type: string | null;
  mls_number: string | null;
  created_at: string;
};

// Blog posts live in public/data/blog.json and are managed from /admin (the
// "Blog" tab). Same edit-in-browser, export-to-publish model as listings.
// See lib/blog.ts for the read helpers and lib/markdown.tsx for body rendering.
export const BLOG_CATEGORIES = [
  "Market Updates",
  "Buying",
  "Selling",
  "Neighborhoods",
  "Relocating",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogPost = {
  id: string; // url slug
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  body: string; // simple Markdown, rendered by lib/markdown.tsx
  coverImage: string | null;
  author: string;
  date: string; // ISO publish date (YYYY-MM-DD)
  readMinutes: number;
  published: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
};
