
export async function createNewCoupon(userId) {
    const newCoupon = new Coupon(
        {
            code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
            discountPercentage: 10,
            expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            userId: userId
        }
    );

    await newCoupon.save();

    return newCoupon;
}