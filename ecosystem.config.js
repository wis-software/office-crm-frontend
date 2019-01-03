module.exports = {
  apps : [{
    name: 'Office CRM',
  }],

  deploy : {
    production : {
      user : 'deploy',
      host : '159.69.88.4',
      ref  : 'origin/master',
      repo : 'git@github.com:wis-software/office-crm-frontend.git',
      path : '/home/deploy/office/frontend',
      'post-deploy' : 'yarn && yarn run build:prod'
    }
  }
};
