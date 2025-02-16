//https://stackoverflow.com/a/77688978
export const redirects = {
  // source: destination
  '/tdd-post': '/tdd',
  '/tdd-p': '/tdd',
  '/writing-meaningful-log-messages': '/software-blog/writing-log-messages',
  '/when-to-log': '/software-blog/writing-log-messages',
  '/writing-cleaner-tests-with-test-data-factories': '/software-blog/test-data-factories',
  '/test-data-factories': '/software-blog/test-data-factories',
  '/who-is-a-leader': '/life-blog/leader',
  '/writing-meaningful-log-messages/': '/writing-meaningful-log-messages',
  '/v/rsa-algorithm': '/v/rsa-algorithm',
  '/ttd': '/tdd',
  '/tag/technical/': '/tag/technical/',
  '/tag/physical-exercise/': '/tag/physical-exercise/',
  '/tag/non-technical/': '/tag/non-technical/',
  '/solving-nplus1-problem-in-hibernate': '/solving-nplus1-problem-in-hibernate',
  '/software-blog/solving-n1-problem-in-hibernate': '/software-blog/solving-n1-problem-in-hibernate',
  '/software-blog/solving-n-plus-1-problem-in-hibernate': '/software-blog/solving-n-plus-1-problem-in-hibernate',
  '/software-blog/rsa-algorithm/': '/software-blog/rsa-algorithm/',
  '/software-blog/deciding-to-learn-a-programming-topic': '/software-blog/deciding-to-learn-a-programming-topic',
  '/software-blog/bdd-vs-ui-ux-tdd': '/software-blog/bdd-vs-ui-ux-tdd',
  '/software-blog/': '/software-blog/',
  '/software': '/software',
  '/sitemap.xml': '/sitemap.xml',
  '/search/': '/search/',
  '/rsa-algorithm/': '/rsa-algorithm/',
  '/rsa-algorithm': '/rsa-algorithm',
  '/physical-exercise': '/physical-exercise',
  '/middleman': '/middleman',
  '/marketing-money': '/marketing-money',
  '/logging-when/': '/logging-when/',
  '/life/ideas': '/life/ideas',
  '/life/': '/life/',
  '/life-blog/who-is-a-leader': '/life-blog/who-is-a-leader',
  '/life-blog/ideas': '/life-blog/ideas',
  '/life-blog/giving_help/': '/life-blog/giving_help/',
  '/life-blog/exercise/': '/life-blog/exercise/',
  '/life-blog/develop-your-own-opinions-and-reasonings': '/life-blog/develop-your-own-opinions-and-reasonings',
  '/life-blog/benefits-of-exercising': '/life-blog/benefits-of-exercising',
  '/life-blog/benefits-exercising': '/life-blog/benefits-exercising',
  '/learning-strategies-for-development': '/learning-strategies-for-development',
  '/images/life-blog/probabilities.png': '/images/life-blog/probabilities.png',
  '/ideas': '/ideas',
  '/dont-try-to-force-a-sale-on-people-who-are-not-your-user-base': '/dont-try-to-force-a-sale-on-people-who-are-not-your-user-base',
  '/developing-better-self-awareness-with-quantifiedself-observability-for-personal-life': '/developing-better-self-awareness-with-quantifiedself-observability-for-personal-life',
  '/developing-better-self-awareness-with-quantifiedself': '/developing-better-self-awareness-with-quantifiedself',
  '/develop-yourown-opinions-and-reasonings': '/develop-yourown-opinions-and-reasonings',
  '/develop-your-own-opinions-and-reasonings': '/develop-your-own-opinions-and-reasonings',
  '/definitions': '/definitions',
  '/deciding-to-learn-a-programming-topic': '/deciding-to-learn-a-programming-topic',
  '/blog/writing-meaningful-log-messages': '/blog/writing-meaningful-log-messages',
  '/blog/learning-strategies-for-development': '/blog/learning-strategies-for-development',
  '/blog/develop-your-own-opinions-and-reasonings': '/blog/develop-your-own-opinions-and-reasonings',
  '/blind-75-valid-palindrome': '/blind-75-valid-palindrome',
  '/benefits-of-exercising': '/benefits-of-exercising',
  '/bdd-vs-ui-ux-tdd-understanding-the-key-differences-for-customer-centric-problem-solving': '/bdd-vs-ui-ux-tdd-understanding-the-key-differences-for-customer-centric-problem-solving',
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