import Order from "../models/orderModel.js"


export const getDailySalesData = async (startDate, endDate) => {
    try {
        const dailySalesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sales: { $sum: 1 },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        // Example of dailySalesData
        // [
        //     {
        //         _id: "2025-10-23",
        //         sales: 13,
        //         revenue: 2233.15
        //     }
        // ]

        const dateArray = getDatesInRange(startDate, endDate);
        console.log(dateArray);   // ['2025-08-10', '2025-08-11',...]

        return dateArray.map((date) => {
            const foundData = dailySalesData.find(data => data._id === date);

            return {
                date,
                sales: foundData?.sales || 0,
                revenue: foundData?.revenue || 0
            }
        })
    } catch (error) {
        console.log("Error in daily sale data", error);
    }

}


// Function to Get Dates
function getDatesInRange(startDate, endDate) {
    const dates = [];

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);

        return dates;
    }
}