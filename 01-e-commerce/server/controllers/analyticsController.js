import { getAnalyticsData } from "../utils/getAnalyticsData.js";
import { getDailySalesData } from '../utils/getDailySalesData.js'


// Get Analytics Controller
export const getAnalytics = async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        const dailySalesData = await getDailySalesData(startDate, endDate);

        return res.status(200).json({ analyticsData, dailySalesData });

    } catch (error) {
        console.log("Failed to get analytics", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
