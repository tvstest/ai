import PageHeader from 'components/PageHeader'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <PageHeader />
      {children}
    </>
  )
}

export default Layout
