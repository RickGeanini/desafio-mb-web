module.exports = app => {
    app._router.group('/v1/registration/register', router => {
        router.get('/', async (_req, res) => {
            return res.status(200).json({ data: { ok: true } });
        });

        router.post('/', async (_req, res) => {
            return res.status(200).json({ data: { ok: true } });
        });
    });
};
