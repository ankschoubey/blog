//https://stackoverflow.com/a/77688978

const MEANINGFUL_LOG_MESSAGES = '/software-blog/writing-log-messages';
const RSA = '/v1/rsa';
const N_PLUS_1_PROBLEM = '/software-blog/n-plus-one-hibernate';
const DECIDING_TO_LEARN_PROGRAMMING_TOPIC = '/software-blog/new_tech/'
const BDD_VS_TDD = '/software-blog/bdd-vs-tdd';
const OWN_OPINION = '/life-blog/original-opinion/';
const PHYSICAL_EXERCISE = '/life-blog/exercise';
export const redirects = {
  // source: destination
  '/tdd-post': '/tdd',
  '/tdd-p': '/tdd',
  '/writing-meaningful-log-messages': MEANINGFUL_LOG_MESSAGES,
  '/when-to-log': MEANINGFUL_LOG_MESSAGES,
  '/writing-cleaner-tests-with-test-data-factories': '/software-blog/test-data-factories',
  '/test-data-factories': '/software-blog/test-data-factories',
  '/who-is-a-leader': '/life-blog/leader',
  '/writing-meaningful-log-messages/': MEANINGFUL_LOG_MESSAGES,
  '/v/rsa-algorithm': RSA,
  '/ttd': '/tdd',
  '/tag/technical/': '/tag/technical/',
  '/tag/physical-exercise/': '/tag/physical-exercise/',
  '/tag/non-technical/': '/tag/non-technical/',
  '/solving-nplus1-problem-in-hibernate': N_PLUS_1_PROBLEM,
  '/software-blog/solving-n1-problem-in-hibernate': N_PLUS_1_PROBLEM,
  '/software-blog/solving-n-plus-1-problem-in-hibernate': N_PLUS_1_PROBLEM,
  '/software-blog/rsa-algorithm/': RSA,
  '/software-blog/deciding-to-learn-a-programming-topic': DECIDING_TO_LEARN_PROGRAMMING_TOPIC,
  '/software-blog/bdd-vs-ui-ux-tdd': BDD_VS_TDD,
  '/software-blog/': '/software-blog/',
  '/software': '/software',
  '/sitemap.xml': '/sitemap-index.xml',
  '/rsa-algorithm/': RSA,
  '/rsa-algorithm': RSA,
  '/physical-exercise': PHYSICAL_EXERCISE,
  '/middleman': '/middleman',
  '/marketing-money': '/marketing-money',
  '/logging-when/': MEANINGFUL_LOG_MESSAGES,
  '/life/ideas': '/life/ideas',
  '/life/': '/life/',
  '/life-blog/who-is-a-leader': '/life-blog/who-is-a-leader',
  '/life-blog/ideas': '/life-blog/ideas',
  '/life-blog/giving_help/': '/life-blog/giving_help/',
  '/life-blog/exercise/': PHYSICAL_EXERCISE,
  '/life-blog/develop-your-own-opinions-and-reasonings': OWN_OPINION,
  '/life-blog/benefits-of-exercising': '/life-blog/benefits-of-exercising',
  '/life-blog/benefits-exercising': '/life-blog/benefits-exercising',
  '/learning-strategies-for-development': '/learning-strategies-for-development',
  '/images/life-blog/probabilities.png': '/images/life-blog/probabilities.png',
  '/ideas': '/ideas',
  '/dont-try-to-force-a-sale-on-people-who-are-not-your-user-base': '/dont-try-to-force-a-sale-on-people-who-are-not-your-user-base',
  '/developing-better-self-awareness-with-quantifiedself-observability-for-personal-life': '/developing-better-self-awareness-with-quantifiedself-observability-for-personal-life',
  '/developing-better-self-awareness-with-quantifiedself': '/developing-better-self-awareness-with-quantifiedself',
  '/develop-yourown-opinions-and-reasonings': OWN_OPINION,
  '/develop-your-own-opinions-and-reasonings': OWN_OPINION,
  '/definitions': '/definitions',
  '/deciding-to-learn-a-programming-topic': DECIDING_TO_LEARN_PROGRAMMING_TOPIC,
  '/blog/writing-meaningful-log-messages': MEANINGFUL_LOG_MESSAGES,
  '/blog/learning-strategies-for-development': '/blog/learning-strategies-for-development',
  '/blog/develop-your-own-opinions-and-reasonings': OWN_OPINION,
  '/blind-75-valid-palindrome': '/blind-75-valid-palindrome',
  '/benefits-of-exercising': '/benefits-of-exercising',
  '/bdd-vs-ui-ux-tdd-understanding-the-key-differences-for-customer-centric-problem-solving': BDD_VS_TDD,
  '/b2RhdGEtbW': '/b2RhdGEtbW',
  '/archives': '/archives',
  '/actually-solve-the-problem': '/actually-solve-the-problem',
  '/Ideas': '/Ideas',
   // 2025 Feb 16: Pages with 404 from Google Analytics
   
};


// iterate through above keyvalue pairs and create key: {destination: value}
export const redirectsMap = Object.keys(redirects).reduce((acc, key) => {

  let value = redirects[key];
  if (value.startsWith('/')) {
    // value = value.substring(1);
  }
  acc[key] = { destination: value, status: 308 };

  // acc[key] = { destination: redirects[key], permanent: true };
  return acc;
}, {});