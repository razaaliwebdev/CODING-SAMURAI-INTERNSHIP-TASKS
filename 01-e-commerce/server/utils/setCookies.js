

export const setCookies = (res, accessToken, refreshToken) => {
    res.cookie(
        "accessToken", accessToken,
        {
            httpOnly: true,   // prevent XSS attacks
            sameSite: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 15
        }
    );

    res.cookie(
        "refreshToken", refreshToken,
        {
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
};