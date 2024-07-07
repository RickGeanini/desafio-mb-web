const { awaiter } = require('../../../utils/awaiter');
const { validatePayload } = require('../../../utils/validators');

module.exports = app => {
    app._router.group('/v1/registration/register', router => {
        router.get('/', async (_req, res) => {
            await awaiter(2000);
            return res.status(200).json({ data: { ok: true } });
        });

        router.post('/', async (req, res) => {
            await awaiter(2000);
            return validatePayload(req.body, res);
        });
    });
};
