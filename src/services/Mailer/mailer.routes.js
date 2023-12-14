import express from 'express';
import { MAILS } from './Mails/index.js';
import { generateEmail } from './utils.js';

export function routes(services) {
  const { repositoryService } = services;
  const { repositories } = repositoryService;
  const router = express.Router();

  router.get('/render', (req, res) => {
    const { email, lang } = req.query;
    const mailToRender = MAILS[email];
    if (!mailToRender) return res.sendStatus(404).end();
    const html = generateEmail(mailToRender, lang);

    return res.send(html);
  });

  return router;
}
