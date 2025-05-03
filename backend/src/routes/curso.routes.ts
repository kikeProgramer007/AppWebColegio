import { Router } from 'express';
import { CursoController } from '../controllers/curso.controller';
import validateToken from './validate-token';

const router = Router();

// Rutas protegidas con validateToken
router.get('/', validateToken, CursoController.obtenerTodos);
router.get('/:id', validateToken, CursoController.obtenerPorId);
router.post('/', validateToken, CursoController.crear);
router.put('/:id', validateToken, CursoController.actualizar);
router.delete('/:id', validateToken, CursoController.eliminar);

export default router;