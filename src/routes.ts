const router = require('express').Router();
import { getNeo } from './controller';

router.get('/getNeo', getNeo);

export default router;