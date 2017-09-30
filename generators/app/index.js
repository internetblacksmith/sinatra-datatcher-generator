"use strict";
var yeoman = require("yeoman-generator"),
  chalk = require("chalk"),
  yosay = require("yosay"),
  shell = require("shelljs")

function formField(label, name, type, templateEngine) {
  var ret = "";
  var field = "";
  switch (type + "_" + templateEngine) {
    case "string_haml":
      field += "    %fieldset.form-group \n";
      field += "      .col-md-12 \n";
      field += "        %label.control-label{ for: \"" + name + "\" } " + label + " \n";
      field += "        %input#" + name + ".form-control.input-md{ name: \"" + name + "\", placeholder: \"" + label + "\", type: \"text\"} \n";
      break;
    case "integer_haml":
      field += "    %fieldset.form-group \n";
      field += "      .col-md-12 \n";
      field += "        %label.control-label{ for: \"" + name + "\" } " + label + " \n";
      field += "        %input#" + name + ".form-control.input-md{ name: \"" + name + "\", placeholder: \"" + label + "\", type: \"number\"} \n";
      break;
    case "date_haml":
      field += "    %fieldset.form-group \n";
      field += "      .col-md-12 \n";
      field += "        %label.control-label{ for: \"" + name + "\" } " + label + " \n";
      field += "        %input#" + name + ".form-control.input-md.datepicker{ name: \"" + name + "\", placeholder: \"" + label + "\", type: \"date\"} \n";
      break;
    case "time_haml":
      field += "    %fieldset.form-group \n";
      field += "      .col-md-12 \n";
      field += "        %label.control-label{ for: \"" + name + "\" } " + label + " \n";
      field += "        %input#" + name + ".form-control.input-md.timepicker{ name: \"" + name + "\", placeholder: \"" + label + "\", type: \"time\"} \n";
      break;
    case "datetime_haml":
      field += "    %fieldset.form-group\n";
      field += "      .col-md-12 \n";
      field += "        %label.control-label{ for: \"" + name + "\" } " + label + " \n";
      field += "        %input#" + name + ".form-control.input-md.datetimepicker{ name: \"" + name + "\", placeholder: \"" + label + "\", type: \"datetime\"} \n";
      break;
    case "text_haml":
      field += "    %fieldset.form-group\n";
      field += "      .col-md-12 \n";
      field += "        %label.control-label{ for: \"" + name + "\"} " + label + " \n";
      field += "        %textarea#" + name + ".form-control{ name: \"" + name + "\"} \n";
      break;
    case "boolean_haml":
      field += "    .checkbox" + " \n";
      field += "      %label{ for: \"" + name + "\"}" + " \n";
      field += "      %input#" + name + "{ name: \"" + name + "\", type: \"checkbox\", value: \"1\"} " + label + "\n";
      break;
    case "string_erb":
      field += "    <fieldset class=\"form-group\">\n";
      field += "      <div class= \"col-md-12\">\n";
      field += "        <label class=\"control-label\" for=\"" + name + "\">" + label + "</label>\n";
      field += "        <input class=\"form-control input-md\" id=\"" + name + "\" name=\"" + name + "\" placeholder=\"" + label + "\" type=\"text\"></input>\n";
      field += "      </div>\n";
      field += "    </fieldset>";
      break;
    case "integer_erb":
      field += "    <fieldset class=\"form-group\">\n";
      field += "      <div class=\"col-md-12\">\n";
      field += "        <label class=\"control-label\" for=\"" + name + "\">" + label + "</label>\n";
      field += "        <input class=\"form-control input-md\" id=\"" + name + "\" name=\"" + name + "\" placeholder=\"" + label + "\" type=\"number\"></input>\n";
      field += "      </div>\n";
      field += "    </fieldset>";
      break;
    case "date_erb":
      field += "    <fieldset class=\"form-group\">\n";
      field += "      <div class=\"col-md-12\">\n";
      field += "        <label class=\"control-label\" for=\"" + name + "\">" + label + "</label>\n";
      field += "        <input class=\"form-control input-md datepicker\" id=\"" + name + "\" name=\"" + name + "\" placeholder=\"" + label + "\" type=\"date\"></input>\n";
      field += "      </div>\n";
      field += "    </fieldset>";
      break;
    case "time_erb":
      field += "    <fieldset class=\"form-group\">\n";
      field += "      <div class=\"col-md-12\">\n";
      field += "        <label class=\"control-label\" for=\"" + name + "\">" + label + "</label>\n";
      field += "        <input class=\"form-control input-md timepicker\" id=\"" + name + "\" name=\"" + name + "\" placeholder=\"" + label + "\" type=\"time\"></input>\n";
      field += "      </div>\n";
      field += "    </fieldset>";
      break;
    case "datetime_erb":
      field += "    <fieldset class=\"form-group\">\n";
      field += "      <div class=\"col-md-12\">\n";
      field += "        <label class=\"control-label\" for=\"" + name + "\">" + label + "</label>\n";
      field += "        <input class=\"form-control input-md datetimepicker\" id=\"" + name + "\" name=\"" + name + "\" placeholder=\"" + label + "\" type=\"datetime\"></input>\n";
      field += "      </div>\n";
      field += "    </fieldset>";
      break;
    case "text_erb":
      field += "    <fieldset class=\"form-group\">\n";
      field += "      <div class=\"col-md-12\">\n";
      field += "        <label class=\"control-label\" for=\"" + name + "\">" + label + "</label>\n";
      field += "        <textarea class=\"form-control\" id=\"" + name + "\" name=\"" + name + "\"></textarea>\n";
      field += "      </div>\n";
      field += "    </fieldset>";
      break;
    case "boolean_erb":
      field += "    <div class=\"checkbox\">\n";
      field += "      <label for=\"" + name + "\"></label>\n";
      field += "      <input id=\"" + name + "\" name=\"" + name + "\" type=\"checkbox\" value=\"1\">" + label + "</input>\n";
      field += "    </div>";
      break;
  };

  if ("haml" === templateEngine) {
    ret += "    / " + name + " start \n";
    ret += field;
    ret += "    / " + name + " end \n";
  }

  if ("erb" === templateEngine) {
    ret += "    <!-- " + name + " start --> \n";
    ret += field;
    ret += "    <!-- " + name + " end  -->\n";
  }

  return ret;

};

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to the impeccable " + chalk.red("Sinatra Mailcatcher") + " generator!"
    ));

    var field = function(self, templateEngine) {

      var prompts = [{
        type: "input",
        name: "fieldName",
        message: "Field Name (used for model properties, so no spaces or special character)?"
      }, {
        type: "input",
        name: "fieldLabel",
        message: "Field Label (used in the HTML form, so is what the user will see)?"
      }, {
        type: "list",
        name: "fieldType",
        message: "Field Type?",
        choices: [
          "string",
          "text",
          "integer",
          "date",
          "time",
          "datetime",
          "boolean"
        ]
      }, {
        type: "confirm",
        name: "continue",
        message: "Add a new Field?"
      }];

      self.prompt(prompts, function(props) {

        self.up = self.up.concat("      t." + props.fieldType + " :" + props.fieldName + "\n");

        self.form = self.form.concat(formField(props.fieldLabel, props.fieldName, props.fieldType, templateEngine));

        if ("haml" == templateEngine) {
          self.tableRow = self.tableRow.concat("          %td= model." + props.fieldName + "\n");
        } else {
          self.tableRow = self.tableRow.concat("          <td><%= model." + props.fieldName + " %></td>\n");
        };

        if ("haml" == templateEngine) {
          self.tableHeader = self.tableHeader.concat("        %th " + props.fieldLabel + "\n");
        } else {
          self.tableHeader = self.tableHeader.concat("        <th>" + props.fieldLabel + "</th>\n");
        };

        if ("time" == props.fieldType) {
          self.time = true;
        };

        if ("date" == props.fieldType) {
          self.date = true;
        };

        if ("datetime" == props.fieldType) {
          self.datetime = true;
        };

        if (props.continue == true) {
          field(self, templateEngine);
        } else {
          done();
        };

      });
    }

    var prompts = [{
      type: "input",
      name: "title",
      message: "What is the _title_ of thi app?"
    }, {
      type: "list",
      name: "templateEngine",
      message: "Template Engie?",
      choices: [
        "haml",
        "erb"
      ]
    }, {
        type: "confirm",
        name: "recaptcha",
        message: "Add Recaptcha?"
      }]

    this.prompt(prompts, function(props) {

      this.title = props.title;
      this.templateEngine = props.templateEngine;
      this.recaptcha = props.recaptcha;
      this.up = "";
      this.form = "";
      this.tableHeader = "";
      this.tableRow = "";
      this.time = false;
      this.date = false;
      this.datetime = false;

      field(this, props.templateEngine);
    }.bind(this));

  },

  writing: {
    app: function() {
      this.directory("models", "models");
      this.mkdir("config");
      this.mkdir("db");
      this.mkdir("db/migrate");
      this.mkdir("views");
      this.fs.copy(
        this.templatePath(".bowerrc"),
        this.destinationPath(".bowerrc")
      );
      this.fs.copy(
        this.templatePath("config.ru"),
        this.destinationPath("config.ru")
      );
      this.fs.copy(
        this.templatePath("package.json"),
        this.destinationPath("package.json")
      );
      this.fs.copy(
        this.templatePath("Rakefile"),
        this.destinationPath("Rakefile")
      );
      this.fs.copy(
        this.templatePath("Vagrantfile"),
        this.destinationPath("Vagrantfile")
      );
      this.fs.copy(
        this.templatePath("config/database.yml"),
        this.destinationPath("config/database.yml")
      );
      this.fs.copy(
        this.templatePath("config/environments.rb"),
        this.destinationPath("config/environments.rb")
      );
      this.fs.copy(
        this.templatePath("views/" + this.templateEngine + "/thakyou.html." + this.templateEngine),
        this.destinationPath("views/thakyou.html." + this.templateEngine)
      );
      this.fs.copy(
        this.templatePath("views/" + this.templateEngine + "/error.html." + this.templateEngine),
        this.destinationPath("views/error.html." + this.templateEngine)
      );
      this.fs.copyTpl(
        this.templatePath("app.rb"),
        this.destinationPath("app.rb"), {
          recaptcha: this.recaptcha,
          templateEngine: this.templateEngine

        }, {
          delimiter: "?"
        }
      );
      this.fs.copyTpl(
        this.templatePath("bower.json"),
        this.destinationPath("bower.json"), {
          date: this.date,
          datetime: this.datetime,
          time: this.time
        }
      );
      this.fs.copyTpl(
        this.templatePath("Gemfile"),
        this.destinationPath("Gemfile"), {
          templateEngine: this.templateEngine
        }, {
          delimiter: "?"
        }
      );
      this.fs.copyTpl(
        this.templatePath("db/migrate/0_create_model.rb"),
        this.destinationPath("db/migrate/0_create_model.rb"), {
          up: this.up
        }
      );
      this.fs.copyTpl(
        this.templatePath("views/" + this.templateEngine + "/admin.html." + this.templateEngine),
        this.destinationPath("views/admin.html." + this.templateEngine), {
          tableHeader: this.tableHeader,
          tableRow: this.tableRow
        }, {
          delimiter: "?"
        }
      );
      this.fs.copyTpl(
        this.templatePath("views/" + this.templateEngine + "/index.html." + this.templateEngine),
        this.destinationPath("views/index.html." + this.templateEngine), {
          date: this.date,
          datetime: this.datetime,
          form: this.form,
          recaptcha: this.recaptcha,
          time: this.time
        }, {
          delimiter: "?"
        }
      );
      this.fs.copyTpl(
        this.templatePath("views/" + this.templateEngine + "/layout.html." + this.templateEngine),
        this.destinationPath("views/layout.html." + this.templateEngine), {
          date: this.date,
          datetime: this.datetime,
          recaptcha: this.recaptcha,
          time: this.time,
          title: this.title
        }, {
          delimiter: "?"
        }
      );
    },

    projectfiles: function() {
      this.fs.copy(
        this.templatePath("editorconfig"),
        this.destinationPath(".editorconfig")
      );
      this.fs.copy(
        this.templatePath("jshintrc"),
        this.destinationPath(".jshintrc")
      );
    }
  },

  install: function() {

    this.installDependencies();
    this.log("Installing `bundler` gem...");
    shell.exec("gem install bundler --quiet");
    this.log("Completed.");
    this.log("bundling gems...");
    shell.exec("bundle");
    this.log("bowerig...");
    // shell.exec("bower install");
  }
});
