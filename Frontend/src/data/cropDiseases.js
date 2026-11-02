
export const CROP_DISEASES = [
  // 1. Tomato Early Blight — existing sample
  {
    id: 'tomato-early-blight',
    crop: 'Tomato',
    diseaseName: 'Tomato Early Blight',
    scientificName: 'Alternaria solani',
    status: 'Infected',
    severity: 'Moderate',
    confidence: 96.4,
    description:
      'A fungal disease that causes dark, concentric spots, usually on older tomato leaves.',
    symptoms: [
      'Dark brown spots with concentric rings.',
      'Yellow areas around leaf lesions.',
      'Premature loss of older leaves.',
      'Dark lesions may appear near stems.'
    ],
    favorableConditions: {
      temperature: '24–29°C',
      humidity: 'High humidity and prolonged leaf wetness'
    },
    organicTreatment: [
      'Remove heavily infected leaves and dispose of them safely.',
      'Maintain soil health with mature compost.',
      'Avoid handling plants when their foliage is wet.'
    ],
    chemicalTreatment: [
      'Use a fungicide registered for tomato early blight in your region.',
      'Follow the product label for application rates and harvest restrictions.'
    ],
    preventiveMeasures: [
      'Rotate tomato crops with non-host crops.',
      'Use drip irrigation where practical.',
      'Maintain good spacing and airflow.',
      'Remove infected plant debris.'
    ],
    sampleImage:
      'https://images.unsplash.com/photo-1592417817098-8f3d69106093?w=600&q=80'
  },

  // 2. Potato Late Blight
  {
    id: 'potato-late-blight',
    modelLabel: 'potato_late_blight',
    crop: 'Potato',
    diseaseName: 'Potato Late Blight',
    scientificName: 'Phytophthora infestans',
    status: 'Infected',
    severity: 'High',
    confidence: 98.2,
    description:
      'A destructive disease that can rapidly damage potato foliage and tubers in cool, wet conditions.',
    symptoms: [
      'Irregular, water-soaked leaf lesions.',
      'Brown or black patches that spread quickly.',
      'Possible whitish growth on leaf undersides in humid conditions.',
      'Brown rot may develop in infected tubers.'
    ],
    favorableConditions: {
      temperature: 'Approximately 10–22°C, depending on conditions',
      humidity: 'High humidity and prolonged leaf wetness'
    },
    organicTreatment: [
      'Remove and safely dispose of severely infected plant material.',
      'Avoid moving contaminated plant material between fields.',
      'Seek local agricultural advice when the disease is suspected.'
    ],
    chemicalTreatment: [
      'Use only products registered for potato late blight in your region.',
      'Follow the product label and local disease-management advisories.',
      'Rotate fungicide modes of action according to label guidance.'
    ],
    preventiveMeasures: [
      'Plant certified disease-free seed potatoes.',
      'Monitor local late-blight advisories.',
      'Avoid prolonged leaf wetness where practical.',
      'Remove volunteer potato plants and infected debris.'
    ],
    sampleImage:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80'
  },

  // 3. Corn Common Rust — existing sample
  {
    id: 'corn-common-rust',
    crop: 'Corn (Maize)',
    diseaseName: 'Corn Common Rust',
    scientificName: 'Puccinia sorghi',
    status: 'Infected',
    severity: 'Moderate',
    confidence: 94.7,
    description:
      'A fungal disease that produces rust-colored pustules on corn leaves. This is an existing sample record and is not the same as the model-supported Corn Cercospora Leaf Spot class.',
    symptoms: [
      'Cinnamon-brown pustules on leaves.',
      'Pustules may occur on both leaf surfaces.',
      'Pustules release powdery spores.',
      'Severe infections may reduce healthy leaf area.'
    ],
    favorableConditions: {
      temperature: 'Approximately 16–25°C',
      humidity: 'High humidity and prolonged dew'
    },
    organicTreatment: [
      'Remove severely affected leaves when practical.',
      'Maintain appropriate plant spacing.',
      'Seek local agricultural advice for suitable management options.'
    ],
    chemicalTreatment: [
      'Use only a locally registered product when treatment is warranted.',
      'Follow label instructions and crop-specific recommendations.'
    ],
    preventiveMeasures: [
      'Select suitable resistant hybrids where available.',
      'Monitor crops regularly.',
      'Manage volunteer corn plants.'
    ],
    sampleImage:
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80'
  },

  // 4. Rice Bacterial Leaf Blight — existing sample
  {
    id: 'rice-bacterial-blight',
    crop: 'Rice',
    diseaseName: 'Bacterial Leaf Blight',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    status: 'Infected',
    severity: 'High',
    confidence: 95.8,
    description:
      'A bacterial rice disease that causes yellowing and drying along leaf margins and can cause severe damage under favorable conditions.',
    symptoms: [
      'Water-soaked stripes beginning near leaf tips or margins.',
      'Yellow to straw-colored lesions.',
      'Lesions may extend along the leaf.',
      'Severe infection can cause seedling wilting.'
    ],
    favorableConditions: {
      temperature: 'Warm conditions, often around 25–34°C',
      humidity: 'High humidity, rain and storm damage'
    },
    organicTreatment: [
      'Remove infected plant debris after harvest.',
      'Consult local agricultural extension services for suitable management.',
      'Avoid moving contaminated plant material between fields.'
    ],
    chemicalTreatment: [
      'Do not assume that a fungicide will control this bacterial disease.',
      'Use only locally approved products specifically recommended for rice bacterial blight.'
    ],
    preventiveMeasures: [
      'Grow locally recommended resistant rice varieties.',
      'Use clean seed and healthy seedlings.',
      'Avoid excessive nitrogen fertilizer.',
      'Maintain balanced crop nutrition and appropriate water management.'
    ],
    sampleImage:
      'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&q=80'
  },

  // 5. Apple Scab
  {
    id: 'apple-scab',
    modelLabel: 'Apple_Scab',
    crop: 'Apple',
    diseaseName: 'Apple Scab',
    scientificName: 'Venturia inaequalis',
    status: 'Infected',
    severity: 'Moderate',
    confidence: null,
    description:
      'A fungal disease that produces olive-green to dark lesions on apple leaves and scabby lesions on fruit.',
    symptoms: [
      'Olive-green, velvety spots on leaves.',
      'Leaves may become distorted or fall prematurely.',
      'Dark, corky lesions may develop on fruit.'
    ],
    favorableConditions: {
      temperature: 'Often around 18–24°C',
      humidity: 'Frequent rain and prolonged leaf wetness'
    },
    organicTreatment: [
      'Remove fallen infected leaves to reduce sources of infection.',
      'Prune appropriately to improve airflow.',
      'Consider locally recommended orchard sanitation practices.'
    ],
    chemicalTreatment: [
      'Use only products registered for apple scab in your region.',
      'Follow product-label instructions and local spray advisories.'
    ],
    preventiveMeasures: [
      'Consider scab-resistant cultivars.',
      'Remove infected leaf debris.',
      'Monitor new foliage during wet weather.',
      'Maintain good canopy airflow.'
    ],
    sampleImage:
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80'
  },

  // 6. Healthy Tomato Foliage — existing sample
  {
    id: 'healthy-leaf',
    crop: 'Tomato',
    diseaseName: 'Healthy Crop Foliage',
    scientificName: 'Solanum lycopersicum',
    status: 'Healthy',
    severity: 'None',
    confidence: 99.1,
    description:
      'The image has been classified as healthy foliage. Image classification alone cannot guarantee that a plant is disease-free.',
    symptoms: [
      'No obvious disease symptoms identified.',
      'Leaf color appears generally uniform.',
      'No clear lesions identified by the classifier.'
    ],
    favorableConditions: {
      temperature: 'Depends on crop variety and growth stage',
      humidity: 'Depends on crop and growing conditions'
    },
    organicTreatment: [
      'Continue appropriate irrigation and soil care.',
      'Use mature compost where suitable.',
      'Avoid unnecessary pesticide applications.'
    ],
    chemicalTreatment: [
      'No pesticide is indicated by a healthy classification alone.',
      'Investigate any symptoms that appear despite the prediction.'
    ],
    preventiveMeasures: [
      'Inspect crops regularly.',
      'Maintain appropriate irrigation and drainage.',
      'Use healthy planting material.',
      'Follow integrated pest management practices.'
    ],
    sampleImage:
      'https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&q=80'
  },

  // 7. Apple Black Rot
  {
    id: 'apple-black-rot',
    modelLabel: 'apple_black_rot',
    crop: 'Apple',
    diseaseName: 'Apple Black Rot',
    scientificName: 'Botryosphaeria obtusa',
    status: 'Infected',
    severity: 'High',
    confidence: null,
    description:
      'A fungal disease affecting apple fruit, leaves and woody tissues. Fruit rot and leaf lesions can occur, especially where infected plant material remains in the orchard.',
    symptoms: [
      'Brown leaf spots that may develop darker margins.',
      'Circular fruit rot that can develop concentric bands.',
      'Mummified fruit may remain on the tree.',
      'Cankers can develop on branches and woody tissues.'
    ],
    favorableConditions: {
      temperature: 'Varies with infection stage and local conditions',
      humidity: 'Wet weather can favor infection and spore dispersal'
    },
    organicTreatment: [
      'Remove mummified fruit and infected dead branches where appropriate.',
      'Dispose of infected plant material according to local guidance.',
      'Keep orchard tools clean.'
    ],
    chemicalTreatment: [
      'Consult local orchard recommendations for registered black-rot control products.',
      'Follow product labels and observe harvest restrictions.'
    ],
    preventiveMeasures: [
      'Prune dead and diseased branches.',
      'Remove mummified fruit and infected debris.',
      'Inspect trees regularly for cankers.',
      'Maintain appropriate orchard sanitation.'
    ],
    sampleImage: ''
  },

  // 8. Corn Cercospora Leaf Spot
  {
    id: 'corn-cercospora',
    modelLabel: 'Corn_sercospora',
    crop: 'Corn (Maize)',
    diseaseName: 'Corn Cercospora Leaf Spot',
    scientificName: 'Cercospora zeae-maydis',
    status: 'Infected',
    severity: 'Moderate',
    confidence: null,
    description:
      'A fungal leaf disease of corn associated with elongated lesions and reduced healthy leaf area. The exact appearance can vary by variety and environment.',
    symptoms: [
      'Long, narrow lesions running parallel to leaf veins.',
      'Lesions may appear tan, gray or brown.',
      'Multiple lesions may merge as disease progresses.',
      'Severe disease can reduce functional leaf area.'
    ],
    favorableConditions: {
      temperature: 'Warm conditions favorable to the pathogen',
      humidity: 'High humidity and extended periods of leaf wetness'
    },
    organicTreatment: [
      'Remove volunteer corn where practical.',
      'Use crop-residue management practices suited to the farming system.',
      'Seek local agricultural advice for disease-management options.'
    ],
    chemicalTreatment: [
      'Use only fungicides registered for corn gray leaf spot in your region.',
      'Follow local thresholds, product labels and resistance-management advice.'
    ],
    preventiveMeasures: [
      'Use locally recommended tolerant or resistant hybrids.',
      'Rotate with non-host crops where appropriate.',
      'Manage infected crop residue according to local guidance.',
      'Monitor lower leaves and disease progression.'
    ],
    sampleImage: ''
  },

  // 9. Grape Black Rot
  {
    id: 'grape-black-rot',
    modelLabel: 'Grape_balck_rot',
    crop: 'Grape',
    diseaseName: 'Grape Black Rot',
    scientificName: 'Guignardia bidwellii',
    status: 'Infected',
    severity: 'High',
    confidence: null,
    description:
      'A fungal disease that can damage grape leaves, shoots and berries. Infected berries may shrivel into dark, hard mummies.',
    symptoms: [
      'Small brown leaf lesions that may develop dark margins.',
      'Dark fruit lesions that expand over time.',
      'Infected berries may shrivel and become black mummies.',
      'Dark fruiting structures may develop within lesions.'
    ],
    favorableConditions: {
      temperature: 'Warm growing-season conditions',
      humidity: 'Rain and prolonged wetness can promote infection'
    },
    organicTreatment: [
      'Remove and safely dispose of infected fruit mummies.',
      'Prune to improve canopy airflow.',
      'Avoid leaving infected berries attached to vines or trellises.'
    ],
    chemicalTreatment: [
      'Use only products registered for grape black rot in your region.',
      'Follow locally recommended timing and all label precautions.'
    ],
    preventiveMeasures: [
      'Remove mummified berries from vines and the vineyard floor.',
      'Prune infected tissues where appropriate.',
      'Maintain an open canopy.',
      'Monitor vines during wet weather.'
    ],
    sampleImage: ''
  },

  // 10. Peach Bacterial Spot
  {
    id: 'peach-bacterial-spot',
    modelLabel: 'Peach_bacterial_spot',
    crop: 'Peach',
    diseaseName: 'Peach Bacterial Spot',
    scientificName: 'Xanthomonas arboricola pv. pruni',
    status: 'Infected',
    severity: 'Moderate',
    confidence: null,
    description:
      'A bacterial disease that affects peach leaves and fruit. Symptoms can include small angular leaf spots, leaf drop and pitted fruit lesions.',
    symptoms: [
      'Small angular or irregular dark leaf spots.',
      'Yellowing around some leaf lesions.',
      'Premature leaf drop in affected trees.',
      'Small sunken lesions on fruit.'
    ],
    favorableConditions: {
      temperature: 'Warm growing-season conditions',
      humidity: 'Rain, wind-driven moisture and prolonged leaf wetness'
    },
    organicTreatment: [
      'Remove severely affected fallen leaves where practical.',
      'Avoid handling trees when foliage is wet.',
      'Consult a local fruit-crop specialist for management options.'
    ],
    chemicalTreatment: [
      'Bacterial spot control options depend on local registration and resistance patterns.',
      'Use only products specifically recommended for peach bacterial spot.',
      'Do not assume that routine fungicides will control a bacterial pathogen.'
    ],
    preventiveMeasures: [
      'Choose locally recommended cultivars where available.',
      'Use healthy nursery stock.',
      'Avoid excessive irrigation that wets foliage.',
      'Maintain suitable airflow and orchard sanitation.'
    ],
    sampleImage: ''
  },

  // 11. Potato Early Blight
  {
    id: 'potato-early-blight',
    modelLabel: 'potato_early_blight',
    crop: 'Potato',
    diseaseName: 'Potato Early Blight',
    scientificName: 'Alternaria solani',
    status: 'Infected',
    severity: 'Moderate',
    confidence: null,
    description:
      'A fungal disease that often produces brown lesions with concentric rings, particularly on older potato leaves.',
    symptoms: [
      'Brown spots with concentric target-like rings.',
      'Yellowing around affected leaf tissue.',
      'Lesions often begin on older leaves.',
      'Severe infection may cause premature leaf loss.'
    ],
    favorableConditions: {
      temperature: 'Often around 24–29°C',
      humidity: 'High humidity and prolonged leaf wetness'
    },
    organicTreatment: [
      'Remove heavily infected foliage where practical.',
      'Use healthy seed potatoes.',
      'Avoid working among plants while foliage is wet.',
      'Manage crop debris appropriately.'
    ],
    chemicalTreatment: [
      'Use only products registered for potato early blight in your region.',
      'Follow label rates, protective-equipment requirements and harvest restrictions.',
      'Follow resistance-management recommendations.'
    ],
    preventiveMeasures: [
      'Rotate potatoes with non-host crops.',
      'Maintain suitable plant spacing and airflow.',
      'Avoid unnecessary wetting of foliage.',
      'Inspect older leaves regularly.'
    ],
    sampleImage: ''
  },

  // 12. Strawberry Leaf Scorch
  {
    id: 'strawberry-leaf-scorch',
    modelLabel: 'Strawberry_leaf_scorch',
    crop: 'Strawberry',
    diseaseName: 'Strawberry Leaf Scorch',
    scientificName: 'Diplocarpon earlianum',
    status: 'Infected',
    severity: 'Moderate',
    confidence: null,
    description:
      'A fungal strawberry disease that produces numerous small purple to dark lesions on leaves. Lesions may merge and give leaves a scorched appearance.',
    symptoms: [
      'Small purple, red-purple or dark spots on leaves.',
      'Lesions may merge into larger affected areas.',
      'Leaf edges and surfaces may appear scorched.',
      'Severe disease can reduce healthy leaf area.'
    ],
    favorableConditions: {
      temperature: 'Conditions vary by cultivar and growing environment',
      humidity: 'Wet foliage and humid conditions can favor disease development'
    },
    organicTreatment: [
      'Remove badly affected old leaves where practical.',
      'Avoid working among plants when leaves are wet.',
      'Use healthy planting material and appropriate sanitation.'
    ],
    chemicalTreatment: [
      'Use only products registered for strawberry leaf diseases in your region.',
      'Follow product labels and pre-harvest restrictions.'
    ],
    preventiveMeasures: [
      'Use healthy planting material.',
      'Maintain suitable spacing and airflow.',
      'Remove infected leaf debris.',
      'Avoid prolonged leaf wetness where practical.'
    ],
    sampleImage: ''
  },

  // 13. Tomato Bacterial Spot
  {
    id: 'tomato-bacterial-spot',
    modelLabel: 'tomato_bacterial_spot',
    crop: 'Tomato',
    diseaseName: 'Tomato Bacterial Spot',
    scientificName: 'Xanthomonas species complex',
    status: 'Infected',
    severity: 'Moderate',
    confidence: null,
    description:
      'A bacterial disease of tomato that can cause leaf spots, defoliation and raised or scabby lesions on fruit.',
    symptoms: [
      'Small dark or water-soaked spots on leaves.',
      'Lesions may develop yellow margins.',
      'Leaf tissue can die around numerous lesions.',
      'Fruit may develop raised, scabby spots.'
    ],
    favorableConditions: {
      temperature: 'Warm conditions',
      humidity: 'High humidity, rain splash and wet foliage'
    },
    organicTreatment: [
      'Remove badly infected plant material where practical.',
      'Avoid handling plants when wet.',
      'Clean tools and equipment between affected areas.',
      'Seek local agricultural advice for suitable management.'
    ],
    chemicalTreatment: [
      'Use only products registered for tomato bacterial spot in your region.',
      'Check local guidance because bacterial populations may resist some treatments.',
      'Follow all label precautions.'
    ],
    preventiveMeasures: [
      'Use clean seed and healthy transplants.',
      'Avoid overhead irrigation where practical.',
      'Sanitize tools and trays.',
      'Rotate crops and manage infected debris.'
    ],
    sampleImage: ''
  },

  // 14. Tomato Mosaic Virus
  {
    id: 'tomato-mosaic-virus',
    modelLabel: 'Tomato_mosaic_virus',
    crop: 'Tomato',
    diseaseName: 'Tomato Mosaic Virus',
    scientificName: 'Tomato mosaic virus (ToMV)',
    status: 'Infected',
    severity: 'Moderate',
    confidence: null,
    description:
      'A viral disease that may cause mottled leaf coloration, leaf distortion and reduced plant growth. Visual symptoms alone cannot confirm the virus.',
    symptoms: [
      'Light and dark green mosaic patterns on leaves.',
      'Leaf curling or distortion.',
      'Reduced plant vigor or stunted growth.',
      'Fruit development may be affected.'
    ],
    favorableConditions: {
      temperature: 'Symptoms vary with temperature, cultivar and plant age',
      humidity: 'Spread is often associated with contaminated hands, tools and plant material rather than humidity alone'
    },
    organicTreatment: [
      'There is no curative treatment for an infected plant.',
      'Remove confirmed infected plants according to local guidance.',
      'Clean hands and tools after handling suspect plants.'
    ],
    chemicalTreatment: [
      'Fungicides do not cure viral infections.',
      'Do not apply pesticides solely because a model predicts a virus.',
      'Seek confirmation if the diagnosis will affect crop management.'
    ],
    preventiveMeasures: [
      'Use healthy seed and disease-free transplants.',
      'Disinfect tools using a suitable, label-approved method.',
      'Wash hands before handling healthy plants.',
      'Remove infected plants and avoid tobacco contamination when handling crops.'
    ],
    sampleImage: ''
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
  'Bell Pepper',
  'Peach',
  'Strawberry'
]
