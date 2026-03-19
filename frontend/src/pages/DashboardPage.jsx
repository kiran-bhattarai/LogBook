import Dashboard from "../features/admin/components/Dashboard"
import PageContainer from "../components/layout/PageContainer"
import { useEffect } from "react"

function DashboardPage() {

    useEffect(() => { document.title = "Dashboard | LogBook" }, [])

    return (
        <>
            <PageContainer>
                <Dashboard>

                </Dashboard>
            </PageContainer>
        </>
    )
}

export default DashboardPage