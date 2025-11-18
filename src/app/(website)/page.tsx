import Container from '~/global/container'
import Details from '~~/index/details'
import Projects from '~~/index/projects'
import Contacts from '~/global/contacts'

export default function IndexPage() {
  return (
    <Container>
      <Details />
      <Projects status="implementation" />
      <Projects status="free_scripts" />
      <Contacts />
    </Container>
  )
}
