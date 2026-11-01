export const CROP_DISEASES = [
  {
    id: 'tomato-early-blight',
    crop: 'Tomato',
    diseaseName: 'Tomato Early Blight',
    scientificName: 'Alternaria solani',
    status: 'Infected',
    severity: 'Moderate',
    confidence: 96.4,
    description:
      'Early blight is a common fungal disease causing dark concentric target-like rings on older leaves, leading to defoliation.',
    symptoms: [
      'Dark brown to black spots with concentric rings (target pattern)',
      'Yellow chlorotic halos surrounding lesions',
      'Premature drop of lower foliage progressing upwards',
      'Dark sunken lesions on stem collars and fruit attachments'
    ],
    favorableConditions: {
      temperature: '24°C - 29°C (75°F - 85°F)',
      humidity: 'High (>80%) with extended leaf wetness'
    },
    organicTreatment: [
      'Apply cold-pressed neem oil (3-5 ml per liter of water) every 7-10 days',
      'Spray copper-based organic fungicides (Bordeaux mixture 1%) at first sign',
      'Prune lower infected leaves 6 inches from the soil surface and burn or discard away from fields'
    ],
    chemicalTreatment: [
      'Apply Chlorothalonil 75% WP (2 g/L) or Mancozeb 75% WP (2.5 g/L)',
      'In severe infections, spray Azoxystrobin 23% SC (1 ml/L) alternating with Difenoconazole'
    ],
    preventiveMeasures: [
      'Practice 3-year crop rotation avoiding Solanaceous family crops (potato, eggplant, pepper)',
      'Use drip irrigation instead of overhead sprinklers to minimize leaf wetness',
      'Apply organic mulch (straw or plastic) to prevent soil-splashed spores'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1592417817098-8f3d69106093?w=600&q=80'
  },
  {
    id: 'potato-late-blight',
    crop: 'Potato',
    diseaseName: 'Potato Late Blight',
    scientificName: 'Phytophthora infestans',
    status: 'Infected',
    severity: 'High',
    confidence: 98.2,
    description:
      'A devastating oomycete infection capable of destroying entire potato foliage and tubers within days during humid cool weather.',
    symptoms: [
      'Water-soaked irregular pale green to dark brown lesions on leaf tips',
      'White cottony fungal growth on leaf undersides in high humidity',
      'Rapid wilting and browning of entire stems and canopy',
      'Brown granular rot inside infected potato tubers'
    ],
    favorableConditions: {
      temperature: '15°C - 22°C (Cool & damp)',
      humidity: 'Very high relative humidity (>90%) with morning dew/fog'
    },
    organicTreatment: [
      'Preventive bio-agent application: Trichoderma viride or Pseudomonas fluorescens (10 g/L soil drench)',
      'Spray certified copper hydroxide / copper oxychloride before disease sets in',
      'Immediately remove and destroy heavily infested haulms before harvest'
    ],
    chemicalTreatment: [
      'Cymoxanil 8% + Mancozeb 64% WP (2 g/L water)',
      'Metalaxyl-M 4% + Mancozeb 64% WP (2.5 g/L) at first symptom',
      'Dimethomorph 50% WP (1 g/L) as a curative spray'
    ],
    preventiveMeasures: [
      'Plant certified disease-free certified seed tubers',
      'Ensure high ridge earthing-up to prevent spores washing into underground tubers',
      'Monitor ICAR / Agrometeorological late blight warning advisories'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80'
  },
  {
    id: 'corn-common-rust',
    crop: 'Corn (Maize)',
    diseaseName: 'Corn Common Rust',
    scientificName: 'Puccinia sorghi',
    status: 'Infected',
    severity: 'Moderate',
    confidence: 94.7,
    description:
      'Common rust creates cinnamon-brown pustules on both upper and lower corn leaf surfaces, reducing photosynthetic capacity.',
    symptoms: [
      'Small, circular to elongated cinnamon-brown pustules (uredinia)',
      'Pustules rupture epidermal leaf tissue releasing powdery rust spores',
      'Spreads across upper and lower surfaces of leaves',
      'Severe infection causes premature leaf senescence and poor ear fill'
    ],
    favorableConditions: {
      temperature: '16°C - 25°C',
      humidity: 'Relative humidity near 100% with prolonged dew'
    },
    organicTreatment: [
      'Spray wettable sulfur (3 g/L) at early vegetative stages',
      'Foliar spray of garlic extract or fermented butter milk (sour curd) diluted 1:10',
      'Promote good field air circulation by maintaining optimal plant density'
    ],
    chemicalTreatment: [
      'Propiconazole 25% EC (1 ml/L) or Tebuconazole 25.9% EC (1 ml/L)',
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (1 ml/L) for dual action'
    ],
    preventiveMeasures: [
      'Sow rust-tolerant hybrid corn varieties',
      'Plant early in the season to avoid late-season airborne spore flushes',
      'Destroy volunteer corn plants and weed hosts (Oxalis spp.)'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80'
  },
  {
    id: 'rice-bacterial-blight',
    crop: 'Rice',
    diseaseName: 'Bacterial Leaf Blight (BLB)',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    status: 'Infected',
    severity: 'High',
    confidence: 95.8,
    description:
      'A major bacterial disease of paddy rice that causes yellow-to-straw colored marginal lesions and wilting ("Kresek").',
    symptoms: [
      'Water-soaked stripes starting along leaf margins near tip',
      'Lesions enlarge with wavy margins turning yellowish-white then gray',
      'Milky bacterial ooze drops on young lesions during early mornings',
      'Wilting and seedling death (Kresek phase) in early transplanting'
    ],
    favorableConditions: {
      temperature: '25°C - 34°C with rain storms',
      humidity: 'High humidity (>85%) and standing water in fields'
    },
    organicTreatment: [
      'Spray bio-control agent Bacillus subtilis or Pseudomonas fluorescens',
      'Spray 20% fresh cow dung slurry extract supernatant (20 g cow dung in 1L water filtered through muslin cloth)',
      'Drain stagnant field water for 3 to 4 days to reduce moisture build-up'
    ],
    chemicalTreatment: [
      'Streptomycin sulphate + Tetracycline hydrochloride (Plantomycin / Agrimycin) 100 g + Copper oxychloride 500 g in 500 L water/ha',
      'Avoid high doses of nitrogen fertilizer during active outbreak'
    ],
    preventiveMeasures: [
      'Grow resistant rice cultivars (e.g. Improved Samba Mahsuri, Swarna-Sub1)',
      'Balance NPK nutrition; apply potash (K) in 2 splits to enhance resistance',
      'Avoid deep standing water (>5 cm) during tillering'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&q=80'
  },
  {
    id: 'apple-scab',
    crop: 'Apple',
    diseaseName: 'Apple Scab',
    scientificName: 'Venturia inaequalis',
    status: 'Infected',
    severity: 'Moderate',
    confidence: 93.1,
    description:
      'A fungal infection producing olive-green to black velvety spots on apple leaves and corky scabs on fruits, degrading fruit marketability.',
    symptoms: [
      'Olive-green, velvety, circular spots with blurred margins on leaves',
      'Leaves become curled, distorted, and drop prematurely',
      'Dark brown scabby, cracked, corky lesions on fruit skin'
    ],
    favorableConditions: {
      temperature: '18°C - 24°C',
      humidity: 'Frequent spring rains and continuous wet foliage for 9+ hours'
    },
    organicTreatment: [
      'Spray lime sulfur or potassium bicarbonate during budding stages',
      'Prune apple tree canopy to facilitate swift sunlight penetration and breeze drying',
      'Rake and compost or shred fallen orchard leaves with 5% urea spray in autumn'
    ],
    chemicalTreatment: [
      'Captan 50% WP (2.5 g/L) or Dodine 65% WP (1 g/L) as protectant',
      'Myclobutanil 10% WP (0.5 g/L) or Kresoxim-methyl 44.3% SC as curative'
    ],
    preventiveMeasures: [
      'Plant scab-resistant cultivars',
      'Apply post-harvest orchard floor sanitation to diminish overwintering pseudothecia',
      'Operate air-assisted orchard sprayers calibrated for uniform leaf underside coverage'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80'
  },
  {
    id: 'healthy-leaf',
    crop: 'Tomato',
    diseaseName: 'Healthy Crop Foliage',
    scientificName: 'Solanum lycopersicum (Healthy)',
    status: 'Healthy',
    severity: 'None',
    confidence: 99.1,
    description:
      'The leaf tissue demonstrates vigorous cellular structure, uniform dark green chlorophyll distribution, and no pathogen infection.',
    symptoms: [
      'Uniform vibrant green color with no chlorosis or necrosis',
      'Intact leaf margin and clean leaf veins',
      'No fungal spores, mycelia, bacterial ooze, or viral mosaics detected'
    ],
    favorableConditions: {
      temperature: '20°C - 26°C',
      humidity: 'Balanced relative humidity (50% - 70%)'
    },
    organicTreatment: [
      'Continue regular soil health maintenance with compost / vermicompost',
      'Preventive spraying of seaweed extract or Jeevamrutha every 15 days',
      'Ensure balanced micro-nutrient spray (Zinc, Boron, Iron) at flowering'
    ],
    chemicalTreatment: [
      'No chemical fungicide or bactericide required. Avoid unnecessary pesticide applications.'
    ],
    preventiveMeasures: [
      'Continue standard integrated pest management (IPM) practices',
      'Regular scouting of crop rows twice weekly',
      'Maintain appropriate irrigation schedule and soil drainage'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&q=80'
  }
]

export const CROPS_LIST = [
  'Tomato',
  'Potato',
  'Corn (Maize)',
  'Rice',
  'Wheat',
  'Apple',
  'Grape',
  'Bell Pepper'
]
