const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar.campos');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('correo', 'El correo no es válido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El paswword debe de ser más de 6 letras').isLength({ min: 6 }),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);


router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;