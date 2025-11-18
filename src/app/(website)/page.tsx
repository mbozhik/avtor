import Container from '~/global/container'
import Details from '~~/index/details'
import Projects from '~~/index/projects'

export default function IndexPage() {
  return (
    <Container>
      <Details />
      <Projects status="implementation" />
      <Projects status="free_scripts" />
    </Container>
  )
}
