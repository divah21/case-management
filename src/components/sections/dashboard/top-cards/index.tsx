import Grid from '@mui/material/Grid';
import TopCard from './TopCard';

const cardsData = [
  {
    id: 1,
    title: 'Total Cases',
    value: '2k',
    isUp: true,
    icon: 'mingcute:document-2-fill',
  },
  {
    id: 2,
    title: 'Solved Cases',
    value: '500',
    isUp: false,
    icon: 'ph:bag-simple-fill',
  },
  {
    id: 3,
    title: 'Unsolved Cases',
    value: '1.5k',
    isUp: true,
    icon: 'ph:bag-simple-fill',
  },
  {
    id: 4,
    title: 'Recently Reported',
    value: '15',
    isUp: true,
    icon: 'mingcute:document-2-fill',
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      {cardsData.map((item) => {
        return (
          <TopCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        );
      })}
    </Grid>
  );
};

export default TopCards;
