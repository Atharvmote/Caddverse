export interface Course {
  id: string;
  title: string;
  category: 'master-diploma' | 'diploma' | 'professional' | 'certifications';
  description: string;
  duration: string;
  level: 'Advanced' | 'Intermediate' | 'Beginner';
  isPopular?: boolean;
  skills: string[];
}

export const courses: Course[] = [
  // 1. Master Diplomas
  {
    id: 'master-diploma-product-design-analysis',
    title: 'Master Diploma in Product Design & Analysis',
    category: 'master-diploma',
    description: 'Learn product design & engineering analysis. Master AutoCAD, SolidWorks, ANSYS, and Catia.',
    duration: '6 Months',
    level: 'Advanced',
    isPopular: true,
    skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'Catia'],
  },
  {
    id: 'master-in-building-information-modeling-bim',
    title: 'Master In Building Information Modeling (BIM)',
    category: 'master-diploma',
    description: 'Complete BIM workflow. Master Revit Architecture, Structure, MEP, and Navisworks.',
    duration: '6 Months',
    level: 'Advanced',
    isPopular: true,
    skills: ['Revit Arc', 'Revit Struct', 'Revit MEP', 'Navisworks'],
  },
  {
    id: 'master-diploma-architecture-design',
    title: 'Master Diploma in Architecture Design',
    category: 'master-diploma',
    description: 'Design commercial & residential spaces. Master AutoCAD, Revit, 3ds Max, and V-Ray.',
    duration: '6 Months',
    level: 'Advanced',
    isPopular: true,
    skills: ['AutoCAD', 'Revit Arc', '3ds Max', 'V-Ray'],
  },
  {
    id: 'master-diploma-electrical-design',
    title: 'Master Diploma in Electrical Design',
    category: 'master-diploma',
    description: 'Design advanced electrical layouts & wiring. Master AutoCAD Electrical and calculations.',
    duration: '4 Months',
    level: 'Intermediate',
    isPopular: true,
    skills: ['AutoCAD Elec', 'Panel Design', 'SLD Layouts', 'Cable Sizing'],
  },
  {
    id: 'master-diploma-building-design',
    title: 'Master Diploma in Building Design',
    category: 'master-diploma',
    description: 'Complete building structure & foundation design. Master Revit, STAAD.Pro, and AutoCAD.',
    duration: '6 Months',
    level: 'Advanced',
    isPopular: true,
    skills: ['Revit Struct', 'STAAD Pro', 'AutoCAD', 'Structural FEA'],
  },
  {
    id: 'master-diploma-interior-design',
    title: 'Master Diploma in Interior Design',
    category: 'master-diploma',
    description: 'Learn modern interior spaces & styling. Master 3ds Max, V-Ray, SketchUp and rendering.',
    duration: '4 Months',
    level: 'Intermediate',
    isPopular: true,
    skills: ['3ds Max', 'V-Ray rendering', 'SketchUp', 'Layout Planning'],
  },

  // 2. Diplomas
  {
    id: 'diploma-product-design',
    title: 'Diploma in Product Design',
    category: 'diploma',
    description: 'Acquire core product design capabilities using standard design packages.',
    duration: '4 Months',
    level: 'Intermediate',
    skills: ['SolidWorks', 'AutoCAD', 'Sheet Metal'],
  },
  {
    id: 'diploma-building-design',
    title: 'Diploma in Building Design',
    category: 'diploma',
    description: 'Learn residential and commercial structural drafting and model building.',
    duration: '4 Months',
    level: 'Intermediate',
    skills: ['Revit Structure', 'AutoCAD', 'Drafting'],
  },
  {
    id: 'diploma-architectural-design',
    title: 'Diploma in Architectural Design',
    category: 'diploma',
    description: 'Familiarize with 2D drafting and basic 3D rendering for architecture projects.',
    duration: '4 Months',
    level: 'Intermediate',
    skills: ['AutoCAD', 'SketchUp', 'Layouts'],
  },
  {
    id: 'diploma-bim',
    title: 'Diploma in BIM',
    category: 'diploma',
    description: 'Introduction to Building Information Modeling files and collaboration.',
    duration: '4 Months',
    level: 'Intermediate',
    skills: ['Revit Arc', 'Revit Struct', 'MEP Intro'],
  },
  {
    id: 'diploma-electrical-design',
    title: 'Diploma in Electrical Design',
    category: 'diploma',
    description: 'Learn electrical schematic drafting and industrial electrical symbols.',
    duration: '3 Months',
    level: 'Intermediate',
    skills: ['AutoCAD Electrical', 'Schematics'],
  },

  // 3. Professional
  {
    id: 'professional-product-design',
    title: 'Professional in Product Design',
    category: 'professional',
    description: 'Professional grade drafting and modeling techniques for engineers.',
    duration: '3 Months',
    level: 'Intermediate',
    skills: ['SolidWorks', 'Catia', 'Part Design'],
  },
  {
    id: 'professional-course-building-design',
    title: 'Professional Course On Building Design',
    category: 'professional',
    description: 'Focuses on building analysis tools and foundation layout drawings.',
    duration: '3 Months',
    level: 'Intermediate',
    skills: ['STAAD Pro', 'AutoCAD Civil'],
  },
  {
    id: 'professional-course-architectural-design',
    title: 'Professional Course On Architectural Design',
    category: 'professional',
    description: 'Drafting plans and elevations. Professional 3D spatial design training.',
    duration: '3 Months',
    level: 'Intermediate',
    skills: ['Revit Architecture', 'AutoCAD'],
  },
  {
    id: 'professional-course-interior-design',
    title: 'Professional Course On Interior Design',
    category: 'professional',
    description: 'Understand interior materials, rendering workflows, and spatial planning.',
    duration: '3 Months',
    level: 'Intermediate',
    skills: ['3ds Max', 'V-Ray', 'SketchUp'],
  },
  {
    id: 'professional-course-electrical-design',
    title: 'Professional Course On Electrical Design',
    category: 'professional',
    description: 'Professional electrical drafting, single line diagrams, and wiring routes.',
    duration: '3 Months',
    level: 'Intermediate',
    skills: ['AutoCAD Electrical', 'Panel Layouts'],
  },

  // 4. Certifications
  {
    id: 'certificate-autocad-mechanical',
    title: 'Certificate In AutoCAD Mechanical',
    category: 'certifications',
    description: 'Master standard mechanical drafting, part lists, and automated design features.',
    duration: '80 Hours',
    level: 'Beginner',
    isPopular: true,
    skills: ['AutoCAD Mech', 'Mechanical Drafting', 'Standard Parts'],
  },
  {
    id: 'certificate-solidworks',
    title: 'Certificate In Solidworks',
    category: 'certifications',
    description: 'Acquire 3D parametric modeling, assembly design, and detailing skills.',
    duration: '40 Hours',
    level: 'Intermediate',
    skills: ['SolidWorks 3D', 'Assemblies', 'Detailing'],
  },
  {
    id: 'certificate-catia',
    title: 'Certificate In CATIA',
    category: 'certifications',
    description: 'Master advanced surface modeling and aerospace product engineering standards.',
    duration: '80 Hours',
    level: 'Advanced',
    skills: ['CATIA Part', 'Surfaces', 'Aerospace CAD'],
  },
  {
    id: 'certificate-ansys',
    title: 'Certificate In ANSYS',
    category: 'certifications',
    description: 'Learn structural analysis, thermal simulations, and CFD models.',
    duration: '80 Hours',
    level: 'Advanced',
    skills: ['ANSYS FEA', 'Stress Analysis', 'Meshing'],
  },
  {
    id: 'certificate-hypermesh',
    title: 'Certificate In HyperMesh',
    category: 'certifications',
    description: 'Acquire high-fidelity finite element meshing and model prep workflows.',
    duration: '80 Hours',
    level: 'Advanced',
    skills: ['HyperMesh meshing', 'FEA Prep', 'Shell Mesh'],
  },
  {
    id: 'certificate-nx-cad',
    title: 'Certificate In Nx CAD',
    category: 'certifications',
    description: 'Master high-end Siemens NX modeling, drafting, and assembly design.',
    duration: '80 Hours',
    level: 'Advanced',
    skills: ['NX CAD', 'Synchronous Tech', 'Modeling'],
  },
  {
    id: 'certificate-creo',
    title: 'Certificate In Creo',
    category: 'certifications',
    description: 'Learn Creo parametric modeling, sheet metal, and drafting templates.',
    duration: '80 Hours',
    level: 'Intermediate',
    skills: ['Creo Parametric', 'Sheet Metal', 'Drawing'],
  },
  {
    id: 'certificate-autocad-civil',
    title: 'Certificate In AutoCAD Civil',
    category: 'certifications',
    description: 'Master civil site plans, structural layouts, and land drafting principles.',
    duration: '80 Hours',
    level: 'Beginner',
    skills: ['AutoCAD Civil', 'Site Plans', 'Drafting'],
  },
  {
    id: 'certificate-revit-architecture',
    title: 'Certificate In Revit Architecture',
    category: 'certifications',
    description: 'Learn core BIM modeling, wall types, stairs, and presentation renderings.',
    duration: '80 Hours',
    level: 'Intermediate',
    skills: ['Revit BIM', 'Wall Types', 'Views', 'Render'],
  },
  {
    id: 'certificate-staad-pro',
    title: 'Certificate In STAAD Pro',
    category: 'certifications',
    description: 'Master structural analysis, concrete/steel design codes, and FEA models.',
    duration: '80 Hours',
    level: 'Advanced',
    skills: ['STAAD Pro analysis', 'Wind/Seismic Load', 'Concrete Design'],
  },
  {
    id: 'certificate-sketchup',
    title: 'Certificate In SketchUp',
    category: 'certifications',
    description: 'Fast 3D architectural modeling, warehouse library, and layouts.',
    duration: '60 Hours',
    level: 'Beginner',
    skills: ['SketchUp 3D', 'Vray rendering', 'Extensions'],
  },
  {
    id: 'certificate-lumion',
    title: 'Certificate In Lumion',
    category: 'certifications',
    description: 'Create high-definition visual walkthroughs, nature assets, and animations.',
    duration: '40 Hours',
    level: 'Beginner',
    skills: ['Lumion Walkthrough', 'Materials', 'Lighting'],
  },
  {
    id: 'certificate-3ds-max',
    title: 'Certificate In 3ds Max',
    category: 'certifications',
    description: 'Advanced interior visualization, polygonal modeling, and texture maps.',
    duration: '80 Hours',
    level: 'Intermediate',
    skills: ['3ds Max 3D', 'Polygonal Modeling', 'Materials'],
  },
  {
    id: 'certificate-v-ray',
    title: 'Certificate In V-Ray',
    category: 'certifications',
    description: 'Render photo-realistic architectural scenes, global illumination, and lights.',
    duration: '40 Hours',
    level: 'Intermediate',
    skills: ['V-Ray Render', 'Lighting config', 'HDRI Maps'],
  },
  {
    id: 'certificate-etabs',
    title: 'Certificate In ETABS',
    category: 'certifications',
    description: 'Analysis and design of multi-story building structures and shear walls.',
    duration: '80 Hours',
    level: 'Advanced',
    skills: ['ETABS design', 'Shear Wall', 'Seismic analysis'],
  },
  {
    id: 'certificate-autocad-architecture',
    title: 'Certificate In AutoCAD Architecture',
    category: 'certifications',
    description: 'Architectural drafting automation, symbols, doors, and schedule tables.',
    duration: '80 Hours',
    level: 'Beginner',
    skills: ['AutoCAD Arch', 'Auto Schedules', 'Wall symbols'],
  },
  {
    id: 'certificate-course-autocad',
    title: 'Certificate Course On AutoCAD',
    category: 'certifications',
    description: 'Comprehensive introduction to standard 2D drafting and plotting tools.',
    duration: '80 Hours',
    level: 'Beginner',
    skills: ['AutoCAD 2D', 'Layers', 'Dimensions', 'Layouts'],
  },
  {
    id: 'certificate-course-autocad-electrical',
    title: 'Certificate Course On AutoCAD Electrical',
    category: 'certifications',
    description: 'Draw wire diagrams, terminal blocks, PLC modules, and report lists.',
    duration: '80 Hours',
    level: 'Intermediate',
    skills: ['Wire numbering', 'PLC Layouts', 'Report Gen'],
  },
  {
    id: 'certificate-course-revit-structure',
    title: 'Certificate Course On Revit Structure',
    category: 'certifications',
    description: 'Develop concrete reinforcement models, steel trusses, and structural detailing.',
    duration: '80 Hours',
    level: 'Intermediate',
    skills: ['Revit Struct', 'Rebars', 'Steel Detailing'],
  },
  {
    id: 'certificate-course-revit-mep',
    title: 'Certificate Course On Revit MEP',
    category: 'certifications',
    description: 'Model HVAC ducts, electrical conduits, pipe routing, and load calculations.',
    duration: '80 Hours',
    level: 'Intermediate',
    skills: ['HVAC modeling', 'Electrical conduit', 'Piping'],
  },
  {
    id: 'certificate-course-navisworks',
    title: 'Certificate Course On Navisworks',
    category: 'certifications',
    description: 'Perform model coordination, clash detection testing, and 4D timelines.',
    duration: '40 Hours',
    level: 'Intermediate',
    skills: ['Clash Detection', '4D Timeline', 'Report compile'],
  },
  {
    id: 'certificate-course-gdt',
    title: 'Certificate Course On GD&T',
    category: 'certifications',
    description: 'Learn Geometric Dimensioning and Tolerancing standards (ASME Y14.5).',
    duration: '40 Hours',
    level: 'Intermediate',
    skills: ['GD&T symbols', 'Tolerance Stack', 'ASME codes'],
  },
  {
    id: 'certificate-industrial-drafting-mechanical',
    title: 'Certificate In Industrial Drafting For Mechanical',
    category: 'certifications',
    description: 'Draft workshop fabrication drawings, tolerance standards, and sheet setups.',
    duration: '80 Hours',
    level: 'Intermediate',
    skills: ['Fabrication drawings', 'Sheet setup', 'Tolerance fit'],
  },
  {
    id: 'certificate-industrial-drafting-civil',
    title: 'Certificate In Industrial Drafting For Civil',
    category: 'certifications',
    description: 'Draft structural detailing sheets, concrete layout plans, and site schedules.',
    duration: '80 Hours',
    level: 'Intermediate',
    skills: ['Civil drafting', 'Structural layouts', 'Schedules'],
  },
];

export interface DetailedInfo {
  title: string;
  description: string;
  duration: string;
  venue: string;
  mode: string;
  jobsTitle: string;
  jobs: string[];
  scopeTitle: string;
  scopeText: string;
  trainingTitle: string;
  trainingItems: string[];
  idealTitle: string;
  idealItems: string[];
  salaryText: string;
  salaryChart: { label: string; value: number; color: string }[];
}

export const getCourseDetails = (course: Course): DetailedInfo => {
  const isBIM = course.title.includes('BIM') || course.title.includes('Revit') || course.title.includes('Navisworks') || course.title.includes('Building Information');
  const isMech = course.title.includes('Mechanical') || course.title.includes('Product') || course.title.includes('Solidworks') || course.title.includes('CATIA') || course.title.includes('ANSYS') || course.title.includes('Creo') || course.title.includes('Nx') || course.title.includes('GD&T');
  const isElec = course.title.includes('Electrical');
  
  let jobs: string[] = [];
  let scopeText = '';
  let trainingItems: string[] = [];
  let idealItems: string[] = [];
  let salaryChart = [
    { label: 'Freshers', value: 3.5, color: '#93C5FD' },
    { label: '1-3 Years Exp', value: 5.2, color: '#3B82F6' },
    { label: '3-5 Years Exp', value: 8.5, color: '#1D4ED8' },
    { label: '5+ Years Exp', value: 12.0, color: '#1E3A8A' }
  ];

  if (isMech) {
    jobs = [
      'Product Design Engineer',
      'Mechanical Designer/Drafter',
      'CAD/CAM Engineer',
      'Design Consultant/Freelancer',
      'Tooling Engineer',
      'Automation Engineer',
      'Drafting and Design Instructor',
      'Project Manager (Mechanical Design)',
      'BIM Coordinator/Manager (Mechanical)'
    ];
    scopeText = `${course.title} is a specialized technical curriculum that is tailored for mechanical design, stress testing, and workshop drafting. It includes features specifically designed to streamline the process of creating mechanical drawings, including tools for parts libraries, automation of standard engineering tasks, and specialized drafting features. This program is ideal for professionals working in the fields of manufacturing, tooling, and mechanical engineering, as it enhances productivity and accuracy in product R&D. To gain expertise, students work on real-world projects simulating industrial engineering cycles, establishing readiness for top core job roles.`;
    trainingItems = [
      'Mechanical Design Principles',
      'Automation of Drafts',
      'Industry Drafting Standards',
      '3D Modeling Integration',
      'Custom Parts Libraries',
      'Engineering Documentation'
    ];
    idealItems = [
      'Custom Equipment and Machinery',
      'Industrial Equipment Design',
      'Engineering Drafting',
      'Construction and Infrastructure',
      'Tool and Die Design',
      'Product Design and Development',
      'Aerospace and Automotive Industries'
    ];
    salaryChart = [
      { label: 'Freshers', value: 3.8, color: '#93C5FD' },
      { label: '1-3 Years Exp', value: 5.6, color: '#3B82F6' },
      { label: '3-5 Years Exp', value: 8.8, color: '#1D4ED8' },
      { label: '5+ Years Exp', value: 13.0, color: '#1E3A8A' }
    ];
  } else if (isBIM) {
    jobs = [
      'BIM Modeler (Architecture/Structure/MEP)',
      'BIM Coordinator',
      'Revit Modeler & Detailer',
      'BIM Project Manager',
      'Clash Detection Engineer',
      'Virtual Design & Construction (VDC) Specialist',
      'Architectural Coordinator',
      'Structural BIM Engineer',
      'Laser Scan-to-BIM Coordinator'
    ];
    scopeText = `${course.title} delivers a comprehensive masterclass in Building Information Modeling processes. Rather than simple 2D drawing, BIM focuses on generating intelligent 3D building models where structural, architectural, and mechanical pipelines coordinate inside a single environment. This program trains students in modern construction coordination, conflict resolution, cost estimating (5D), and clash reports. Crucial for massive scale commercial and infrastructure projects, this training enables engineers to step into high-paying global consulting assignments.`;
    trainingItems = [
      'BIM Collaborative Worksharing',
      'Clash Detection & Resolution',
      '4D Construction Sequencing',
      'Quantities Takeoff (5D)',
      'Parametric Family Creation',
      'LOD (Level of Detail) Standards'
    ];
    idealItems = [
      'Commercial Building Construction',
      'Infrastructure & Bridge Modeling',
      'HVAC & MEP Services Routing',
      'Structural Detail Drafting',
      'Virtual Design Coordination',
      'Real Estate Architecture Planning',
      'Global Construction Consultancy'
    ];
    salaryChart = [
      { label: 'Freshers', value: 4.2, color: '#93C5FD' },
      { label: '1-3 Years Exp', value: 6.5, color: '#3B82F6' },
      { label: '3-5 Years Exp', value: 10.5, color: '#1D4ED8' },
      { label: '5+ Years Exp', value: 16.0, color: '#1E3A8A' }
    ];
  } else if (isElec) {
    jobs = [
      'Electrical CAD Designer',
      'Control Panel Board Designer',
      'Substation Design Engineer',
      'Electrical Systems Drafter',
      'PLC Panel Draftsman',
      'Industrial Automation Consultant',
      'Estimation and Costing Engineer',
      'Project Engineer (Electrical Design)'
    ];
    scopeText = `${course.title} focuses on the systematic drawing and planning of electrical systems for industrial buildings and automated manufacturing units. Students learn wire numbering rules, control panel layouts, schematic wiring generation, PLC terminal connections, and bill of materials (BOM) creation. Crucial for heavy electronics, manufacturing lines, and construction sectors, this certification gives electrical designers structural blueprints and calculation skills needed for industrial site deployments.`;
    trainingItems = [
      'Control Panel Board Layouts',
      'Schematic Wiring Generation',
      'PLC I/O Draw & Assigns',
      'Automated Wire Numbering',
      'Bill of Materials Generation',
      'Industrial Wiring Regulations'
    ];
    idealItems = [
      'Automated Assembly Factories',
      'Power Substation Planning',
      'Control Panel Panelboard Design',
      'Commercial Building Wiring',
      'Industrial Automation Lines',
      'Equipment Electrical Mockups'
    ];
    salaryChart = [
      { label: 'Freshers', value: 3.6, color: '#93C5FD' },
      { label: '1-3 Years Exp', value: 5.0, color: '#3B82F6' },
      { label: '3-5 Years Exp', value: 8.0, color: '#1D4ED8' },
      { label: '5+ Years Exp', value: 12.0, color: '#1E3A8A' }
    ];
  } else {
    // Default / Civil / Architecture / Interior
    jobs = [
      'Architectural Visualizer',
      'Interior Designer / Space Planner',
      'Structural Detail Drafter',
      'Civil CAD Engineer',
      '3D Rendering Specialist',
      'Design Consultant / Planner',
      'Land Planning AutoCAD Officer',
      'Urban Infrastructure Drafter',
      'Project Manager (Civil Design)'
    ];
    scopeText = `${course.title} is designed to equip structural design engineers, architects, and interior designers with high-end spatial layout drafting, visual rendering, and load testing tools. The course workflow covers precision 2D plan drafting, coordinate setups, photo-realistic material lighting setups, walkthrough frames, and building load checks using top industry engines. Perfect for construction offices, interior consultancies, and civil design bureaus.`;
    trainingItems = [
      'Precision Architectural Plans',
      'Photo-Realistic Walkthroughs',
      'Building Load Analysis',
      '3D Polygonal Space Layouts',
      'Lighting and Texturing setups',
      'Structural Detail Blueprints'
    ];
    idealItems = [
      'Residential House Drafting',
      'Commercial Space Interiors',
      'Urban Infrastructure Systems',
      'Structural Loading Analysis',
      'BIM Construction Integration',
      'Real Estate Presentation graphics'
    ];
    salaryChart = [
      { label: 'Freshers', value: 3.5, color: '#93C5FD' },
      { label: '1-3 Years Exp', value: 5.2, color: '#3B82F6' },
      { label: '3-5 Years Exp', value: 8.2, color: '#1D4ED8' },
      { label: '5+ Years Exp', value: 12.5, color: '#1E3A8A' }
    ];
  }

  return {
    title: course.title,
    description: course.description,
    duration: course.duration,
    venue: 'Online / Offline (Hybrid Available)',
    mode: 'Part Time / Full Time Programs',
    jobsTitle: 'Job Opportunities',
    jobs,
    scopeTitle: 'Scope of Work',
    scopeText,
    trainingTitle: 'Key Training Programs',
    trainingItems,
    idealTitle: `This ${course.title} Course is Ideal for:`,
    idealItems,
    salaryText: `Average ${course.title} Salary in India:`,
    salaryChart
  };
};
