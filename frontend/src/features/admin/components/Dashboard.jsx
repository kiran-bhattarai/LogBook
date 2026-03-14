import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext"
import Spinner from "../../../components/ui/Spinner";
import { useTheme } from "../../../context/ThemeContext";

const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#F43F5E", "#0EA5E9"];

function prepareChartData(rawData, valueKey, daysBack = 30) {

    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - (daysBack - 1));

    const allDates = [];
    let current = new Date(startDate);
    while (current <= today) {
        allDates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
    }

    const dataMap = rawData?.reduce((acc, item) => {
        acc[item.date] = item[valueKey];
        return acc;
    }, {});

    const filledData = allDates.map(date => ({
        date,
        [valueKey]: dataMap?.[date] || 0
    }));

    return filledData;
}

function Dashboard() {

    const [dashboardData, setDashboardData] = useState({})

    const { protectedFetch } = useAuth()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const wrapper = async () => {

            setLoading(true)
            const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/dashboard`)
            const data = await res.json()
            setLoading(false)

            console.log(data)
            setDashboardData(data)
        }
        wrapper()
    }, [protectedFetch])


    const { darkMode } = useTheme()

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Spinner></Spinner>
            </div>
        )
    }


    return (
        <div className="flex-1 text-black dark:text-white text-xl overflow-hidden font-inter">

            <div className="items-center justify-center flex-col flex pb-12 px-2">
                <span className="w-30 h-0.5 mx-auto mb-2 mt-4 bg-linear-to-r from-transparent via-emerald-500 to-transparent"></span>

                <h1 className="text-5xl font-semibold font-poppins bg-linear-60 bg-clip-text text-transparent from-indigo-500 to-emerald-500">Users</h1>

                <div className="w-screen">
                    <div className="justify-self-center flex flex-wrap gap-8 my-8 text-neutral-900 dark:text-neutral-300">
                        <h2>Total users: <span className="text-3xl font-medium text-black dark:text-white">{dashboardData.totalUsers}</span></h2>
                    </div>

                    <div className="flex items-center justify-center flex-wrap gap-10 w-full">

                        <div className="justify-between items-center h-full flex flex-col w-min gap-5">
                            <PieChart width={300} height={300}>
                                <Pie data={dashboardData.userRoleFormatted} dataKey="value" stroke="none" nameKey="name" outerRadius={100} label fill="#82ca9d" paddingAngle={5}>
                                    {dashboardData.userRoleFormatted?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === "Admin" ? '#ff2222' : "#385DE5"} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                            <span>Users by role</span>
                        </div>

                        <div className="justify-center items-center flex flex-col w-min gap-5">
                            <PieChart width={300} height={250}>
                                <Pie data={dashboardData.authProviderFormatted} dataKey="value" stroke="none" nameKey="name" outerRadius={100} label fill="#82ca9d">
                                    {dashboardData.authProviderFormatted?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                            <span>Users by login method</span>
                        </div>

                        <div className="justify-center items-center flex flex-col gap-5 w-full max-w-125 -translate-x-2 sm:translate-0 pr-5">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={prepareChartData(dashboardData.usersPerDayFormatted, "New users", 7)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#ccc" : "#374151"} />
                                    <XAxis dataKey="date" stroke={darkMode ? "#ddd" : "#000"} fontSize={14} />
                                    <YAxis stroke={darkMode ? "#ddd" : "#000"} fontSize={14} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#ffffff", border: "none", color: darkMode ? "#eee" : "#000" }}
                                        labelStyle={{ color: darkMode ? "#eee" : "#000" }}
                                    />
                                    <Line type="monotone" dataKey="New users" stroke={darkMode ? "#8b5cf6" : "#6366f1"} strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                            <span>New users by date</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="items-center justify-center flex-col flex pb-12 px-2">

                <span className="w-30 h-0.5 mx-auto mb-2 mt-4 bg-linear-to-r from-transparent via-emerald-500 to-transparent"></span>
                <h1 className="text-5xl font-semibold font-poppins bg-linear-60 bg-clip-text text-transparent from-indigo-500 to-emerald-500">Notes</h1>

                <div>
                    <div className="justify-self-center flex flex-wrap gap-x-8 gap-y-4 my-8 justify-center text-neutral-900 dark:text-neutral-300">

                        <h2>Total notes: <span className="text-3xl font-medium text-black dark:text-white">{dashboardData.totalNotes}</span></h2>
                        <h2>Average note per user: <span className="text-3xl font-medium text-black dark:text-white">{dashboardData.averageNotes}</span></h2>
                        <h2>Average public per user: <span className="text-3xl font-medium text-black dark:text-white">{dashboardData.averagePublicNotes}</span></h2>
                        <h2>Average private per user: <span className="text-3xl font-medium text-black dark:text-white">{dashboardData.averagePrivateNotes}</span></h2>

                    </div>

                    <div className="flex items-center justify-center flex-wrap gap-10 w-full">

                        <div className="justify-between items-center h-full flex flex-col w-min gap-5">
                            <PieChart width={350} height={250}>
                                <Pie data={dashboardData.noteVisibilityFormatted} dataKey="value" stroke="none" nameKey="name" outerRadius={100} label fill="#82ca9d" paddingAngle={5}>
                                    {dashboardData.noteVisibilityFormatted?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === "Public" ? "#385DE5" : '#ff2222'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                            <span>Notes by visibility</span>
                        </div>

                        <div className="justify-center items-center flex flex-col gap-5 -translate-x-2 sm:translate-0 w-full max-w-125 pr-5">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={prepareChartData(dashboardData.notesPerDayFormatted, "New notes", 7)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#ccc" : "#374151"} />
                                    <XAxis dataKey="date" stroke={darkMode ? "#ddd" : "#000"} fontSize={14} />
                                    <YAxis stroke={darkMode ? "#ddd" : "#000"} fontSize={14} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#ffffff", border: "none", color: darkMode ? "#eee" : "#000" }}
                                        labelStyle={{ color: darkMode ? "#eee" : "#000" }}
                                    />
                                    <Line type="monotone" dataKey="New notes" stroke={darkMode ? "#8b5cf6" : "#6366f1"} strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                            <span>New notes by date</span>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard