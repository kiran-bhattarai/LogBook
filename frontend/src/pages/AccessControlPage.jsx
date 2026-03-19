import AccessControl from "../features/admin/components/AccessControl"
import PageContainer from "../components/layout/PageContainer"
import { useEffect } from "react"

function AccessControlPage() {

  useEffect(() =>{ document.title = "Access Control | LogBook"}, [])

  return (
    <>
    <PageContainer>
      <AccessControl>
        
      </AccessControl>
    </PageContainer>
    </>
  )
}

export default AccessControlPage