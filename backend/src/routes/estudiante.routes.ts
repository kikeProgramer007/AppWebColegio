import { Router } from 'express';
import { EstudianteController } from '../controllers/estudiante.controller';
import validateToken from './validate-token';

const router = Router();

// Rutas protegidas con validateToken
router.get('/', validateToken, EstudianteController.obtenerTodos);
router.get('/:id', validateToken, EstudianteController.obtenerPorId);
router.post('/', validateToken, EstudianteController.crear);
router.put('/:id', validateToken, EstudianteController.actualizar);
router.delete('/:id', validateToken, EstudianteController.eliminar);

export default router;