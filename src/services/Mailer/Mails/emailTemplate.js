/* eslint-disable no-underscore-dangle */
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import mjml2html from 'mjml';
import Handlebars from 'handlebars';

// TRY IT LIVE : https://mjml.io/try-it-live/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Handlebars.registerHelper('breaklines', (t) => {
  let text = Handlebars.Utils.escapeExpression(t);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br />');
  return new Handlebars.SafeString(text);
});

export const TemplateEmail = (vars, theme) => {
  const templatePath = path.resolve(__dirname, './template.mjml');
  const mjmlTemplate = fs.readFileSync(templatePath, 'utf8');
  const template = Handlebars.compile(mjmlTemplate);
  const mjml = template({
    vars,
    theme,
  });

  const h = mjml2html(mjml);
  return h;
};

export default TemplateEmail;
