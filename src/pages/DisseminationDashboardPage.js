import React, { useState } from 'react';
import '../styles/pages/DisseminationDashboardPage.css';

const DisseminationDashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 10;

  // Repository data - Tanzania Journals categorized by University
  const repositoryData = [
    {
      id: 1,
      issn: 'P0856-0056/E1821-889X',
      title: 'THE AFRICAN REVIEW: A Journal of African Politics, Development and International Affairs',
      publisher: 'UDSM & BRILL',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/ar/index',
      language: 'English',
      indexed: 'Scopus',
      university: 'UDSM'
    },
    {
      id: 2,
      issn: '2546-213X/0856-2253',
      title: 'Business Management Review',
      publisher: 'UDSM & Elsevier through Digital Commons',
      mode: 'Online',
      frequency: 'Semi-annually',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/bmr/index',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 3,
      issn: '0016-738X',
      title: 'Journal of the Geographical Association of Tanzania',
      publisher: 'UDSM',
      mode: 'Online',
      frequency: 'Semi-annually',
      subject: 'Natural Sciences',
      url: 'http://journals.udsm.ac.tz/index.php/jgat/index',
      language: 'English',
      indexed: 'AJOL & Google Scholar',
      university: 'UDSM'
    },
    {
      id: 4,
      issn: '0856-9965',
      title: 'Journal of Linguistics and Language in Education',
      publisher: 'UDSM',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/jlle/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'UDSM'
    },
    {
      id: 5,
      issn: '0856-1818/E2953-2515',
      title: 'University of Dar es Salaam Library Journal',
      publisher: 'UDSM',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/lj/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'UDSM'
    },
    {
      id: 6,
      issn: 'P0856-0129/E2546-2202',
      title: 'Mulika Journal',
      publisher: 'UDSM',
      mode: 'Print/Online',
      frequency: 'Annually',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/mj/index',
      language: 'Kiswahili',
      indexed: 'AJOL',
      university: 'UDSM'
    },
    {
      id: 7,
      issn: 'P 085609X/E2683-6408',
      title: 'Utafiti Journal',
      publisher: 'UDSM & BRILL',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social science',
      url: 'http://journals.udsm.ac.tz/index.php',
      language: 'Kiswahili',
      indexed: 'Scopus',
      university: 'UDSM'
    },
    {
      id: 8,
      issn: '0378-2093',
      title: 'Nyerere Law Journal',
      publisher: 'UDSM',
      mode: 'Print',
      frequency: 'Biannual',
      subject: 'Law',
      url: '',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 9,
      issn: '0856-0226',
      title: 'Tanzania Journal of Population Studies and Development',
      publisher: 'UDSM',
      mode: 'Print & Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/tjpsd/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'UDSM'
    },
    {
      id: 10,
      issn: '1821-4110',
      title: 'Papers in Education and Development',
      publisher: 'UDSM & BRILL',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/ped/index',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 11,
      issn: '',
      title: 'Umma Journal of Contemporary Literature and Creative Arts',
      publisher: 'UDSM',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: '',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 12,
      issn: '',
      title: 'The Journal of ICT Systems (JICTS)',
      publisher: 'UDSM',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Engineering and Technology',
      url: '',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 13,
      issn: '',
      title: 'Pan African Journal of Business Management (PAJBM)',
      publisher: 'UDSM',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Business and Management',
      url: '',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 14,
      issn: '1821-4110',
      title: 'African Journal of Economic Review',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.out.ac.tz/index.php/ajer',
      language: 'English',
      indexed: 'AJOL',
      university: 'OUT'
    },
    {
      id: 15,
      issn: '1821-4110',
      title: 'Tanzania Journal of Science and Technology',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Annually',
      subject: 'Engineering and Technology',
      url: 'https://journals.out.ac.tz/index.php/tjst',
      language: 'English',
      indexed: '',
      university: 'OUT'
    },
    {
      id: 16,
      issn: '1821-4110',
      title: 'Huria Journal',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.out.ac.tz/index.php/huria',
      language: 'English',
      indexed: 'AJOL',
      university: 'OUT'
    },
    {
      id: 17,
      issn: '1821-4110',
      title: 'The Journal of Issues and Practice in Education (JIPE)',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.out.ac.tz/index.php/jipe',
      language: 'English',
      indexed: '',
      university: 'OUT'
    },
    {
      id: 18,
      issn: '1821-4110',
      title: 'African Journal of Law and Practice (AJLP)',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Quarterly',
      subject: 'Law',
      url: 'https://journals.out.ac.tz/index.php/ajlp',
      language: 'English',
      indexed: '',
      university: 'OUT'
    },
    {
      id: 19,
      issn: '1821-4110',
      title: 'The African Resources and Development Journal (ARDJ)',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.out.ac.tz/index.php/ardj',
      language: 'English',
      indexed: '',
      university: 'OUT'
    },
    {
      id: 20,
      issn: '',
      title: 'Contemporary Journal of Linguistics and Literary Studies (CJLLS)',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: '',
      subject: 'Social Science',
      url: '',
      language: 'English',
      indexed: '',
      university: 'OUT'
    },
    {
      id: 21,
      issn: '0856-0501',
      title: 'Journal of Building and Land Development (JBLD)',
      publisher: 'ARU',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Natural Sciences',
      url: 'https://journals.aru.ac.tz/index.php/JBLD/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'ARU'
    },
    {
      id: 22,
      issn: '',
      title: 'Journal of Human Settlements and Environmental Management (JHSEM)',
      publisher: 'ARU',
      mode: 'Online',
      frequency: '',
      subject: 'Natural Sciences',
      url: '',
      language: '',
      indexed: '',
      university: 'ARU'
    },
    {
      id: 23,
      issn: '3088-5418',
      title: 'The Journal of Business and Socioeconomics Development (JBSED)',
      publisher: 'ARU',
      mode: 'Online',
      frequency: '',
      subject: 'Business',
      url: '',
      language: '',
      indexed: '',
      university: 'ARU'
    },
    {
      id: 24,
      issn: 'E2507-7716 P0856-0501',
      title: 'Journal of Land Administration in Eastern Africa (JLAEA)',
      publisher: 'ARU',
      mode: 'Online/Print',
      frequency: 'Biannual',
      subject: 'Natural Sciences',
      url: 'http://journals.aru.ac.tz/index.php/JLAEA/index',
      language: 'English',
      indexed: '',
      university: 'ARU'
    },
    {
      id: 25,
      issn: '0856-1451 / E 2714-206X',
      title: 'Tanzania Veterinary Journal',
      publisher: 'SUA',
      mode: 'Online/Print',
      frequency: 'Biannual',
      subject: 'Agricultural Sciences',
      url: 'https://tvj.sua.ac.tz/vet1/',
      language: 'English',
      indexed: 'Google Scholar, EBSCO, CABI, AJOL, CrossRef & AIM',
      university: 'SUA'
    },
    {
      id: 26,
      issn: '1821-9144 / E 0856-664X',
      title: 'Tanzania Journal of Agricultural Science (TAJAS)',
      publisher: 'SUA',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Agricultural Sciences',
      url: 'https://www.ajol.info/index.php/tjags/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'SUA'
    },
    {
      id: 27,
      issn: '',
      title: 'The East African Journal of Social Science and Humanities (EAJSSH)',
      publisher: 'SUA',
      mode: '',
      frequency: '',
      subject: 'Social Science and Humanities',
      url: '',
      language: '',
      indexed: '',
      university: 'SUA'
    },
    {
      id: 28,
      issn: '0856-4094',
      title: 'Journal of Continuing Education and Extension',
      publisher: 'SUA',
      mode: 'Print',
      frequency: '',
      subject: 'Social Science',
      url: '',
      language: 'English',
      indexed: '',
      university: 'SUA'
    },
    {
      id: 29,
      issn: '2408-8137',
      title: 'Tanzania Journal of Forestry and Nature Conservation',
      publisher: 'SUA',
      mode: 'Print',
      frequency: 'Biannual',
      subject: 'Natural Sciences',
      url: 'https://www.ajol.info/index.php/tjfnc/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'SUA'
    },
    {
      id: 30,
      issn: 'E 2773-6504 / 2773-6512',
      title: 'Journal of African Law and Contemporary Legal Issues (JALCLI)',
      publisher: 'UDOM',
      mode: 'Online & Print',
      frequency: 'Annually',
      subject: 'Social Science',
      url: 'https://journals.udom.ac.tz/index.php/jalcli',
      language: 'English',
      indexed: 'CROSSREF, SHOLARONE, OPEN ACCESS',
      university: 'UDOM'
    },
    {
      id: 31,
      issn: 'E 2714-1969 / 2714-1969',
      title: 'Nuru ya Kiswahili',
      publisher: 'UDOM',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.udom.ac.tz/index.php/nuru',
      language: 'Kiswahili',
      indexed: 'CROSSREF, SHOLARONE, OPEN ACCESS',
      university: 'UDOM'
    },
    {
      id: 32,
      issn: 'E 2799-2047 / 2799-2055',
      title: 'African Business Management Journal (ABMJ)',
      publisher: 'UDOM',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Business and Management',
      url: 'https://journals.udom.ac.tz/index.php/abmj',
      language: 'English',
      indexed: 'CROSSREF, SHOLARONE, OPEN ACCESS',
      university: 'UDOM'
    },
    {
      id: 33,
      issn: 'E 2773-6539/2773-6520',
      title: 'The Journal of African Economic Perspectives (JAEP)',
      publisher: 'UDOM',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.udom.ac.tz/index.php/jaep',
      language: 'English',
      indexed: 'CROSSREF, SHOLARONE, OPEN ACCESS',
      university: 'UDOM'
    },
    {
      id: 34,
      issn: 'E 2773-6695/ 2773-6687',
      title: 'The Journal of Management and Policy Issues in Education (JMPIE)',
      publisher: 'UDOM',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.udom.ac.tz/index.php/jmpi',
      language: 'English',
      indexed: 'CROSSREF, SHOLARONE, OPEN ACCESS',
      university: 'UDOM'
    },
    {
      id: 35,
      issn: 'E 2738-9170/2738-9162',
      title: 'Journal of African Politics (JAP)',
      publisher: 'UDOM',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.udom.ac.tz/index.php/jap',
      language: 'English',
      indexed: 'CROSSREF, SHOLARONE, OPEN ACCESS',
      university: 'UDOM'
    },
    {
      id: 36,
      issn: 'P0856-1435/ E2619-8665',
      title: 'Uongozi Journal of Management and Development Dynamics',
      publisher: 'Mzumbe University',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: '',
      language: 'English',
      indexed: 'INDEX COPERNICUS, CROSSREF, AJOL',
      university: 'Mzumbe'
    },
    {
      id: 37,
      issn: 'E 2820-2619/2820-2627',
      title: 'Journal of Contemporary African Legal Studies (JCALS)',
      publisher: 'Mzumbe University',
      mode: 'Online & Print',
      frequency: 'Annually',
      subject: 'Social Science',
      url: 'https://jcals.mzumbe.ac.tz/index.php/cals',
      language: 'English',
      indexed: '',
      university: 'Mzumbe'
    },
    {
      id: 38,
      issn: 'E 2619-8940/2619-8940',
      title: 'The Journal of Policy and Leadership (JPL)',
      publisher: 'Mzumbe University',
      mode: 'Print & Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://41.59.85.82/index.php/jpl',
      language: 'English',
      indexed: '',
      university: 'Mzumbe'
    },
    {
      id: 39,
      issn: 'E 2953-2663/2591-6769',
      title: 'East African Journal of Applied Health Monitoring and Evaluation',
      publisher: 'Mzumbe University',
      mode: 'Print & Online',
      frequency: 'Biannual',
      subject: 'Medical and Health Sciences',
      url: 'https://eajahme.mzumbe.ac.tz/index.php/eajahme/index',
      language: 'English',
      indexed: 'AJOL, Google Scholar',
      university: 'Mzumbe'
    },
    {
      id: 40,
      issn: '0856-8960',
      title: 'East African Journal of Public Health',
      publisher: 'MUHAS',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Medical and Health Sciences',
      url: 'https://journal.muhas.ac.tz/index.php/ejph/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'MUHAS'
    },
    {
      id: 41,
      issn: '0856-0714',
      title: 'Tanzania Medical Journal',
      publisher: 'MUHAS',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Medical and Health Sciences',
      url: 'https://tmj.or.tz/index.php/tmj',
      language: 'English',
      indexed: 'AJOL',
      university: 'MUHAS'
    },
    {
      id: 42,
      issn: '0856-0625',
      title: 'Tanzania Dental Journal',
      publisher: 'Muhimbili University of Health and Allied Sciences',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Medical and Health Sciences',
      url: 'https://www.ajol.info/index.php/tdj/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'MUHAS'
    },
    {
      id: 43,
      issn: '0856-7212',
      title: 'Dar es Salaam Medical Students\' Journal',
      publisher: 'Tanzania Medical Students\' Association (TAMSA)',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Medical and Health Sciences',
      url: 'https://www.ajol.info/index.php/dmsj/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'TAMSA'
    },
    {
      id: 44,
      issn: '2799-2144 / E 2779-2152',
      title: 'Journal of Applied Marketing Science (JOAMS)',
      publisher: 'TMSA',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://joams.tmsa.or.tz/',
      language: 'English',
      indexed: 'AJOL',
      university: 'TMSA'
    },
    {
      id: 45,
      issn: 'E 2773-675X / 2773-6725',
      title: 'Tanzania Journal of Community Development (TAJOCODE)',
      publisher: 'CODEPATA',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://www.ajol.info/index.php/tajocode',
      language: 'English',
      indexed: 'AJOL',
      university: 'CODEPATA'
    },
    {
      id: 46,
      issn: 'E 2683-6416 / 0856-860X',
      title: 'The Western Indian Ocean Journal of Marine Science (WIOJMS)',
      publisher: 'WIOMSA',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Natural Sciences',
      url: 'https://www.ajol.info/index.php/wiojms',
      language: 'English',
      indexed: 'AJOL',
      university: 'WIOMSA'
    },
    {
      id: 47,
      issn: '',
      title: 'Teku Journal of Interdisciplinary Studies (TJIS)',
      publisher: 'TEKU',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Multidisciplinary',
      url: '',
      language: 'English',
      indexed: '',
      university: 'TEKU'
    },
    {
      id: 48,
      issn: '1821-9349 / E2961-6239',
      title: 'Journal of Logistics, Management and Engineering Sciences (JLMES)',
      publisher: 'NIT',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Engineering and Technology',
      url: 'https://jlmes.nit.ac.tz/Site',
      language: 'English',
      indexed: '',
      university: 'IRDP'
    },
    {
      id: 49,
      issn: '0856-3460 / E 2507-7848',
      title: 'The Rural Planning Journal (RPJ)',
      publisher: 'IRDP',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.irdp.ac.tz/index.php/rpj/index',
      language: 'English',
      indexed: 'CROSSREF & AJOL',
      university: 'IRDP'
    },
    {
      id: 50,
      issn: 'E 2953-254X / 2714-1993',
      title: 'The Journal of Informatics (TJI)',
      publisher: 'IAA',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.iaa.ac.tz/index.php/tji/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'IAA'
    },
    {
      id: 51,
      issn: '',
      title: 'The Journal of Humanities and Social Science Review and Practice (JHSSRP)',
      publisher: 'IAA',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science and Humanities',
      url: 'https://journals.iaa.ac.tz/index.php/jhssrp',
      language: 'English',
      indexed: '',
      university: 'IAA'
    },
    {
      id: 52,
      issn: '',
      title: 'The Journal of Governance and Security Studies (JGSS)',
      publisher: 'IAA',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.iaa.ac.tz/index.php/JGSS/index',
      language: 'English',
      indexed: '',
      university: 'IAA'
    },
    {
      id: 53,
      issn: '',
      title: 'The Accountancy and Business Review',
      publisher: 'IAA',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Business and Management',
      url: 'https://journals.iaa.ac.tz/index.php/abr/index',
      language: 'English',
      indexed: '',
      university: 'IAA'
    },
    {
      id: 54,
      issn: '2665-0517 / 2665-0507',
      title: 'The African Journal of Customs and Fiscal Studies (AJCFS)',
      publisher: 'ITA',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Business and Management',
      url: 'https://journal.ita.ac.tz/index.php/tra/index',
      language: 'English',
      indexed: '',
      university: 'ITA'
    },
    {
      id: 55,
      issn: '2683-6475 / E 2683-6467',
      title: 'Journal of Research and Development (MJRD)',
      publisher: 'MUST',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://mjrd.must.ac.tz/index.php/mjrd',
      language: 'English',
      indexed: 'DOAJ, AJOL, CABI, AGRIS and EBSCO',
      university: 'MUST'
    },
    {
      id: 56,
      issn: '1821-8369',
      title: 'Mwenge Journal of Academic Studies (MJAS)',
      publisher: 'MWECAU',
      mode: 'Online',
      frequency: 'Annually',
      subject: 'Social Science',
      url: '',
      language: 'English',
      indexed: '',
      university: 'MWECAU'
    },
    {
      id: 57,
      issn: '2683-6440 / E 2683-6432',
      title: 'Jarida la Mnyampala',
      publisher: 'SJUT',
      mode: 'Online & Print',
      frequency: 'Annually',
      subject: 'Social Science',
      url: 'https://journals.sjut.ac.tz/index.php/mnyampala/index',
      language: 'Kiswahili',
      indexed: 'AJOL',
      university: 'SJUT'
    },
    {
      id: 58,
      issn: '',
      title: 'Journal of Maritime Science and Technology',
      publisher: 'DMI',
      mode: 'Online',
      frequency: 'Annually',
      subject: 'Natural Sciences',
      url: 'https://journal.dmi.ac.tz/index.php/1DMI1/index',
      language: 'English',
      indexed: '',
      university: 'DMI'
    },
    {
      id: 59,
      issn: '2467-4680',
      title: 'Institute of Judiciary and Administration Lushoto Journal',
      publisher: 'IJA',
      mode: 'Online',
      frequency: '',
      subject: 'Law',
      url: '',
      language: 'English',
      indexed: '',
      university: 'IJA'
    },
    {
      id: 60,
      issn: '0856-1109',
      title: 'Journal of Adult Education Tanzania',
      publisher: 'IAE',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://jaet.iae.ac.tz/index.php/adulteducation/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'IAE'
    },
    {
      id: 61,
      issn: '2467-4672',
      title: 'LST Law Review Journal',
      publisher: 'Law School of Tanzania',
      mode: 'Print',
      frequency: '',
      subject: 'Law',
      url: '',
      language: 'English',
      indexed: '',
      university: 'LST'
    },
    {
      id: 62,
      issn: '2773-6598 / E 2773-658X',
      title: 'International Diplomatic Review Journal',
      publisher: 'CFR',
      mode: 'Online & Print',
      frequency: '',
      subject: 'Social Science',
      url: 'https://www.ajol.info/index.php/idrj',
      language: 'English',
      indexed: 'AJOL',
      university: 'CFR'
    },
    {
      id: 63,
      issn: 'P2507-7945 / E2507-79945',
      title: 'Ruaha Journal of Business Economics and Management Science (RJBEMS)',
      publisher: 'RUCU',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Business and Management',
      url: 'https://www.rucu.ac.tz/index.php/journals.html',
      language: 'English',
      indexed: '',
      university: 'RUCU'
    },
    {
      id: 64,
      issn: '2820-2724',
      title: 'Ruaha Catholic University Journal of Education and Development (RUCUJED)',
      publisher: 'RUCU',
      mode: 'Online',
      frequency: '',
      subject: 'Social Science',
      url: 'https://rucu.ac.tz/journals/pub/?journal=RUCUJED',
      language: 'English',
      indexed: '',
      university: 'RUCU'
    },
    {
      id: 65,
      issn: '2799-2187',
      title: 'Jarida la Fahari ya Kiswahili (JAFAKI)',
      publisher: 'RUCU',
      mode: 'Online',
      frequency: '',
      subject: 'Social Science',
      url: 'https://rucu.ac.tz/journals/pub/?journal=JAFAKI',
      language: 'Kiswahili',
      indexed: '',
      university: 'RUCU'
    },
    {
      id: 66,
      issn: '2453-6016',
      title: 'Ruaha Journal of Arts and Social Science (RUJASS)',
      publisher: 'RUCU',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://www.rucu.ac.tz/index.php/journals.html',
      language: 'English',
      indexed: '',
      university: 'RUCU'
    },
    {
      id: 67,
      issn: '2507-7939',
      title: 'Ruaha Law Review (RLR)',
      publisher: 'RUCU',
      mode: 'Online',
      frequency: 'Annually',
      subject: 'Social Science',
      url: '',
      language: 'English',
      indexed: '',
      university: 'RUCU'
    },
    {
      id: 68,
      issn: '0789-6580',
      title: 'The Law Reformer Journal',
      publisher: 'Law Reform Commission of Tanzania',
      mode: 'Print',
      frequency: '',
      subject: 'Law',
      url: '',
      language: 'English',
      indexed: '',
      university: 'LRCT'
    },
    {
      id: 69,
      issn: '2665-0789 / E 2591-7013',
      title: 'Jarida la Chama cha Lugha na Fasihi ya Kiswahili Tanzania',
      publisher: 'CHALUFAKITA',
      mode: 'Online & Print',
      frequency: 'Annually',
      subject: 'Social Science',
      url: 'https://www.ajol.info/index.php/jclfkt',
      language: 'Kiswahili',
      indexed: 'AJOL',
      university: 'CHALUFAKITA'
    },
    {
      id: 70,
      issn: '2799-2144 / E 2779-2152',
      title: 'Journal of Applied Marketing Science (JOAMS)',
      publisher: 'TMSA',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://joams.tmsa.or.tz/',
      language: 'English',
      indexed: 'AJOL',
      university: 'TMSA'
    },
    {
      id: 71,
      issn: 'E 2773-675X / 2773-6725',
      title: 'Tanzania Journal of Community Development (TAJOCODE)',
      publisher: 'CODEPATA',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://www.ajol.info/index.php/tajocode',
      language: 'English',
      indexed: 'AJOL',
      university: 'CODEPATA'
    },
    {
      id: 72,
      issn: 'E 2683-6416 / 0856-860X',
      title: 'The Western Indian Ocean Journal of Marine Science (WIOJMS)',
      publisher: 'WIOMSA',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Natural Sciences',
      url: 'https://www.ajol.info/index.php/wiojms',
      language: 'English',
      indexed: 'AJOL',
      university: 'WIOMSA'
    },
    {
      id: 73,
      issn: '',
      title: 'Teku Journal of Interdisciplinary Studies (TJIS)',
      publisher: 'TEKU',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Multidisciplinary',
      url: '',
      language: 'English',
      indexed: '',
      university: 'TEKU'
    }
  ];

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...repositoryData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn] || '';
    const bValue = b[sortColumn] || '';
    if (sortDirection === 'asc') {
      return String(aValue).localeCompare(String(bValue));
    } else {
      return String(bValue).localeCompare(String(aValue));
    }
  });

  const filteredData = sortedData.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="dissemination-dashboard-page">
      <div className="dissemination-dashboard-container">
        <div className="dissemination-dashboard-header">
          <a href="/dashboard" className="back-link">← Back to Dashboard</a>
          <h1 className="dissemination-dashboard-title">Dissemination Dashboard</h1>
          <p className="dissemination-dashboard-subtitle">
            Access and explore research repositories and knowledge databases
          </p>
        </div>

        <div className="dissemination-content">
          <div className="repository-table-container">
            <div className="repository-table-title">
              <h3>LIST OF TANZANIA JOURNALS</h3>
            </div>
            
            <div className="repository-search-container">
              <input
                type="text"
                className="repository-search-input"
                placeholder="Write here to filter repository records"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            
            <div className="repository-table-wrapper">
              <table className="repository-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('id')} className="sortable">
                      # {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('issn')} className="sortable">
                      ISSN {sortColumn === 'issn' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('title')} className="sortable">
                      TITLE OF PUBLICATION {sortColumn === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('publisher')} className="sortable">
                      PUBLISHER/ INSTITUTION {sortColumn === 'publisher' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('mode')} className="sortable">
                      MODE OF PUBLICATIONS {sortColumn === 'mode' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('frequency')} className="sortable">
                      PUBLICATION FREQUENCY {sortColumn === 'frequency' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('url')} className="sortable">
                      URL LINK {sortColumn === 'url' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('language')} className="sortable">
                      LANGUAGE OF PUBLICATIONS {sortColumn === 'language' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('indexed')} className="sortable">
                      INDEXED DATABASE {sortColumn === 'indexed' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('university')} className="sortable">
                      UNIVERSITY {sortColumn === 'university' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <tr key={item.id || index}>
                        <td>{startIndex + index + 1}</td>
                        <td>{item.issn || '-'}</td>
                        <td>{item.title || '-'}</td>
                        <td>{item.publisher || '-'}</td>
                        <td>{item.mode || '-'}</td>
                        <td>{item.frequency || '-'}</td>
                        <td>
                          {item.url ? (
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="url-link"
                            >
                              {item.url}
                            </a>
                          ) : '-'}
                        </td>
                        <td>{item.language || '-'}</td>
                        <td>{item.indexed || '-'}</td>
                        <td>{item.university || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="no-data">
                        No repository records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="repository-pagination">
              <div className="pagination-info">
                Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
              </div>
              <div className="pagination-controls">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisseminationDashboardPage;

