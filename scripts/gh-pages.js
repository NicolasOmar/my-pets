const ghPages = require('gh-pages');

ghPages.publish(
  'build',
  {
    user: {
      name: 'Nicolás Omar González Passerino',
      email: 'nicolas.passerino@gmail.com'
    },
    message: 'Deploying new version'
  },
  function(err) {}
);