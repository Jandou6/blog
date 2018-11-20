var Metalsmith = require('metalsmith');
var render = require('consolidate').handlebars.render;
var inquirer = require('inquirer');

const date = new Date();
const NOW = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;


Metalsmith(__dirname)
  .source('./template/article')
  .destination(`../../src/routers/Articles/${NOW}`)
  .clean(true)
  .use(ask)
  .use(template)
  .build(function (err) {
    if (err) throw err;
  });

function ask(files, metalsmith, done) {
  var questions = [{
    type: 'input',
    name: 'name',
    message: 'What is the article name ?',
    validate: function (value) {
      return !!value || 'Please enter a right view name.'
    },
    filter: String,
  }];
  inquirer.prompt(questions).then(answers => {
    var metadata = metalsmith.metadata();
    for (let key in answers) {
      metadata[key] = answers[key];
    }
    metadata['date'] = NOW
    done();
  });
}

async function template(files, metalsmith, done) {
  var keys = Object.keys(files);
  var metadata = metalsmith.metadata();

  for (let index in keys) {
    await run(keys[index], done)
  }

  function run(file, done) {
    var str = files[file].contents.toString();
    render(str, metadata, function (err, res) {
      if (err) return done(err);
      files[file].contents = new Buffer(res);
      done();
    });
  }
}