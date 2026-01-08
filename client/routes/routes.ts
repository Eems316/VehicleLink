

export const CLIENT_ROUTES = (() => {
    const base = {
        home: "/",
        vehicles: "/vehicles",
        parts: "/parts",
        about: "/about",
    } as const;

    return {
    ...base,
        yard: `${base.about}#yard`,
        map: `${base.about}#map`,
    } as const;
})();