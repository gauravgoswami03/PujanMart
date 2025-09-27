import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection 
      onShopNowClick={() => console.log('Shop now clicked')}
      onExploreClick={() => console.log('Explore categories clicked')}
    />
  );
}