import HeroSlide from '../components/common/HeroSlide';
import tmdbConfigs from '../api/configs/tmdb.configs'
import { Box } from '@mui/system';
import Container from '../../src/components/common/Container'
import uiConfig from '../configs/ui.config';
import MediaSlide from '../components/common/MediaSlide'


const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular}/>

      <Box
      marginTop="-4rem"
      SX={{
        ...uiConfig.style.mainContent
      }}
      >
        <Container header="Popular Movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular}/>
        </Container>

        <Container header="Popular tv series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.popular}/>
        </Container>
        
        <Container header="top rated movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated}/>
        </Container>

        <Container header="top rated tv series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated}/>
        </Container>
      </Box>
    </>
  )
}

export default HomePage