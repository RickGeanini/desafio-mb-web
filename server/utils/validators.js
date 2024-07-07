module.exports = {
    validatePayload: (payload, res) => {
        const hasEmptyData =
            !payload.date ||
            !payload.document ||
            !payload.email ||
            !payload.name ||
            !payload.password ||
            !payload.person_type ||
            !payload.phone;

        if (!hasEmptyData) {
            return res.status(200).json({ data: { ok: true } });
        }

        return res.status(422).json({ data: { ok: false } });
    },
};
