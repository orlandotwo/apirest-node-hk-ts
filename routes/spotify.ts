import { Router } from 'express';
import { getAlbums } from '../controllers/spotify';

const router = Router();

router.get('/albums',getAlbums);

export default router;