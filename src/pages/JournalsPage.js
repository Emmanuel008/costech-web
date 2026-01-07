import React, { useState } from 'react';
import '../styles/pages/JournalsPage.css';

const JournalsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 10;

  // Repository data - Tanzania Journals categorized by University
  const repositoryData = [
    // UNIVERSITY OF DAR ES SALAAM
    {
      id: 1,
      issn: 'P0856-0056 / E1821-889X',
      title: 'THE AFRICAN REVIEW : A Journal of African Politics, Development and International Affairs',
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
      issn: '2546-213X/  0856-2253',
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
      issn: '0856-1818 /  E2953 - 2515',
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
      frequency: 'Annualy',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/mj/index',
      language: 'Kiswahili',
      indexed: 'AJOL',
      university: 'UDSM'
    },
    {
      id: 7,
      issn: 'P 085609X / E 2683-6408',
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
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/nlj/index',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 9,
      issn: '1821-7567 /         E 2591 - 6947',
      title: 'Operations Research Society of Eastern Africa (ORSEA) Journal',
      publisher: 'UDSM',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Natural Sciences',
      url: 'http://journals.udsm.ac.tz/index.php/orsea/index',
      language: 'Engliush',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 10,
      issn: 'P0856-3373/ E2507-7740',
      title: 'Tanzania Economic Review [TER]',
      publisher: 'UDSM & Elsevier through Digital Commons',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/ter/index',
      language: 'English',
      indexed: 'EBSCO, RePEc, EcoPapers,  IDEAS and AJOL',
      university: 'UDSM'
    },
    {
      id: 11,
      issn: '2591-6831',
      title: 'Tanzania Journal of Development Studies',
      publisher: 'UDSM',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/tjds/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'UDSM'
    },
    {
      id: 12,
      issn: '1821-536X',
      title: 'Tanzania Journal of Engineering and Technology (TJET)',
      publisher: 'UDSM',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Engineering and Technology',
      url: 'http://journals.udsm.ac.tz/index.php/tjet/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'UDSM'
    },
    {
      id: 13,
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
      id: 14,
      issn: '0856-1761',
      title: 'Tanzania Journal of Science',
      publisher: 'UDSM & Elsevier through Digital Commons',
      mode: 'Online',
      frequency: 'Quarterly',
      subject: 'Natural Sciences',
      url: 'http://journals.udsm.ac.tz/index.php/tjs',
      language: 'English',
      indexed: 'African Journals OnLine (AJOL); CAB International or CABI (Centre for Agriculture and Bioscience International, UK); CAB Direct; CAB Abstracts; CAB Global Health; Google Scholar; Journals for Free (J4F) database',
      university: 'UDSM'
    },
    {
      id: 15,
      issn: '1821-9632 E 2591-6963',
      title: 'Tanzania Journal of Sociology (TJS)',
      publisher: 'UDSM & Elsevier through Digital Commons',
      mode: 'Online',
      frequency: 'Annualy',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/tjsociology/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'UDSM'
    },
    {
      id: 16,
      issn: '0856-6518',
      title: 'Tanzania Zamani: Journal of Historical Research and Writings',
      publisher: 'University of Dar es Salaam',
      mode: 'Print/Online',
      frequency: 'Bi-annually',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/tz/index',
      language: 'English',
      indexed: 'EBSCO',
      university: 'UDSM'
    },
    {
      id: 17,
      issn: '2507-7775',
      title: 'Sanaa Journal of African Art, Media and Culture',
      publisher: 'University of Dar es Salaam',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://sanaajournal.ac.tz/',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 18,
      issn: 'P0856-552X/  E2546-22`10',
      title: 'Kioo cha Lugha',
      publisher: 'UDSM',
      mode: 'Online/Print',
      frequency: 'Annualy',
      subject: 'Social Science',
      url: 'http://journals.udsm.ac.tz/index.php/kcl',
      language: 'Kiswahili',
      indexed: 'AJOL',
      university: 'UDSM'
    },
    {
      id: 19,
      issn: 'E2467-4745 / P1821-7427',
      title: 'Journal of Humanities and Social Science',
      publisher: 'UDSM & Elsevier through Digital Commons',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science and Humanities',
      url: 'http://jehs.duce.ac.tz/index.php/jehs/index/',
      language: 'English',
      indexed: 'AJOL',
      university: 'DUCE'
    },
    {
      id: 20,
      issn: 'P2453-6040/   E3057-3114',
      title: 'Mkwawa Journal of Education and Development (MJED)',
      publisher: 'Mkwawa University College of Education',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://mjed.muce.ac.tz/',
      language: 'English',
      indexed: '',
      university: 'MUCE'
    },
    {
      id: 21,
      issn: 'P 0856-048 / E 2546-2229',
      title: 'Kiswahili',
      publisher: 'UDSM',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://www.ajol.infksh/indexo/index.php/',
      language: 'Kiswahili',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 22,
      issn: '0012-8678',
      title: 'The Eastern African Law Review : A Journal of Law and Development',
      publisher: 'University of Dar es Salaam',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://www.sol.udsm.ac.tz/index.php/2018-05-12-17-29-30/the-eastern-africa-law-review-vol-42-2-published-2018-full-text',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 23,
      issn: '2961-6484 /         E 3108-8546',
      title: 'Zamani',
      publisher: 'UDSM & Elsevier through Digital Commons',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'doi.org/10.56279/ZJAHS1',
      language: 'English',
      indexed: 'Google Scholar, ScienceOpen, JSTOR and EBSCO',
      university: 'UDSM'
    },
    {
      id: 24,
      issn: '0856-4027 /        E 2665-0746',
      title: 'Papers in Education and Development',
      publisher: 'UDSM & BRILL',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://brill.com/view/journals/ped/ped-overview.xml',
      language: 'English',
      indexed: 'AJOL',
      university: 'UDSM'
    },
    {
      id: 25,
      issn: '0856-0854',
      title: 'Umma Journal of Contemporary Literature and Creative Arts',
      publisher: 'UDSM',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.udsm.ac.tz/index.php/umma',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 26,
      issn: '',
      title: 'Studies in the African Past : The Journal of African Perspective',
      publisher: 'UDSM',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.udsm.ac.tz/index.php/sap/index',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    {
      id: 27,
      issn: '2953 - 2590 / E 2953 - 2582',
      title: 'The Journal of ICT Systems (JICTS)',
      publisher: 'UDSM',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Engineering and Technology',
      url: 'https://jicts.udsm.ac.tz/index.php/udsm',
      language: 'English',
      indexed: '',
      university: 'UDSM'
    },
    // THE OPEN UNIVERSITY OF TANZANIA
    {
      id: 28,
      issn: 'P1821-9985 / E1821-9993',
      title: 'Pan African Journal of Business Management (PAJBM)',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.out.ac.tz/index.php/pajbm/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'OUT'
    },
    {
      id: 29,
      issn: '2453-5958',
      title: 'African Journal of Economic Review',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.out.ac.tz/index.php/ajer/index',
      language: 'English',
      indexed: 'Repec, EconPapers, AgEcon Search, EBSCO and AJOL',
      university: 'OUT'
    },
    {
      id: 30,
      issn: '2507-783X',
      title: 'Tanzania Journal of Science and Technology and',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Annually',
      subject: 'Engineering and Technology',
      url: 'https://journals.out.ac.tz/index.php/tjst/index',
      language: 'English',
      indexed: '',
      university: 'OUT'
    },
    {
      id: 31,
      issn: '0856-6739',
      title: 'Huria Journal',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.out.ac.tz/index.php/HURIA',
      language: 'English',
      indexed: 'AJOL',
      university: 'OUT'
    },
    {
      id: 32,
      issn: '1821-5548',
      title: 'The Journal of Issues and Practice in Education (JIPE)',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.out.ac.tz/index.php/JIPE/index',
      language: 'English',
      indexed: 'AJOL',
      university: 'OUT'
    },
    {
      id: 33,
      issn: '2683-6483',
      title: 'African Journal of Law and Practice (AJLP)',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Quarterly',
      subject: 'Law',
      url: 'https://journals.out.ac.tz/index.php/law/index',
      language: 'English',
      indexed: '',
      university: 'OUT'
    },
    {
      id: 34,
      issn: '1821-9373',
      title: 'The African Resources and Development Journal (ARDJ)',
      publisher: 'OUT',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.out.ac.tz/index.php/ARDJ/index',
      language: 'English',
      indexed: '',
      university: 'OUT'
    },
    {
      id: 35,
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
    // ARDHI UNIVERSITY
    {
      id: 36,
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
      id: 37,
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
      id: 38,
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
      id: 39,
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
    // SOKOINE UNIVERSITY OF AGRICULTURE
    {
      id: 40,
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
      id: 41,
      issn: '1821-9144 /         E 0856-664X',
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
      id: 42,
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
      id: 43,
      issn: '0856-4094,',
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
      id: 44,
      issn: '2408 – 8137',
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
    // UNIVERSITY OF DODOMA
    {
      id: 45,
      issn: 'E 2773-6504 / 2773-6512',
      title: 'Journal of African Law and Contemporary Legal Issues (JALCLI)',
      publisher: 'UDOM',
      mode: 'Online & Print',
      frequency: 'Annualy',
      subject: 'Social Science',
      url: 'https://journals.udom.ac.tz/index.php/jalcli',
      language: 'English',
      indexed: 'CROSSREF, SHOLARONE, OPEN ACCESS',
      university: 'UDOM'
    },
    {
      id: 46,
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
      id: 47,
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
      id: 48,
      issn: 'E 2773-6539 / 2773-6520',
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
      id: 49,
      issn: 'E 2773-6695/   2773-6687',
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
      id: 50,
      issn: 'E 2738-9170 / 2738-9162',
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
    // MZUMBE UNIVERSITY
    {
      id: 51,
      issn: 'P0856-1435/    E2619-8665',
      title: 'Uongozi Journal of Management and Development Dynamics',
      publisher: 'Mzumbe University',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'http://41.59.85.82/index.php/jpl',
      language: 'English',
      indexed: 'INDEX COPERNICUS, CROSSREF, AJOL',
      university: 'Mzumbe'
    },
    {
      id: 52,
      issn: 'E 2820-2619 / 2820-2627',
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
      id: 53,
      issn: 'E 2619-8940 / 2619-8940',
      title: 'The Journal of Policy and Leadership (JPL)',
      publisher: 'Mzumbe University',
      mode: 'Print & Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: '',
      language: 'English',
      indexed: '',
      university: 'Mzumbe'
    },
    {
      id: 54,
      issn: 'E 2953-2663 / 2591-6769',
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
    // MUHIMBILI UNIVERSITY OF HEALTH AND ALLIED SCIENCES
    {
      id: 55,
      issn: '0856 -8960',
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
      id: 56,
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
      id: 57,
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
    // TANZANIA MEDICAL STUDENTS ASSOCIATION
    {
      id: 58,
      issn: '0856-7212',
      title: 'Dar es Salaam Medical Students\' Journal',
      publisher: 'Tanzania Medical Students\' Association (TAMSA)',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Medical and Health Sciences',
      url: 'https://www.ajol.info/index.php/dmsj/index',
      language: 'English',
      indexed: '',
      university: 'TAMSA'
    },
    // MOSHI CO-OPERATIVE UNIVERSITY
    {
      id: 59,
      issn: '',
      title: 'The Journal of Co-operative and Business Studies (JCBS)',
      publisher: 'MoCU',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Co-operative and Business Studies',
      url: 'https://journals.mocu.ac.tz/index.php/jcbs/index',
      language: 'English',
      indexed: 'Google Scholar',
      university: 'MoCU'
    },
    {
      id: 60,
      issn: '',
      title: 'East African Journal of Social and Applied Sciences (EAJ-SAS)',
      publisher: 'MoCU',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social and Applied Sciences',
      url: 'https://journals.mocu.ac.tz/index.php/eaj-sas/index',
      language: 'English',
      indexed: '',
      university: 'MoCU'
    },
    // TUMAINI UNIVERSITY DAR ES SALAAM COLLEGE (TUDARCo)
    {
      id: 61,
      issn: '2820 - 266X',
      title: 'TUDARCO Journal of Humanities and Education',
      publisher: 'TUDARCo',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Social Science and Humanities',
      url: '',
      language: 'English',
      indexed: '',
      university: 'TUDARCo'
    },
    // KAMPALA INTERNATIONAL UNIVERSITY
    {
      id: 62,
      issn: '3057-3149',
      title: 'Tanzanian Journal of Multidisciplinary Studies',
      publisher: 'KIU',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Multidisciplinary',
      url: 'https://journal.kiut.ac.tz/index.php/tzjms/index',
      language: 'English',
      indexed: '',
      university: 'KIU'
    },
    // COLLEGE OF BUSINESS EDUCATION
    {
      id: 63,
      issn: 'E 2665-0681 /   2546-2180',
      title: 'Business Education Journal (BEJ)',
      publisher: 'CBE',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Business',
      url: 'https://bej.cbe.ac.tz/index.php/bej',
      language: 'English',
      indexed: 'AJOL',
      university: 'CBE'
    },
    // ST. AUGUSTINE UNIVERSITY OF TANZANIA
    {
      id: 64,
      issn: '1821 - 6544',
      title: 'African Communication Research',
      publisher: 'SAUT',
      mode: '',
      frequency: 'Annually',
      subject: 'Social Science',
      url: '',
      language: 'English',
      indexed: '',
      university: 'SAUT'
    },
    {
      id: 65,
      issn: '2507-7783',
      title: 'Journal of Sociology and Development',
      publisher: 'St. Augustine University of Tanzania',
      mode: 'Print',
      frequency: '',
      subject: 'Social Science',
      url: '',
      language: 'English',
      indexed: '',
      university: 'SAUT'
    },
    {
      id: 66,
      issn: '1821-7435',
      title: 'St. Augustine University LAW JOURNAL',
      publisher: 'SAUT',
      mode: '',
      frequency: 'Biannual',
      subject: 'Law',
      url: '',
      language: 'English',
      indexed: '',
      university: 'SAUT'
    },
    // TANZANIA INSTITUTE OF ACCOUNTANCY (TIA)
    {
      id: 67,
      issn: '',
      title: 'The African Journal of Accounting and Social Science (AJASSS)',
      publisher: 'TIA',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journal.tia.ac.tz/index.php/ajass/',
      language: 'English',
      indexed: 'AJOL',
      university: 'TIA'
    },
    // NATIONAL INSTITUTE OF MEDICAL RESEARCH (NIMR)
    {
      id: 68,
      issn: 'E1821-9241 /1821-6404',
      title: 'Tanzania Journal of Health Research',
      publisher: 'NIMR',
      mode: 'Online',
      frequency: 'Quarterly',
      subject: 'Medical and Health Sciences',
      url: 'https://www.ajol.info/index.php/thrb',
      language: 'English',
      indexed: 'AJOL',
      university: 'NIMR'
    },
    // INSTITUTE OF FINANCE MANAGEMENT (IFM)
    {
      id: 69,
      issn: '3057-3076 /               E 2591-6904',
      title: 'The Journal of Finance and Business Studies (JFBS)',
      publisher: 'IFM',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Business',
      url: 'https://journals.ifm.ac.tz/',
      language: 'English',
      indexed: '',
      university: 'IFM'
    },
    {
      id: 70,
      issn: '2591- 6890',
      title: 'The Journal of Innovation and Social Science Research (JISSR)',
      publisher: 'IFM',
      mode: 'Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://journals.ifm.ac.tz/',
      language: 'English',
      indexed: '',
      university: 'IFM'
    },
    {
      id: 71,
      issn: '0856-6372',
      title: 'The African Journal of Finance and Management (AJFM)',
      publisher: 'IFM',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Finance Management',
      url: 'https://journals.ifm.ac.tz/',
      language: 'English',
      indexed: 'AJOL',
      university: 'IFM'
    },
    // NATIONAL INSTITUTE OF TRANSPORT (NIT)
    {
      id: 72,
      issn: '1821-9349  /    E2961-6239',
      title: 'Journal of Logistics, Management and Engineering Sciences (JLMES)',
      publisher: 'NIT',
      mode: 'Online & Print',
      frequency: 'Biannual',
      subject: 'Engineering and Technology',
      url: 'https://jlmes.nit.ac.tz/Site',
      language: 'English',
      indexed: '',
      university: 'NIT'
    },
    // INSTITUTE OF RURAL DEVELOPMENT AND PLANNING
    {
      id: 73,
      issn: '0856 - 3460 /             E 2507 -7848',
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
    // INSTITUTE OF ACCOUNTANCY ARUSHA
    {
      id: 74,
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
      id: 75,
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
      id: 76,
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
      id: 77,
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
    // INSTITUTE OF TAX ADMINISTRATION
    {
      id: 78,
      issn: '2665 - 0517 /             E 2665 - 0507',
      title: 'The African Journal of Customs and Fiscal Studies (AJCFS)',
      publisher: 'ITA',
      mode: '',
      frequency: 'Biannual',
      subject: 'Business and Management',
      url: 'https://journal.ita.ac.tz/index.php/tra/index',
      language: 'English',
      indexed: '',
      university: 'ITA'
    },
    // MBEYA UNIVERSITY OF SCIENCE AND TECHNOLOGY
    {
      id: 79,
      issn: '2683-6475/                E 2683-6467',
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
    // MWENGE CATHOLIC UNIVERSITY
    {
      id: 80,
      issn: '1821 – 8369',
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
    // ST. JOHNS UNIVERSITY OF TANZANIA
    {
      id: 81,
      issn: '2683 - 6440/ E 2683 - 6432',
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
    // DAR ES SALAAM MARITIME INSTITUTE
    {
      id: 82,
      issn: '',
      title: 'Journal of Maritime Science and Technology',
      publisher: 'DMI',
      mode: 'Online',
      frequency: 'Annually',
      subject: 'Natural Sciences',
      url: 'ournal.dmi.ac.tz/index.php/1DMI1/index',
      language: 'English',
      indexed: '',
      university: 'DMI'
    },
    // INSTITUTE OF JUDICIARY ADMINISTRATION
    {
      id: 83,
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
    // INSTITUTE OF ADULT EDUCATION
    {
      id: 84,
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
    // LAW SCHOOL OF TANZANIA
    {
      id: 85,
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
    // CENTRE FOR FOREIGN RELATIONS
    {
      id: 86,
      issn: '2773 – 6598 / E 2773 – 658X',
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
    // RUAHA CATHOLIC UNIVERSITY
    {
      id: 87,
      issn: 'P2507-7945/      E2507-79945',
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
      id: 88,
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
      id: 89,
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
      id: 90,
      issn: '2453-6016',
      title: 'Ruaha Journal of Arts and Social Science (RUJASS)',
      publisher: 'Ruaha Catholic University',
      mode: 'Print/Online',
      frequency: 'Biannual',
      subject: 'Social Science',
      url: 'https://www.rucu.ac.tz/index.php/journals.html',
      language: 'English',
      indexed: '',
      university: 'RUCU'
    },
    {
      id: 91,
      issn: '2507-7939',
      title: 'Ruaha Law Review (RLR)',
      publisher: 'Ruaha Catholic University',
      mode: 'Online',
      frequency: 'Annualy',
      subject: 'Social Science',
      url: '',
      language: 'English',
      indexed: '',
      university: 'RUCU'
    },
    // LAW REFORM COMMISSION OF TANZANIA
    {
      id: 92,
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
    // CHAMA CHA LUGHA NA FASIHI YA KISWAHILI TANZANIA
    {
      id: 93,
      issn: '2665-0789 / E 2591-7013',
      title: 'Jarida la Chama cha Lugha na Fasihi ya Kiswahili Tanzania',
      publisher: 'CHALUFAKITA',
      mode: 'Online & Print',
      frequency: 'Annualy',
      subject: 'Social Science',
      url: 'https://www.ajol.info/index.php/jclfkt',
      language: 'Kiswahili',
      indexed: 'AJOL',
      university: 'CHALUFAKITA'
    },
    // TANZANIA MARKETING SCIENCE ASSOCIATION
    {
      id: 94,
      issn: '2799-2144/ E 2779-2152',
      title: 'Journal of Applied Marketing Science (JOAMS)',
      publisher: 'TMSA',
      mode: 'Online & Print',
      frequency: '',
      subject: 'Social Science',
      url: 'https://joams.tmsa.or.tz/',
      language: 'English',
      indexed: 'AJOL',
      university: 'TMSA'
    },
    // COMMUNITY DEVELOPMENT PROFESSIONAL ASSOCIATION OF TANZANIA
    {
      id: 95,
      issn: 'E 2773-675X / 2773-6725',
      title: 'Tanzania Journal of Community Development (TAJOCODE)',
      publisher: 'CODEPATA',
      mode: 'Online & Print',
      frequency: '',
      subject: 'Social Science',
      url: 'https://www.ajol.info/index.php/tajocode',
      language: 'English',
      indexed: 'AJOL',
      university: 'CODEPATA'
    },
    // WESTERN INDIAN OCEAN MARINE SCIENCE ASSOCIATION
    {
      id: 96,
      issn: 'E 2683-6416 / 0856-860X',
      title: 'The Western Indian Ocean Journal of Marine Science (WIOJMS)',
      publisher: 'WIOMSA',
      mode: 'Online & Print',
      frequency: '',
      subject: 'Natural Sciences',
      url: 'https://www.ajol.info/index.php/wiojms',
      language: 'English',
      indexed: '',
      university: 'WIOMSA'
    },
    // TEOFILO KISANJI UNIVERSITY
    {
      id: 97,
      issn: '',
      title: 'Teku Journal of Interdisciplinary Studies(TJIS)',
      publisher: 'TEKU',
      mode: '',
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
    <section className="journals-page">
      <div className="journals-hero">
        <div className="journals-hero-overlay" />
        <div className="journals-hero-content">
          <h1>Journals</h1>
          <p>
            Explore a comprehensive list of Tanzanian academic journals from various universities and research institutions.
          </p>
        </div>
      </div>

      <div className="journals-body">
        <div className="journals-table-container">
          <div className="journals-table-title">
            <h3>LIST OF TANZANIA JOURNALS</h3>
          </div>
          
          <div className="journals-search-container">
            <input
              type="text"
              className="journals-search-input"
              placeholder="Write here to filter journal records"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="journals-table-wrapper">
            <table className="journals-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th className="sortable" onClick={() => handleSort('issn')}>
                    ISSN {sortColumn === 'issn' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('title')}>
                    Title {sortColumn === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('publisher')}>
                    Publisher {sortColumn === 'publisher' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('mode')}>
                    Mode {sortColumn === 'mode' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('frequency')}>
                    Frequency {sortColumn === 'frequency' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('subject')}>
                    Subject {sortColumn === 'subject' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('url')}>
                    URL {sortColumn === 'url' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('language')}>
                    Language {sortColumn === 'language' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('indexed')}>
                    Indexed {sortColumn === 'indexed' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('university')}>
                    University {sortColumn === 'university' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{item.issn || '-'}</td>
                      <td>{item.title}</td>
                      <td>{item.publisher}</td>
                      <td>{item.mode || '-'}</td>
                      <td>{item.frequency || '-'}</td>
                      <td>{item.subject}</td>
                      <td>
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="journal-link">
                            {item.url.length > 40 ? item.url.substring(0, 40) + '...' : item.url}
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>{item.language || '-'}</td>
                      <td>{item.indexed || '-'}</td>
                      <td>{item.university}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="no-data">
                      No journals found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="journals-pagination">
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
    </section>
  );
};

export default JournalsPage;
