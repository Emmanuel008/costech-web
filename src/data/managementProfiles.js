export const directorGeneral = {
  slug: 'dr-amos-muhunda-nungu',
  name: 'Dr. Amos Muhunda Nungu',
  title: 'Director General',
  image: '/assets/img/dg.jpg',
  bio: "The Director General of COSTECH is the head of the institution and the Chairperson of the COSTECH Management and the Secretary to the COSTECH's Board of Commissioners (The Commission). Being the head of institution, the Director General oversees the works done in the Directorates of Research Coordination and Promotion; Center for Development and Transfer of Technology; Knowledge Management, and Corporate Services. He also oversees the works done in the Units of the National Funds for the Advancement of Science and Technology; Internal Audit, Procurement Management, and Legal.",
  responsibilities: [
    'To be the Secretary to the Commission',
    'To be responsible for the implementation of all decisions of the Commission and for carrying out all day-to-day activities of the Commission',
    'To keep under review the progress made in the attainment of the objectives and purposes of the enabling Act and to publish reports and provide information for the purpose of enhancing public awareness of such progress and of the problems and remedies that exist in relation to the development of Science, Technology and Innovation',
    'To promote, encourage, coordinate and carry out short term and long-term planning and projects in the development of science, technology and innovation',
  ],
};

export const directors = [
  {
    slug: 'mr-samson-mwela',
    name: 'Mr. Samson Mwela',
    title: 'Director of Knowledge Management',
    image: '/assets/img/mwela.jpg',
    bio: 'The Directorate of Knowledge Management (DKM) acquires, stores, processes and disseminates science, technology and innovation information to stakeholders and the public through its Documentation and Publication Section and the ICT Systems and Networking Section.',
    responsibilities: [
      'To acquire, process, store, analyze and disseminate scientific and technological information in the form of knowledge products',
      'To cooperate with national and international research and development institutions and data centers for sharing science, technology and innovation information',
      'To keep the scientific community and the general public informed about developments in science, technology and innovation through multiple communication channels',
      'To publish newsletters, journals, periodicals and other releases designed to promote interest in science, technology and innovation',
      'To monitor and provide technical guidance for the review of laws and advise on regulations that improve the ICT environment',
      'To establish and maintain relevant ICT systems that benefit COSTECH and the wider scientific community',
      'To organize meetings of the R&D Advisory Committees working on knowledge management and document their guidance',
      'To prepare STI documentaries and compile information on ongoing research activities, inventories of equipment and directories of personnel',
    ],
  },
  {
    slug: 'mr-imanuel-mgonja',
    name: 'Mr. Imanuel Mgonja',
    title: 'Director of Corporate Services',
    image: '/assets/img/mgonja.jpg',
    bio: 'The Directorate of Corporate Services (DCS) ensures COSTECH has the resources, systems and policies needed to provide quality services in science, technology and innovation. It covers Administration and Human Resources, Planning, Monitoring and Evaluation, and Finance and Accounts.',
    responsibilities: [
      "To implement human resource and financial policies, practices and procedures that support the Commission's strategy",
      'To lead, manage and develop Commission staff and ensure the efficient operation of Corporate Services',
      'To oversee the development of employee welfare programmes for staff retention and conditions of service',
      'To manage industrial relations and maintain a constructive working environment',
      'To plan, coordinate and direct administrative support policies and procedures',
      'To control financial, accounting and human resource activities and recommend improvements to related policies',
      'To coordinate preparation of recurrent and development budgets, final accounts and expenditure control',
      'To coordinate physical plans for the expansion of the Commission and initiate development projects',
    ],
  },
  {
    slug: 'dr-athuman-m-ngumia',
    name: 'Dr. Athuman M. Ngumia',
    title: 'Director, Centre for Development and Transfer of Technology',
    image: '/assets/img/mgumia.jpg',
    bio: 'The Centre for Development and Transfer of Technology (CDTT) develops and transfers technologies for use in Tanzania and beyond. It oversees Innovation Foresight and Emerging Technologies, Technology Acquisition and Development, and Technology Management and Transfer, and manages the Buni Innovation Hub and Dar es Salaam Digital Business Incubator (DTBi).',
    responsibilities: [
      'To maintain an inventory of innovations, inventions and adaptations and follow up on TASTA/MAKISATU awards',
      'To identify technological needs within national socio-economic contexts for utilization across the economy',
      'To liaise with local and foreign technology centres and research institutions to advance national technology development',
      'To promote research and innovation in new and renewable energy sources and manage related projects',
      'To advise on the development of endogenous and indigenous technologies',
      'To identify potential technology value-chain areas for development and upscaling',
      'To assess suitability of imported technology and innovation and support their adaptation',
      'To provide training for technical personnel in technology and innovation analysis and transfer',
      'To register technology transfer agreements and monitor their execution on a continuous basis',
    ],
  },
  {
    slug: 'dr-bugwesa-katale',
    name: 'Dr. Bugwesa Katale',
    title: 'Director of Research Coordination and Promotion',
    image: '/assets/img/katale.jpg',
    bio: 'The Directorate of Research Coordination and Promotion (DRCP) manages, coordinates and promotes research in Tanzania across Life, Physical and Social sciences, ensuring research outputs drive socio-economic development.',
    responsibilities: [
      'To formulate National Research Priorities',
      'To prepare short- and long-term plans and programmes for the promotion of scientific research in Life, Physical and Social Sciences',
      'To coordinate and promote scientific research in the fields of Life, Physical and Social Sciences',
      'To coordinate and facilitate the utilization of research results for socio-economic development',
      'To promote and coordinate cooperation in research between national and foreign research institutes',
      'To monitor and maintain an up-to-date inventory of scientific activities, equipment and directories of researchers',
      'To organize regular meetings of R&D Advisory Committees and implement their directives',
      'To formulate and prepare research project proposals for fundraising from donors and other sources',
      'To identify potential value-chain niches for research and development',
    ],
  },
];

export const managers = [
  {
    slug: 'cpa-ahmad-mwenyemanga',
    name: 'CPA. Ahmad Mwenyemanga',
    title: 'Internal Auditor Manager',
    image: '/assets/img/mwenyemanga.jpg',
  },
  {
    slug: 'dr-beatrice-lyimo',
    name: 'Dr. Beatrice Lyimo',
    title: 'NF-AST Manager',
    image: '/assets/img/lymo.jpg',
  },
  {
    slug: 'adv-philemon-msegu',
    name: 'Adv. Philemon Msegu',
    title: 'Legal Services Manager',
    image: '/assets/img/msegu.jpg',
  },
  {
    slug: 'mr-christopher-yesaya-mwakabungu',
    name: 'Mr. Christopher Yesaya Mwakabungu',
    title: 'Procurement Manager',
    image: '/assets/img/mwakabungu.jpg',
  },
];

export const getAllProfiles = () => {
  return [directorGeneral, ...directors, ...managers];
};

export const getProfileBySlug = (slug) => {
  const allProfiles = getAllProfiles();
  return allProfiles.find((profile) => profile.slug === slug);
};

